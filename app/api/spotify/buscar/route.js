// app/api/spotify/buscar/route.js
// Endpoint para búsqueda de artistas en vivo directo a Spotify
import { NextResponse } from 'next/server';
import { buscarArtistaSpotify, obtenerMetricasCompletasArtista } from '../../../lib/mcp/spotifyService.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const id = searchParams.get('id');

    if (id) {
      const metricas = await obtenerMetricasCompletasArtista(id);
      return NextResponse.json({ ok: true, metricas });
    }

    if (!q) {
      return NextResponse.json({ ok: false, error: 'Parámetro de búsqueda "q" requerido' }, { status: 400 });
    }

    const artistas = await buscarArtistaSpotify(q);
    return NextResponse.json({ ok: true, artistas: artistas || [] });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
