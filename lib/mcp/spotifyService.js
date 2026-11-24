// lib/mcp/spotifyService.js
// Servicio MCP y Cliente directo de Spotify Web API (Client Credentials Flow)

let cachedToken = null;
let tokenExpiresAt = 0;

/**
 * Obtiene o reutiliza el token de acceso de Spotify usando Client Credentials
 */
export async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret || clientSecret.includes('pega_aqui')) {
    throw new Error('Spotify Client ID o Client Secret no configurados en .env.local');
  }

  // Reutilizar token si aún no expira (con margen de 60 segundos)
  if (cachedToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedToken;
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al autenticar con Spotify: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);
  return cachedToken;
}

/**
 * Busca artistas en Spotify por nombre
 */
export async function buscarArtistaSpotify(nombre) {
  try {
    const token = await getSpotifyAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(nombre)}&type=artist&limit=5`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.artists?.items.map(a => ({
      id: a.id,
      nombre: a.name,
      generos: a.genres,
      popularidad: a.popularity, // 0 - 100
      seguidores: a.followers?.total || 0,
      imagen: a.images?.[0]?.url || null,
      spotifyUrl: a.external_urls?.spotify
    })) || [];
  } catch (err) {
    console.error('Error buscando artista en Spotify:', err.message);
    return null;
  }
}

/**
 * Obtiene métricas profundas de un artista (perfil, top canciones y similares)
 */
export async function obtenerMetricasCompletasArtista(artistaIdOUrl) {
  try {
    // Si viene la URL completa, extraer el ID
    let artistId = artistaIdOUrl;
    if (artistaIdOUrl.includes('spotify.com/artist/')) {
      artistId = artistaIdOUrl.split('spotify.com/artist/')[1].split('?')[0];
    }

    const token = await getSpotifyAccessToken();
    const headers = { 'Authorization': `Bearer ${token}` };

    // 1. Datos del artista
    const artistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, { headers });
    if (!artistRes.ok) throw new Error(`Artista no encontrado: ${artistId}`);
    const artist = await artistRes.json();

    // 2. Top Tracks (en México 'MX' o global)
    const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=MX`, { headers });
    const tracksData = tracksRes.ok ? await tracksRes.json() : { tracks: [] };

    // 3. Artistas relacionados (Fans also like / Algoritmo)
    const relatedRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, { headers });
    const relatedData = relatedRes.ok ? await relatedRes.json() : { artists: [] };

    return {
      id: artist.id,
      nombre: artist.name,
      popularidad: artist.popularity, // Índice de relevancia Spotify 0-100
      seguidores: artist.followers?.total || 0,
      generos: artist.genres,
      imagen: artist.images?.[0]?.url,
      topCanciones: tracksData.tracks.slice(0, 5).map(t => ({
        nombre: t.name,
        popularidad: t.popularity,
        album: t.album.name,
        previewUrl: t.preview_url
      })),
      artistasSimilares: relatedData.artists.slice(0, 5).map(r => ({
        nombre: r.name,
        popularidad: r.popularity,
        generos: r.genres
      }))
    };
  } catch (err) {
    console.error('Error obteniendo métricas de Spotify:', err.message);
    return null;
  }
}
