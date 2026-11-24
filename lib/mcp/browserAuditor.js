// lib/mcp/browserAuditor.js
// MCP 2: Auditor de Enlaces, Redes Sociales y Presencia Digital

/**
 * Audita una URL pública (Linktree, Beacons, Instagram, TikTok, Smartlink)
 * Extrae metadatos, estado de respuesta y verifica buenas prácticas de conversión.
 */
export async function auditarEnlaceSocial(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return {
      valido: false,
      advertencia: 'No se proporcionó una URL válida con protocolo https://'
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 AntiFlopAuditor/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timeout);

    const html = await res.text();
    const status = res.status;

    // Evaluaciones rápidas del contenido
    const tieneSmartlink = /linktr\.ee|beacons\.ai|hypeddit|ffm\.to|songwhip|ampl\.ink/i.test(url) || /spotify|apple|youtube|amazon/i.test(html);
    const tienePreGuarda = /presave|pre-save|guarda/i.test(html);
    const tieneTitulo = html.match(/<title>([^<]+)<\/title>/i);
    const titulo = tieneTitulo ? tieneTitulo[1].trim() : 'Sin título detectable';

    return {
      valido: status >= 200 && status < 400,
      codigoRespuesta: status,
      urlAnalizada: url,
      tituloPagina: titulo,
      hallazgos: {
        esSmartlink: tieneSmartlink,
        tienePreSaveActivo: tienePreGuarda,
        optimizadoParaMovil: /viewport/i.test(html),
        diagnostico: tieneSmartlink 
          ? 'El link dirige a un agregador o reproductor musical multicanal. Aprobado para pauta.' 
          : 'Atención: El enlace no parece ser un Smartlink dedicado (Linktree, Hypeddit, ffm.to). Podrías perder hasta 60% de oyentes que usan otra plataforma de streaming.'
      }
    };
  } catch (err) {
    return {
      valido: false,
      error: `No se pudo conectar al enlace (${err.name === 'AbortError' ? 'Tiempo de espera agotado' : err.message}).`,
      sugerencia: 'Verifica que el link no esté roto y sea público.'
    };
  }
}
