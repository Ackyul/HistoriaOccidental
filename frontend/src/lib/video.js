// Devuelve la URL para incrustar si es de YouTube; si no, null (se usa <video>).
export function urlIncrustada(url) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
