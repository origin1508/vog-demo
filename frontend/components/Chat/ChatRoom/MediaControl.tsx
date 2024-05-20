import { ChangeEvent, useState, useEffect } from "react";
import tw, { styled } from "twin.macro";
import useModal from "@/hooks/useModal";
import useChatState from "@/hooks/useChatState";
import { Modal } from "@/components/common";
import { getIcons } from "@/components/icons";
import { useLocalStreamContext, usePeerConnectionsContext } from "@/context";

interface MediaControlProps {
  isLoggedInUser: boolean;
  isEntered: boolean;
}

const MediaControl = ({ isLoggedInUser, isEntered }: MediaControlProps) => {
  const {
    ref: localStreamRef,
    muteLocalStream,
    getLocalStream,
  } = useLocalStreamContext();
  const { switchingAudio } = usePeerConnectionsContext();
  const { chat, setChat } = useChatState();
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [selected, setSelected] = useState("");
  const { isOpen, handleModalClose, handleModalOpen } = useModal();

  useEffect(() => {
    const getMediaDeviceInfo = async () => {
      const res = await navigator.mediaDevices.enumerateDevices();
      const mediaDevices = res.filter((device) => device.kind === "audioinput");
      setMediaDevices(mediaDevices);
      if (localStreamRef.current) {
        const localStream = localStreamRef.current;
        const curMediaDevice = mediaDevices.find(
          (device) => device.label === localStream.getAudioTracks()[0].label
        );
        if (curMediaDevice) {
          setSelected(curMediaDevice.deviceId);
        }
      }
    };
    getMediaDeviceInfo();
  }, []);

  const handleMicMuteClick = () => {
    const isMicMuted = chat.isMicMuted;
    muteLocalStream(!isMicMuted);
    setChat((prev) => {
      return { ...prev, isMicMuted: !isMicMuted };
    });
  };

  const handleVolumeMuteClick = () => {
    setChat((prev) => {
      return { ...prev, isVolumeMuted: !prev.isVolumeMuted };
    });
  };

  const handleDeviceChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    setSelected(deviceId);
    try {
      const localStream = await getLocalStream(deviceId);
      if (localStream) switchingAudio(localStream.getTracks()[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeviceChangeConfirm = async () => {};

  return (
    <MediaControlContainer>
      {isLoggedInUser ? (
        <>
          <MediaControlButtons isEntered={isEntered}>
            <MediaControlButton onClick={handleMicMuteClick}>
              {chat.isMicMuted
                ? getIcons("micMute", 18, "red")
                : getIcons("mic", 18)}
            </MediaControlButton>
            <MediaControlButton onClick={handleVolumeMuteClick}>
              {chat.isVolumeMuted
                ? getIcons("volumeMute", 18, "red")
                : getIcons("volume", 18)}
            </MediaControlButton>
            <MediaControlButton onClick={handleModalOpen}>
              {getIcons("setting", 18)}
            </MediaControlButton>
          </MediaControlButtons>
          <Modal
            title="마이크 설정"
            isOpen={isOpen}
            onlyClose={true}
            handleClose={handleModalClose}
            handleConfirm={handleDeviceChangeConfirm}
          >
            <DeviceSelectContainer>
              <DevicesSelect value={selected} onChange={handleDeviceChange}>
                {mediaDevices.map((device) => (
                  <DeviceOption key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </DeviceOption>
                ))}
              </DevicesSelect>
            </DeviceSelectContainer>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </MediaControlContainer>
  );
};

export default MediaControl;

const MediaControlContainer = tw.div`
  relative
`;

const MediaControlButtons = styled.div(
  ({ isEntered }: { isEntered: boolean }) => [
    tw`flex justify-center items-center gap-2`,
    !isEntered &&
      tw`[> div]:(pointer-events-none) [> div > svg]:(fill-zinc-400)`,
  ]
);

const MediaControlButton = tw.div`
  flex justify-center items-center w-8 h-8 p-2 rounded cursor-pointer select-none
  hover:bg-black/5
  active:(border shadow-xl shadow-inner)
`;

const DeviceSelectContainer = tw.div`
  flex flex-col items-center justify-center p-4
`;

const DevicesSelect = tw.select`
  h-10 px-2 rounded border
`;

const DeviceOption = tw.option`
  focus:bg-black
`;
