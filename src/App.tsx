import { useEffect, useRef, useState } from "react";
import VideoComponent from "./components/VideoComponent";
import Disclaimer from "./components/Disclaimer";
import googlAi from "./assets/GoogleAI_logo.png";
import c2s from "./assets/C2S.png";
import dogVideo from "./assets/c2s.mp4";
import LoadingScreen from "./components/LoadingScreen";
import cn from "./utils/cn";
import axios from "axios";
import { TRIGGER_TYPE } from "./utils/trigger";
import { v4 as uuidv4 } from "uuid";

import Dark from "./assets/Night Sight Dark.png";
import Light from "./assets/Night Sight Light.png";
import Moon from "./assets/clear_night.png";
import Tooltip from './assets/tooltip.png';
import { motion } from "framer-motion";

const assets = [Dark, Light, Moon, Tooltip];
type AssetType = {
  [key: number]: string;
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isGreater, setIsGreater] = useState(false);
  const [loadedAssets, setLoadedAssets] = useState<AssetType>({});
  const isGreaterRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const googleRef = useRef<HTMLImageElement>(null);
  const timeSpentRef = useRef<number | null>(null);
  const uuidRef = useRef<string>(uuidv4());

  // const handleAnalytics = (type: string) => {
  //   const newTimestamp = Date.now();
  //   let timeSpent = null
  //   if (timeSpentRef.current !== null) {
  //     timeSpent = (newTimestamp - timeSpentRef.current) / 1000; // time spent in seconds
  //   }
  //   timeSpentRef.current = newTimestamp;
  //   axios.post("https://c2sanalytics-ahvbc6mj5q-uc.a.run.app/api/log", {
  //     type,
  //     timeSpent,
  //     session: uuidRef.current
  //   });
  // };

  // useEffect(() => {
  //   handleAnalytics(TRIGGER_TYPE.ENTER);

  //   const loadAsset = async (src: string): Promise<string> => {
  //     const response = await fetch(src);
  //     const blob = await response.blob();
  //     const objectURL = URL.createObjectURL(blob);
  //     return objectURL;
  //   };

  //   const loadAssets = async () => {
  //     for (const [index, asset] of assets.entries()) {
  //       const src = await loadAsset(asset);
  //       setLoadedAssets((prev) => ({
  //         ...prev,
  //         [index]: src,
  //       }));
  //     }
  //   };

  //   loadAssets();

  //   const handleResize = () => {
  //     const maxRetries = 10;
  //     let retryCount = 0;

  //     if (
  //       containerRef.current &&
  //       canvasRef.current &&
  //       // buttonRef.current &&
  //       googleRef.current
  //     ) {


  //       if (
  //         canvasRef.current.clientHeight * 0.5625 >
  //         containerRef.current.clientWidth
  //       ) {
  //         canvasRef.current.style.height = `${canvasRef.current.offsetWidth / 0.5625
  //           }px`;
  //       } else {
  //         canvasRef.current.style.height = `${window.innerHeight * 0.8}px`;
  //         canvasRef.current.style.width = `${window.innerHeight * 0.45}px`;
  //         if (window.innerHeight < 800) {

  //           googleRef.current.style.width = `300px`;
  //           containerRef.current.style.gap = "20px";
  //         }
  //         if (window.innerHeight < 800) {
  //           // buttonRef.current.style.paddingTop = `4px`;
  //           // buttonRef.current.style.paddingBottom = `4px`;
  //           // buttonRef.current.style.paddingLeft = `8px`;
  //           // buttonRef.current.style.paddingRight = `8px`;
  //           // googleRef.current.style.width = `600px`;
  //           // containerRef.current.style.gap = "20px";
  //         }
  //       }

  //       if (canvasRef.current.offsetWidth > 800 && !isGreaterRef.current) {
  //         setIsGreater(true);
  //         isGreaterRef.current = true;
  //       }
  //       if (canvasRef.current.offsetWidth < 800 && isGreaterRef.current) {
  //         setIsGreater(false);
  //         isGreaterRef.current = false;
  //       }
  //     } else if (retryCount < maxRetries) {
  //       retryCount++;
  //       setTimeout(handleResize, 1);
  //     }

  //   };

  //   handleResize(); // Initialize canvas height
  //   window.addEventListener("resize", handleResize);

  //   const handleBeforeUnload = () => {
  //     const url = "https://c2sanalytics-ahvbc6mj5q-uc.a.run.app/api/log";
  //     const data = JSON.stringify({ type: TRIGGER_TYPE.EXIT });

  //     navigator.sendBeacon(url, data);
  //   };

  //   window.addEventListener("unload", handleBeforeUnload, true);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     window.removeEventListener("unload", handleBeforeUnload, true);
  //   };
  // }, []);

  // const len = Object.keys(loadedAssets).length;
  // const loaded = len / assets.length === 1;
  // const progress = len / assets.length;

  // const handleSearch = () => {
  //   handleAnalytics(TRIGGER_TYPE.SEARCH);
  // };

  const [clicked, setClicked] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setReveal(true);
      }, 2000);
      setTimeout(() => {
        setReveal(false);
        setClicked(false);
      }, 9000);
    }
  }, [clicked]);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen px-5 box-border flex flex-col justify-center items-center gap-7  py-5"
    >
      {/* <img
      src={googlAi}
      className="w-48 h-fit lg:w-[45vw] max-w-[400px]"
      alt="Google AI"
      ref={googleRef}
      /> */}
      <div
        className="unity-canvas box-border relative max-w-full flex flex-col justify-between overflow-hidden mx-auto aspect-ratio-16/9 h-[80vh] w-[45vh] px-4 pt-12 pb-2"
        ref={canvasRef}
      >
        {/* {<LoadingScreen progress={progress * 100} />} */}
        <div className="w-full h-full absolute inset-0">
          <img src={Light} className="object-contain w-full h-full" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={reveal ? { width: 0, height: '100%' } : { width: '100%', height: '100%' }}
            transition={{ duration: 1 }}
            className="absolute left-0 h-full w-full border-r-2 border-white"
          >
            <img src={Dark} className="absolute left-0 w-full h-full object-left object-cover" />
          </motion.div>
        </div>
        {/* <motion.div
          animate={reveal ? { width: 0, height: '100%' } : { width: '100%', height: '100%' }}
          transition={{ duration: 0.5 }}
          className="absolute border-r-4 border-white left-0 top-0 h-full overflow-hidden"
          >
          <img src={Dark} className="absolute inset-0 w-full h-full object-fill" />
        </motion.div> */}

        <div className="text-white text-center font-google-sans-regular z-50 flex flex-col gap-2">
          <h1 className="text-4xl font-">Night Sight</h1>
          <p className="text-lg">
            Capture city lights, starry skies,<br />
            and portraits in low light.
          </p>
        </div>

        <div className="relative text-white z-50 font-google-sans-regular flex flex-col justify-center items-center">
          <div>
            {!clicked && (
              <img
                src={Tooltip}
                className="absolute -top-16 h-14 left-[50%] -translate-x-[50%]"
                alt="Tooltip"
              />
            )}
            {!reveal && (
              <div
                className="relative h-16 w-16 cursor-pointer"
                onClick={() => setClicked(true)}
              >
                {clicked &&
                  (
                    <motion.svg
                      key="motion-circle"
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Ensure the circle spans the entire parent */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        exit={{ pathLength: 0 }}
                        transition={{ duration: 2 }}
                        className="stroke-[5px] stroke-current"
                        style={{ transformBox: 'fill-box' }}
                      />
                    </motion.svg>
                  )
                }

                <div className="absolute inset-0 flex justify-center items-center rounded-full p-5">

                  <div className={`absolute inset-0 ${reveal && 'hidden'}`}>
                    {clicked ? (
                      <div className='absolute inset-2 rounded-full transition duration-150 bg-[#026AED]/40 scale-100'></div>
                    ) : (
                      <div className="border-2 border-white w-full h-full rounded-full">
                        <motion.div
                          animate={{
                            scale: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            times: [0, 0.75, 1.5],
                            repeat: Infinity,
                          }}
                          className='absolute inset-0 rounded-full transition duration-150 bg-[#F3B702] bg-opacity-65 border-2 border-[#F0C225]'>

                        </motion.div>
                      </div>
                    )}
                    {/* <div className='absolute inset-2 rounded-full transition duration-150 bg-blue-500/40 scale-100'></div> */}
                  </div>

                  <div className="">
                    <img src={Moon} alt="moon" />
                  </div>

                </div>
              </div>
            )}
          </div>

          <h6 className="text-left w-full mt-20">Screen Image Simulated</h6>
        </div>
        {/*
        {loaded &&
          (!isOpen ? (
            <>
              <img
                src={loadedAssets[0]}
                loading="lazy"
                className="w-full transition-all duration-500 h-full"
                alt="How to use circle to search"
              />
              <button
                ref={buttonRef}
                onClick={() => {
                  handleAnalytics(TRIGGER_TYPE.TRY);

                  setIsOpen(true);
                }}
                className={cn(
                  "absolute bg-blue-500 py-2 font-semibold text-white lg:py-[3%] px-7 lg:px-[5%] cursor-pointer rounded-full hover:bg-blue-400 bottom-[10%] lg:text-xl",
                  isGreater && "scale-150"
                )}
              >
                Try Now
              </button>
            </>
          ) : (
            <div className="w-full px-3 pt-10 pb-5 bg-black h-full justify-between flex flex-col items-center">
              <div className="flex flex-col items-center gap-3">
                <h1
                  className={cn(
                    "text-white font-google-sans-regular text-3xl",
                    isGreater && "text-[6vw]"
                  )}
                >
                  Circle to Search
                </h1>
                <h3
                  className={cn(
                    "text-white text-sm w-[60%] font-thin text-center font-google-sans-regular",
                    isGreater && "text-[2.6vw]"
                  )}
                >
                  Circle, scribble, or tap what you see to get instant search
                  <span
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                  >
                    {" "}
                    results. <sup>1</sup>
                  </span>
                </h3>
              </div>
              <div className="w-[70%] h-[70%]">
                <VideoComponent
                  src={loadedAssets[2]}
                  isGreater={isGreater}
                  handleSearch={handleSearch}
                />
              </div>
              <Disclaimer setOpen={setOpen} open={open} isGreater={isGreater} />
            </div>
          ))}
            */}
      </div>
    </div>
  );
}

export default App;
