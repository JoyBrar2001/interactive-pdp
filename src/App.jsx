import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Dark from "./assets/Night Sight Dark.png";
import Light from "./assets/Night Sight Light.png";
import Moon from "./assets/clear_night.png";
import Tooltip from './assets/tooltip.png';
import LoadingScreen from "./components/LoadingScreen";
import { v4 as uuid } from 'uuid';
import Thumbnail from './assets/NightSight-Thumbnail.png';

const assets = [Dark, Light, Moon, Tooltip, Thumbnail];

const timeRef = Date.now();
console.log(timeRef);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [clicked, setClicked] = useState(false);
  const [entered, setEntered] = useState(false);
  const [reveal, setReveal] = useState(false);

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
    loadAssets(assets);
  }, []);

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
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen px-5 box-border flex flex-col justify-center items-center gap-7 py-5">
      <div className={`unity-canvas box-border relative max-w-full flex flex-col justify-between overflow-hidden mx-auto aspect-ratio-16/9 h-[80vh] w-[45vh] ${isLoading ? '' : 'px-4 pt-12 pb-2'}`}>
        {isLoading ? (
          <LoadingScreen progress={progress} />
        ) : !entered ? (
          <>
            <div className="w-full h-full absolute inset-0">
              <img src={Thumbnail} className="object-cover w-full h-full object-center" />
              <button onClick={() => setEntered(true)} className="bg-[#017EEA] hover:bg-[#1c629f] transition shadow-xl px-8 py-3 absolute left-[50%] -translate-x-[50%] bottom-[10%] text-white font-medium text-lg rounded-full">
                Try Now
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full absolute inset-0">
              <img src={Light} className="object-cover w-full h-full object-left" />
            </div>
            <div className="absolute inset-0 overflow-hidden h-full w-full">
              <motion.div
                animate={reveal ? { width: 0, height: "100%" } : { width: "100%", height: "100%" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 left-0 h-full w-full border-r-2 border-white"
              >
                <img src={Dark} className="absolute left-0 w-full h-full object-left object-cover" />
              </motion.div>
            </div>

            <div className="text-white text-center font-googleSans z-50 flex flex-col gap-2 md:gap-4">
              <h1 className="text-3xl md:text-4xl font-medium tracking-wide">Night Sight</h1>
              <p className="text-lg md:text-xl tracking-wide">
                Capture city lights, starry skies,<br />
                and portraits in low light.
              </p>
            </div>

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
                    onClick={() => {
                      handleAnalytics('nightSight-btn-click')
                      setClicked(true)
                    }}
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
              <h6 className="text-left max-sm:text-[0.5rem] w-full mt-[30%]">Screen Image Simulated</h6>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
