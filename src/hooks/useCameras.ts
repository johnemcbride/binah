import { useEffect, useState } from "react";

const useCameras = (): MediaDeviceInfo[] => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    (async () => {
      await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user" },
      });
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log(JSON.stringify(devices));
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      videoDevices && setCameras(videoDevices);
    })();
  }, []);
  return cameras;
};

export default useCameras;
