import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";

import bg1 from './assets/BestTake-1.png';
import bg2 from './assets/BestTake-2.png';
import bg3 from './assets/BestTake-3.png';

import Child from './assets/Child.png';
import Man1 from './assets/Man-1.png';
import Man2 from './assets/Man-2.png';
import Man3 from './assets/Man-3.png';
import Woman from './assets/Woman.png';

const assets = [
  bg1, bg2, bg3,
  Child, Man1, Man2, Man3, Woman,
];

function App() {
  const [currentBg, setCurrentBg] = useState(bg1);

  const [loadedAssets, setLoadedAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [clicked, setClicked] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    loadAssets(assets);
  }, []);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setReveal(true);
      }, 2000);
      setTimeout(() => {
        setReveal(false);
        setClicked(false);
      }, 14000);
    }
  }, [clicked]);

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
            {/* <div className="absolute inset-0 overflow-hidden h-full w-full">
              <motion.div
                animate={reveal ? { width: 0, height: "100%" } : { width: "100%", height: "100%" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 left-0 h-full w-full border-r-2 border-white"
              >
                <img src={Dark} className="absolute left-0 w-full h-full object-left object-cover" />
              </motion.div>
            </div> */}

            <div className="text-white text-center font-googleSans z-50 flex flex-col gap-2 md:gap-4">
              <h1 className="text-3xl md:text-4xl font-medium tracking-wide">Best Take</h1>
              <p className="text-lg md:text-xl tracking-wide">
                Combine similar photos into one <br />
                fantastic picture where everyone <br />
                looks their best.
              </p>
            </div>

            <div className="absolute w-full left-0 right-0 bottom-0 h-64 bg-[#141414] rounded-t-2xl">

            </div>
            {/*
            <div className="relative text-white z-50 font-googleSans flex flex-col justify-center items-center">
              <div>
                {!clicked && (
                  <img
                    src={Tooltip}
                    className="absolute -top-16 h-14 md:h-[4.5rem] md:-top-[5rem] left-[50%] -translate-x-[50%]"
                    alt="Tooltip"
                  />
                )}
                {!reveal && (
                  <div
                    className="relative h-16 w-16 cursor-pointer"
                    onClick={() => setClicked(true)}
                  >
                    {clicked && (
                      <motion.svg
                        key="motion-circle"
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="48"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          exit={{ pathLength: 0 }}
                          transition={{ duration: 2 }}
                          className="stroke-[5px] stroke-current"
                          style={{ transformBox: "fill-box" }}
                        />
                      </motion.svg>
                    )}

                    <div className="absolute inset-0 flex justify-center items-center rounded-full p-5">
                      <div className={`absolute inset-0 ${reveal && "hidden"}`}>
                        {clicked ? (
                          <div className="absolute inset-2 rounded-full transition duration-150 bg-[#026AED]/80 scale-100"></div>
                        ) : (
                          <div className="border-2 border-white w-full h-full rounded-full">
                            <motion.div
                              animate={{
                                scale: [1, 0.5, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                ease: "easeInOut",
                                times: [0, 0.75, 1.5],
                                repeat: Infinity,
                              }}
                              className="absolute inset-0 rounded-full transition duration-150 bg-[#F3B702] bg-opacity-65 border-2 border-[#F0C225]"
                            ></motion.div>
                          </div>
                        )}
                      </div>
                      <div className="">
                        <img src={Moon} alt="moon" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <h6 className="text-left max-sm:text-sm w-full mt-[30%]">Screen Image Simulated</h6>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
