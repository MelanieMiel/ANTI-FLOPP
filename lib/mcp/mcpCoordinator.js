// lib/mcp/mcpCoordinator.js
// Orquestador Maestro de los 4 MCPs de ANTI-FLOP

import { obtenerMetricasCompletasArtista, buscarArtistaSpotify } from './spotifyService.js';
import { auditarEnlaceSocial } from './browserAuditor.js';
import { buscarEstrategiaWeb } from './webSearch.js';
import { guardarProyectoDB, consultarProyectoDB, listarTodosLosProyectosDB } from './databaseService.js';

/**
 * Definición de las 4 herramientas MCP para Function Calling de Gemini
 */
export const MCP_TOOLS_DEFINITIONS = [
  {
    name: 'consultar_spotify',
    description: 'Consulta métricas reales de un artista en Spotify (popularidad de 0 a 100, seguidores, top 5 canciones y artistas similares recomendados por el algoritmo).',
    parameters: {
      type: 'object',
      properties: {
        artistaIdONombre: {
          type: 'string',
          description: 'Nombre del artista o link/ID de Spotify del artista a auditar.'
        }
      },
      required: ['artistaIdONombre']
    }
  },
  {
    name: 'auditar_enlace_social',
    description: 'Audita un enlace social (Linktree, Beacons, perfil web, Smartlink) para comprobar si está optimizado para capturar oyentes.',
    parameters: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'La URL completa del enlace a auditar (ej. https://linktr.ee/artista)'
        }
      },
      required: ['url']
    }
  },
  {
    name: 'buscar_medios_y_curadores',
    description: 'Encuentra recomendaciones de medios de prensa independientes, curadores de playlists y tácticas para un género específico.',
    parameters: {
      type: 'object',
      properties: {
        genero: {
          type: 'string',
          description: 'El género musical principal (ej. Bedroom Pop, Indie Rock, Corridos Tumbados)'
        },
        ciudades: {
          type: 'string',
          description: 'Plazas o ciudades clave a impactar'
        }
      },
      required: ['genero']
    }
  },
  {
    name: 'guardar_proyecto_db',
    description: 'Guarda o actualiza persistentemente el plan y diagnóstico de este proyecto en la base de datos local.',
    parameters: {
      type: 'object',
      properties: {
        nombreProyecto: { type: 'string' },
        resumenEstrategia: { type: 'string' }
      },
      required: ['nombreProyecto']
    }
  }
];

/**
 * Ejecutor central de herramientas MCP
 */
export async function ejecutarHerramientaMCP(toolName, args) {
  switch (toolName) {
    case 'consultar_spotify': {
      // Si parece una URL o ID lo busca directo, sino primero busca el artista
      let target = args.artistaIdONombre;
      if (!target.includes('spotify.com') && target.length < 25) {
        const encontrados = await buscarArtistaSpotify(target);
        if (encontrados && encontrados.length > 0) {
          target = encontrados[0].id;
        }
      }
      return await obtenerMetricasCompletasArtista(target);
    }

    case 'auditar_enlace_social': {
      return await auditarEnlaceSocial(args.url);
    }

    case 'buscar_medios_y_curadores': {
      return await buscarEstrategiaWeb(args.genero, args.ciudades);
    }

    case 'guardar_proyecto_db': {
      return await guardarProyectoDB(args.nombreProyecto, args);
    }

    default:
      throw new Error(`Herramienta MCP no reconocida: ${toolName}`);
  }
}
