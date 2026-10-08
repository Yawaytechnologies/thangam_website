import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Pause, Play } from 'lucide-react';
import { photo } from '../../assets/data/sample-properties';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_210218_173f8eba-17ff-4e27-972b-d128af25bf49.mp4';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) videoRef.current?.pause();
    };
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/' || !location.state?.restartHero) return;
    document.getElementById('home')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
    const video = videoRef.current;
    if (!video || failed) return;
    video.currentTime = 0;
    if (!reducedMotion) void video.play().catch(() => setPlaying(false));
  }, [location.key, location.pathname, location.state, reducedMotion, failed]);

  return <>
    <img className="hero-image" src={photo('photo-1470770841072-f978cf4d019e', 2400)} alt="A peaceful green landscape beside a lake and mountains" fetchPriority="high"/>
    {!failed && <video
      ref={videoRef}
      className={`hero-video${ready ? ' is-ready' : ''}`}
      src={VIDEO_URL}
      muted loop playsInline autoPlay={!reducedMotion}
      preload={reducedMotion ? 'none' : 'metadata'}
      aria-hidden="true" tabIndex={-1}
      onPlaying={() => { setReady(true); setPlaying(true); }}
      onPause={() => setPlaying(false)}
      onError={() => { setFailed(true); setPlaying(false); }}
    />}
    {!failed && <button type="button" className="hero-video-control" aria-label={playing ? 'Pause background video' : 'Play background video'} onClick={() => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) void video.play().catch(() => setPlaying(false));
      else video.pause();
    }}>{playing ? <Pause size={14}/> : <Play size={14}/>}<span>{playing ? 'Pause video' : 'Play video'}</span></button>}
  </>;
}
