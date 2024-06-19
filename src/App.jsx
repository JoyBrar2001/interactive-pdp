import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import { IoClose } from "react-icons/io5";

import LoadingScreen from "./components/LoadingScreen";

import bg1 from './assets/BestTake-1.png';
import bg2 from './assets/BestTake-2.png';
import bg3 from './assets/BestTake-3.png';

import Child from './assets/Child.png';
import Man1 from './assets/Man-1.png';
import Man2 from './assets/Man-2.png';
import Man3 from './assets/Man-3.png';
import Woman from './assets/Woman.png';
import ToolTip from './assets/tooltip.png';

const assets = [
  bg1, bg2, bg3,
  Child, Man1, Man2, Man3, Woman,
  ToolTip,
];

const timeRef = Date.now();
console.log(timeRef);

function App() {
  const [currentBg, setCurrentBg] = useState(bg1);
  const [currentButton, setCurrentButton] = useState(Man1);
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);

  const [loadedAssets, setLoadedAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [clicked, setClicked] = useState(false);

  const uuidRef = useRef(uuid());

  const handleAnalytics = (type) => {
    const timeSpent = (Date.now() - parseInt(timeRef)) / 1000;
    const obj = {
      type: type,
      timeSpent: type === "enter" ? null : timeSpent,
      session: uuidRef.current,
      feature: 'BestTake',
    };
    console.log(obj);

    fetch("https://c2sanalytics-ahvbc6mj5q-uc.a.run.app/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      keepalive: true,
      body: JSON.stringify(obj)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    handleAnalytics('enter');

    const beforeUnloadHandler = () => {
      handleAnalytics('exit');
    };

    const visibilityChangeHandler = () => {
      if (document.visibilityState === 'hidden') {
        handleAnalytics('exit');
      }
    };

    const blurHandler = () => {
      handleAnalytics('exit b');
    };

    // window.addEventListener('beforeunload', beforeUnloadHandler);
    document.addEventListener('visibilitychange', visibilityChangeHandler);
    // window.addEventListener('blur', blurHandler);

    return () => {
      // window.removeEventListener('beforeunload', beforeUnloadHandler);
      document.removeEventListener('visibilitychange', visibilityChangeHandler);
      // window.removeEventListener('blur', blurHandler);
      handleAnalytics('exit');
    };
  }, []);

  useEffect(() => {
    loadAssets(assets);
  }, []);

  const loadAssets = async (assets) => {
    const loaded = [];
    for (let i = 0; i < assets.length; i++) {
      await new Promise((resolve) => {
        const img = new Image();
        img.src = assets[i];
        img.onload = () => {
          loaded.push(img);
          setProgress(((i + 1) / assets.length) * 100);
          resolve();
        };
      });
    }
    setLoadedAssets(loaded);
    setIsLoading(false);
    console.log("Assets Loaded");
  };

  const handleClick = (bgImage, i) => {
    handleAnalytics(`bestTake-Btn-${i}-click`);
    setCurrentBg(bgImage);
  };

  return (
    <div className="w-screen h-screen px-5 box-border flex flex-col justify-center items-center gap-7 py-5">
      <div className="unity-canvas box-border relative max-w-full flex flex-col justify-between overflow-hidden mx-auto aspect-ratio-16/9 h-[80vh] w-[45vh] px-4 pt-12 pb-2">
        {isLoading ? (
          <LoadingScreen progress={progress} />
        ) : (
          <>
            <div className="w-full h-full absolute inset-0">
              <img src={currentBg} className="object-cover w-full h-full object-left" />
            </div>

            <div className="text-white text-center font-googleSans z-50 flex flex-col gap-2 md:gap-4">
              <h1 className="text-3xl md:text-4xl font-medium tracking-wide">Best Take</h1>
              <p className="sm:text-lg md:text-xl tracking-wide">
                Combine similar photos into one <br />
                fantastic picture where everyone <br />
                looks their best.<sup>1</sup>
              </p>
            </div>

            <div className="absolute w-full left-0 right-0 bottom-0 pt-4 sm:pt-6 bg-[#141414] rounded-t-3xl flex flex-col justify-center items-center">
              <div className="flex">
                <div className="relative bg-[#3C4043]">
                  <div className="w-full h-full p-2 bg-[#141414] rounded-br-xl">
                    <img src={Woman} alt="woman" className="h-[2.75rem] w-[2.75rem] sm:h-12 sm:w-12" />
                  </div>
                </div>
                <div className="p-2 bg-[#3C4043] rounded-t-full relative">
                  {!clicked && (
                    <img src={ToolTip} className="absolute -translate-x-[50%] left-[50%] -top-9 sm:-top-10 md:-top-12 scale-[275%] md:scale-[300%]" />
                  )}
                  <img src={currentButton} alt="current button" className="h-[2.75rem] w-[2.75rem] sm:h-12 sm:w-12" />
                </div>
                <div className="relative bg-[#3C4043]">
                  <div className="w-full h-full p-2 bg-[#141414] rounded-bl-xl">
                    <img src={Child} alt="child" className="h-[2.75rem] w-[2.75rem] sm:h-12 sm:w-12" />
                  </div>
                </div>
              </div>

              <div className="flex bg-[#3C4043] rounded-full p-2 gap-1.5">
                <div className="cursor-pointer" onClick={() => handleClick(bg1, 1)}>
                  <img src={Man1} alt="man1" className={`h-[2.75rem] w-[2.75rem] sm:h-12 sm:w-12 transition border-2 rounded-full ${currentBg === bg1 ? "border-white" : "border-transparent"}`} />
                </div>

                <div className="relative cursor-pointer" onClick={() => {
                  handleClick(bg2, 2)
                  setClicked(true);
                }}>
                  {!clicked && (
                    <motion.div
                      animate={{
                        scale: [1, 0.7, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        times: [0, 0.75, 1.5],
                        repeat: Infinity,
                      }}
                      className='absolute inset-0 rounded-full transition duration-150 bg-[#F3B702] bg-opacity-65 border-2 border-[#F0C225]'
                    />
                  )}
                  <img src={Man2} alt="man2" className={`h-[2.75rem] w-[2.75rem] sm:h-12 sm:w-12 transition border-2 rounded-full ${currentBg === bg2 ? "border-white" : "border-transparent"}`} />
                </div>

                <div className="cursor-pointer" onClick={() => handleClick(bg3, 3)}>
                  <img src={Man3} alt="man3" className={`h-[2.75rem] w-[2.75rem] sm:h-12 sm:w-12 transition border-2 rounded-full ${currentBg === bg3 ? "border-white" : "border-transparent"}`} />
                </div>
              </div>

              <div className="flex justify-between w-full px-3 py-2 mt-2 sm:mt-4">
                <h6 className="text-left text-[#DADCE0] text-xs sm:text-sm w-full">
                  Screen images simulated.
                </h6>
                <h6 className="text-right text-[#DADCE0] text-xs sm:text-sm w-full underline cursor-pointer" onClick={() => setDisclaimerVisible(true)}>
                  Disclaimer
                </h6>
              </div>
            </div>

            <AnimatePresence>
              {disclaimerVisible && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{
                    type: "easeInOut",
                    duration: 0.4,
                  }}
                  className="absolute left-0 right-0 bottom-0 bg-white p-6 rounded-t-3xl"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#202124] font-medium">Disclaimers</h1>
                    <div className="bg-[#3C4043] p-2 rounded-full cursor-pointer" onClick={() => setDisclaimerVisible(false)}>
                      <IoClose size={18} color="white" />
                    </div>
                  </div>
                  <p className="text-[#80868B] max-sm:text-sm disclaimer">
                    <sup>1</sup>
                    Requires Google Photos app.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
