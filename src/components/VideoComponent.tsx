import { useEffect, useRef, useState } from 'react';

interface VideoComponentProps {
  src: string;
  isGreater: boolean;
  handleSearch:()=>void
}

const VideoComponent: React.FC<VideoComponentProps> = ({ src,isGreater,handleSearch }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const paused = useRef(false)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsButtonVisible(false);
        handleSearch()
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video && Math.abs(video.currentTime - 3.1) <= 0.1 && paused && !paused.current) {
        video.pause();
        setIsButtonVisible(true);
        paused.current = true
      }
    };

    const handleEnded = () => {
      if (video&&paused) {
        video.currentTime = 0;
        video.play();
        paused.current = false  
      }
    };

    if (video) {
      video.play(); 
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black flex justify-center items-center">
      <video autoPlay muted ref={videoRef} controls={false} className="w-full h-full relative">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        ref={buttonRef}
        onClick={handlePlayPause}
        className={`z-50 button-play absolute right-[38%] top-[30%] m-auto w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center transition-opacity duration-500 ${isButtonVisible ? 'opacity-80' : 'opacity-0'} ${isGreater && "scale-150"}`}
      >
        <div className="w-full relative h-full bg-transparent">
          <p className={`tooltip font-google-sans-regular text-xs absolute -top-11 -right-5 transition-opacity duration-500 ${isButtonVisible ? 'opacity-80' : 'opacity-0'} ${isGreater && "scale-150 -translate-y-3"}`}>
            Search it
          </p>
        </div>
      </button>
    </div>
  );
};

export default VideoComponent;
