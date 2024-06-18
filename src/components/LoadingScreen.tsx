import unicorn from "../assets/Union.png";
import dicegoogle from "../assets/dicegoogle.png";
import dottedcircle from "../assets/dottedcircle.png";
import pixel from "../assets/pixel.png";
import cn from "../utils/cn";

type LoadingScreenProps = {
  progress: number; // Corrected typo in prop name
};

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        "w-full h-full flex justify-center transition-all duration-300  items-center bg-white relative",
        progress === 100 && "hidden"
      )}
    >
      <img
        src={pixel}
        alt=""
        loading="lazy"
        className="z-10 absolute w-1/2 top-[15%]"
      />
      <img
        src={dicegoogle}
        alt=""
        loading="lazy"
        className="absolute w-1/2 top-0 left-0 -translate-x-[30%] -translate-y-[28%]"
      />
      <img
        src={unicorn}
        alt=""
        loading="lazy"
        className="animate-unicorn absolute w-1/2 translate-x-[40%] top-[5%]"
      />
      <img
        src={dottedcircle}
        alt=""
        loading="lazy"
        className="animate-dottedcircle absolute w-1/2 top-[50%] -translate-x-[40%] scale-75"
      />

      <h1
        className={cn(
          "text-blue-500 font-google-sans-regular font-semibold text-2xl absolute bottom-[18%]",
          progress === 100 && "hidden"
        )}
      >
        Almost There..
      </h1>
      <h1
        className={cn(
          "text-blue-500 font-google-sans-regular font-semibold text-base absolute bottom-[8%]",
          progress === 100 && "hidden"
        )}
      >
        {Math.floor(progress)}%
      </h1>
      <div className="w-1/2 h-2  bg-gray-300 rounded-full left-1/2 -translate-x-1/2 absolute bottom-[15%] overflow-hidden">
        <div
          className={cn(
            "h-full bg-blue-500 ",
            progress !== 100 && "transition-width duration-300 ease-in-out",
            progress === 100 && "hidden"
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
