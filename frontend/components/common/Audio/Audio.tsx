import { useRef, useEffect } from "react";

interface AudioProps {
  stream: MediaStream;
  isMuted: boolean;
}

export const Audio = ({ stream, isMuted }: AudioProps) => {
  const streamRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (stream instanceof MediaStream) {
      if (streamRef.current) {
        streamRef.current.srcObject = stream;
      }
    }
  }, [stream]);
  return <audio ref={streamRef} muted={isMuted} autoPlay></audio>;
};
