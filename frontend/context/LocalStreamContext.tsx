import {
  ReactNode,
  createContext,
  useRef,
  useContext,
  MutableRefObject,
} from "react";

export const LocalStreamContext = createContext<
  | {
      ref: MutableRefObject<MediaStream | undefined>;
      getLocalStream: () => Promise<void>;
      stopLocalStream: () => void;
    }
  | undefined
>(undefined);

export const LocalStreamProvider = ({ children }: { children: ReactNode }) => {
  const localStreamRef = useRef<MediaStream>();

  const stopLocalStream = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getTracks().forEach((track) => track.stop());
    localStreamRef.current = undefined;
  };

  const getLocalStream = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStreamRef.current = localStream;
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };
  return (
    <LocalStreamContext.Provider
      value={{ ref: localStreamRef, getLocalStream, stopLocalStream }}
    >
      {children}
    </LocalStreamContext.Provider>
  );
};

export const useLocalStreamContext = () => {
  const context = useContext(LocalStreamContext);
  if (context === undefined) {
    throw new Error("context must be within provider");
  }

  return context;
};
