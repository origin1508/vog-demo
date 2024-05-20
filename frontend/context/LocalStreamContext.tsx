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
      getLocalStream: (deviceId?: string) => Promise<MediaStream | undefined>;
      stopLocalStream: () => void;
      muteLocalStream: (isMuted: boolean) => void;
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

  const muteLocalStream = (isMuted: boolean) => {
    if (!localStreamRef.current) return;
    localStreamRef.current
      .getTracks()
      .forEach((track) => (track.enabled = !isMuted));
  };

  const getLocalStream = async (deviceId?: string) => {
    const defaultConstraints = { audio: true };
    const userSelectConstraints = { audio: { deviceId: { exact: deviceId } } };
    try {
      const localStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? userSelectConstraints : defaultConstraints
      );
      localStreamRef.current = localStream;
      return localStream;
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };
  return (
    <LocalStreamContext.Provider
      value={{
        ref: localStreamRef,
        getLocalStream,
        stopLocalStream,
        muteLocalStream,
      }}
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
