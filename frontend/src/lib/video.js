// Devuelve la URL para incrustar si es de YouTube o Cloudinary Player; si no, null (se usa <video>).
export function urlIncrustada(url) {
  if (/^https:\/\/player\.cloudinary\.com\/embed\//.test(url)) return url;
  const m = url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
