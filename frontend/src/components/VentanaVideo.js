"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { urlIncrustada } from "@/lib/video";

function formatTiempo(segundos) {
  if (!Number.isFinite(segundos) || segundos < 0) return "0:00";
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg.toString().padStart(2, "0")}`;
}

export default function VentanaVideo({ evento, onCerrar }) {
  const cerrar = useRef(null);
  const videoRef = useRef(null);
  const contenedorRef = useRef(null);

  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [volumen, setVolumen] = useState(1);
  const [silenciado, setSilenciado] = useState(false);
  const [pantallaGrande, setPantallaGrande] = useState(false);

  useEffect(() => {
    cerrar.current?.focus();
    function onKey(e) {
      if (e.key === "Escape" && !document.fullscreenElement) onCerrar();
    }
    function onFullscreen() {
      setPantallaGrande(Boolean(document.fullscreenElement));
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [onCerrar]);

  const incrustada = evento.video ? urlIncrustada(evento.video) : null;

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  function alMover(e) {
    const v = videoRef.current;
    if (!v) return;
    const nuevoTiempo = Number(e.target.value);
    v.currentTime = nuevoTiempo;
    setTiempo(nuevoTiempo);
  }

  function toggleSilencio() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  }

  function alCambiarVolumen(e) {
    const v = videoRef.current;
    if (!v) return;
    const nuevoVol = Number(e.target.value);
    v.volume = nuevoVol;
    if (nuevoVol > 0 && v.muted) v.muted = false;
  }

  function togglePantallaGrande() {
    const el = contenedorRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  return createPortal(
    <div className="pz-ventana-fondo" onClick={onCerrar}>
      <div
        className="pz-ventana"
        role="dialog"
        aria-modal="true"
        aria-label={evento.titulo}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <div>
            <h2>{evento.titulo}</h2>
            <p>
              {evento.lugar}, {evento.anio}
            </p>
          </div>
          <button ref={cerrar} type="button" onClick={onCerrar} aria-label="Cerrar">
            Cerrar
          </button>
        </header>

        <div className="pz-ventana-video" ref={contenedorRef}>
          {incrustada ? (
            <iframe
              src={incrustada}
              title={evento.titulo}
              allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : evento.video ? (
            <>
              <video
                ref={videoRef}
                src={evento.video}
                autoPlay
                playsInline
                onClick={togglePlay}
                onPlay={() => setReproduciendo(true)}
                onPause={() => setReproduciendo(false)}
                onEnded={() => setReproduciendo(false)}
                onTimeUpdate={(e) => setTiempo(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuracion(e.currentTarget.duration || 0)}
                onDurationChange={(e) => setDuracion(e.currentTarget.duration || 0)}
                onVolumeChange={(e) => {
                  setVolumen(e.currentTarget.volume);
                  setSilenciado(e.currentTarget.muted);
                }}
              />

              <div className="pz-video-controles" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={reproduciendo ? "Pausar" : "Reproducir"}
                  title={reproduciendo ? "Pausar" : "Reproducir"}
                >
                  {reproduciendo ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  )}
                </button>

                <span className="pz-video-tiempo">
                  {formatTiempo(tiempo)} / {formatTiempo(duracion)}
                </span>

                <input
                  type="range"
                  className="pz-video-progreso"
                  min={0}
                  max={duracion || 0}
                  step={0.1}
                  value={Math.min(tiempo, duracion || 0)}
                  onChange={alMover}
                  aria-label="Mover posición del video"
                />

                <div className="pz-video-volumen">
                  <button
                    type="button"
                    onClick={toggleSilencio}
                    aria-label={silenciado || volumen === 0 ? "Activar sonido" : "Silenciar"}
                    title={silenciado || volumen === 0 ? "Activar sonido" : "Silenciar"}
                  >
                    {silenciado || volumen === 0 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
                        <path d="M22 9l-6 6M16 9l6 6" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
                        <path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    className="pz-video-vol-barra"
                    min={0}
                    max={1}
                    step={0.05}
                    value={silenciado ? 0 : volumen}
                    onChange={alCambiarVolumen}
                    aria-label="Volumen"
                  />
                </div>

                <button
                  type="button"
                  onClick={togglePantallaGrande}
                  aria-label={pantallaGrande ? "Salir de pantalla grande" : "Pantalla grande"}
                  title={pantallaGrande ? "Salir de pantalla grande" : "Pantalla grande"}
                >
                  {pantallaGrande ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </>
          ) : (
            <span>El video se añadirá aquí</span>
          )}
        </div>

        {evento.descripcion && <p className="pz-ventana-desc">{evento.descripcion}</p>}
      </div>
    </div>,
    document.body,
  );
}
