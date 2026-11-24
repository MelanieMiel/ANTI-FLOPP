// app/api/analizar/route.js
// Endpoint de Diagnóstico Inteligente con Gemini Multimodal y los 4 MCPs Integrados

import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { MCP_TOOLS_DEFINITIONS, ejecutarHerramientaMCP } from '../../../lib/mcp/mcpCoordinator.js';
import { obtenerMetricasCompletasArtista } from '../../../lib/mcp/spotifyService.js';
import { auditarEnlaceSocial } from '../../../lib/mcp/browserAuditor.js';
import { buscarEstrategiaWeb } from '../../../lib/mcp/webSearch.js';
import { guardarProyectoDB } from '../../../lib/mcp/databaseService.js';

const ai = new GoogleGenAI({});

const DIAGNOSTICO_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'number', description: 'Índice Anti-Flop del 0 al 100 basado en datos reales y preparación actual.' },
    auditoriaInstagram: {
      type: 'string',
      description: 'Crítica directa, accionable y sin filtros basada en la captura de pantalla de Instagram (bio, link en bio, estética del feed, highlights, foto de perfil). Si no hay imagen, dar recomendaciones puntuales de identidad.'
    },
    metricasSpotifyLive: {
      type: 'object',
      properties: {
        encontrado: { type: 'boolean' },
        popularidad: { type: 'number' },
        seguidores: { type: 'number' },
        resumenBenchmarking: { type: 'string' }
      }
    },
    publicoMeta: {
      type: 'object',
      properties: {
        edad: { type: 'string' },
        ciudades: { type: 'string', description: 'Plazas clave en México y Latam' },
        horariosPico: { type: 'string' },
        comportamiento: { type: 'string' },
        interesesCruzados: { type: 'array', items: { type: 'string' } }
      },
      required: ['edad', 'ciudades', 'horariosPico', 'comportamiento', 'interesesCruzados']
    },
    algoritmos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          plataforma: { type: 'string' },
          afinidad: { type: 'string' },
          senalesClave: { type: 'string' },
          accion: { type: 'string' }
        },
        required: ['plataforma', 'afinidad', 'senalesClave', 'accion']
      }
    },
    ventajas: { type: 'array', items: { type: 'string' } },
    riesgos: { type: 'array', items: { type: 'string' } },
    estrategiaMediosWeb: {
      type: 'string',
      description: 'Recomendación de prensa y pitching a playlists independientes para su escena.'
    }
  },
  required: ['score', 'auditoriaInstagram', 'publicoMeta', 'algoritmos', 'ventajas', 'riesgos']
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { proyecto, projectData, referentes, igImageBase64, igImageMimeType } = body;

    // --- EJECUCIÓN PARALELA DE LOS MCPS ENRIQUECEDORES ---
    let spotifyData = null;
    let webAuditData = null;
    let mediosData = null;

    // 1. MCP Spotify: Si puso link o hay referentes, consultar métricas en vivo
    try {
      if (projectData?.spotify) {
        spotifyData = await obtenerMetricasCompletasArtista(projectData.spotify);
      } else if (referentes && referentes.length > 0) {
        spotifyData = await ejecutarHerramientaMCP('consultar_spotify', { artistaIdONombre: referentes[0] });
      }
    } catch (e) {
      console.warn('MCP Spotify aviso:', e.message);
    }

    // 2. MCP Auditor Web / Social: Auditar enlace si se ingresó
    try {
      if (projectData?.spotify && projectData.spotify.startsWith('http')) {
        webAuditData = await auditarEnlaceSocial(projectData.spotify);
      }
    } catch (e) {
      console.warn('MCP Auditor Web aviso:', e.message);
    }

    // 3. MCP Búsqueda de Medios y Curadores
    try {
      mediosData = await buscarEstrategiaWeb(projectData?.generoPrincipal || 'Indie');
    } catch (e) {
      console.warn('MCP Medios aviso:', e.message);
    }

    // Construir el prompt para Gemini enriquecido con los datos reales de los MCPs
    const promptText = `
Eres el estratega musical de ANTI-FLOP, experto en la industria independiente y alternativa de México y Latinoamérica.
Tienes acceso a datos de telemetría en tiempo real obtenidos a través de nuestros Servidores MCP (Spotify Live API, Auditor Web y Red de Medios).

DATOS DEL PROYECTO:
- Nombre del proyecto: ${proyecto}
- Género principal: ${projectData?.generoPrincipal}
- Subgéneros: ${projectData?.subgeneros || 'No especificados'}
- Etapa: ${projectData?.etapa}
- Presupuesto mensual: ${projectData?.presupuesto}
- Link ingresado: ${projectData?.spotify || 'No proporcionado'}
- Referentes seleccionados: ${referentes?.join(', ') || 'Ninguno'}

DATOS EN VIVO RECUPERADOS POR LOS MCPS:
- Spotify Live Telemetry: ${spotifyData ? JSON.stringify(spotifyData) : 'Sin perfil vinculado'}
- Auditoría Técnica de Enlace: ${webAuditData ? JSON.stringify(webAuditData) : 'No se auditó enlace'}
- Red de Medios y Curadores Recomendados: ${mediosData ? JSON.stringify(mediosData) : 'General'}

INSTRUCCIONES CLAVE:
1. Si hay captura de Instagram, audítala visualmente con brutal honestidad: biografía, claridad del link de escucha, estética visual de los post, foto de perfil y puntos de fuga de tráfico.
2. Cruza los datos de Spotify y referentes para calcular el Índice Anti-Flop real (0 - 100).
3. Diseña la estrategia algorítmica para Spotify, TikTok/Reels y YouTube con métricas exactas (Save Rate, Skip Rate, retención de 3 segundos).
4. Genera el Público Meta hiperespecífico para México y Latam.
`;

    const contents = [promptText];

    // Adjuntar visión multimodal si hay captura de Instagram
    if (igImageBase64 && igImageMimeType) {
      contents.push({
        inlineData: {
          data: igImageBase64,
          mimeType: igImageMimeType
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        temperature: 0.4,
        responseMimeType: 'application/json',
        responseJsonSchema: DIAGNOSTICO_SCHEMA
      }
    });

    const diagnostico = JSON.parse(response.text);

    // 4. MCP Base de Datos: Guardar el diagnóstico generado de manera persistente
    await guardarProyectoDB(proyecto, {
      projectData,
      referentes,
      diagnostico,
      fecha: new Date().toISOString()
    });

    return NextResponse.json({ ok: true, diagnostico });

  } catch (error) {
    console.error('Error en /api/analizar con MCPs:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Error al procesar diagnóstico' },
      { status: 500 }
    );
  }
}
