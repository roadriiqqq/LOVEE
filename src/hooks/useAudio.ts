import { useCallback, useEffect, useRef, useState } from 'react';

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = 'metadata';
    audio.volume = 0.8;
    audioRef.current = audio;

    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setEnded(true);
    };
    const onSeeking = () => setEnded(false);
    const onSeeked = () => setEnded(false);
    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('seeking', onSeeking);
    audio.addEventListener('seeked', onSeeked);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('seeking', onSeeking);
      audio.removeEventListener('seeked', onSeeked);
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = repeat;
  }, [repeat]);

  const play = () => {
    setEnded(false);
    audioRef.current?.play().catch(() => setIsPlaying(false));
  };

  const pause = () => audioRef.current?.pause();

  const toggle = () => (isPlaying ? pause() : play());

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  };

  const changeVolume = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value;
    audioRef.current.muted = false;
    setVolumeState(value);
    setMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const toggleRepeat = () => setRepeat((r) => !r);

  const getTime = useCallback(() => audioRef.current?.currentTime ?? 0, []);

  return {
    getTime,
    isPlaying,
    duration,
    volume,
    muted,
    repeat,
    hasError,
    ended,
    play,
    toggle,
    seek,
    changeVolume,
    toggleMute,
    toggleRepeat,
  };
}

export type AudioControls = ReturnType<typeof useAudio>;
