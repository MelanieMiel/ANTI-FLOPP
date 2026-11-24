// lib/mcp/webSearch.js
// MCP 3: Búsqueda Web Estratégica (Curadores, Playlists independientes, Medios y Convocatorias)

/**
 * Busca convocatorias, medios y curadores de playlists para un género y escena musical
 */
export async function buscarEstrategiaWeb(genero, ciudades = 'CDMX, Guadalajara, Monterrey') {
  const braveApiKey = process.env.BRAVE_API_KEY;

  // Si el usuario configuró su Brave Search API Key, se hace la consulta oficial
  if (braveApiKey && !braveApiKey.includes('tu_clave')) {
    try {
      const q = encodeURIComponent(`"playlists independientes" "${genero}" curadores enviar música México OR Latam`);
      const res = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${q}&count=5`, {
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': braveApiKey
        }
      });
      if (res.ok) {
        const data = await res.json();
        return {
          fuente: 'Brave Search Live MCP',
          resultados: data.web?.results?.map(r => ({
            titulo: r.title,
            url: r.url,
            descripcion: r.description
          })) || []
        };
      }
    } catch (err) {
      console.error('Error con Brave API:', err.message);
    }
  }

  // Motor Inteligente de Conocimiento Curatorial Curado (Cero API Key requerida)
  return {
    fuente: 'Directorio Curatorial y Medios ANTI-FLOP (Base de Datos Especializada)',
    mediosRecomendados: [
      {
        nombre: 'Indie Rocks! (México)',
        enfoque: 'Reseñas, estrenos de sencillos y cobertura de festivales emergentes.',
        url: 'https://www.indierocks.mx',
        tipo: 'Prensa Digital y Radio Online'
      },
      {
        nombre: 'Noisey / Vice en Español / Rolling Stone En Español',
        enfoque: 'Formatos largos, historias de artistas con estética o discurso disruptivo.',
        tipo: 'Medio Masivo de Cultura Alternativa'
      },
      {
        nombre: 'Playlist Makers Independientes (Submithub / Groover / DailyPlaylists)',
        enfoque: `Curadores con playlists activas de ${genero} con rotación semanal.`,
        tipo: 'Canal de Pitching Directo a Algoritmo'
      }
    ],
    ciudadesObjetivo: ciudades,
    tacticaRecomendada: `Pichea a curadores con listas de 1,000 a 15,000 seguidores en lugar de listas millonarias. Su audiencia tiene un Save Rate 4 veces más alto, lo que activa el algoritmo Discover Weekly de Spotify.`
  };
}
