import { IoCloseCircle } from "react-icons/io5";
import cn from "../utils/cn";

interface DisclaimerProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isGreater: boolean;
}

export default function Disclaimer({ open, setOpen, isGreater }: DisclaimerProps) {
    return (
        <div className="w-full px-2">
            <div className={cn("flex w-full justify-between text-xs text-white", isGreater && "text-[2vw]")}>
                <span className="">Screen images simulated.</span>
                <button className={"underline "} onClick={() => setOpen(prev => !prev)}>Disclaimer</button>
            </div>
            <div onClick={() => setOpen(false)} className={`absolute bg-slate-500/30 inset-0 ${!open && "hidden"}`}></div>
            <div className={`absolute z-10 left-0 bottom-0 w-full bg-white p-4 rounded-t-2xl shadow-lg transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'} ${isGreater&&"p-10"}`}>
                <div className="flex justify-between items-center">
                    <h2 className={cn("font-google-sans", isGreater && "text-[3.5vw]")}>Disclaimer</h2>
                    <button onClick={() => setOpen(false)} className="text-black font-bold">
                        <IoCloseCircle className={cn("w-7 h-7 hover:text-slate-700 text-slate-900", isGreater && "scale-150")} />
                    </button>
                </div>
                <div className={cn("mt-4 text-xs text-gray-500", isGreater && "text-[2vw]")}>
                    <sup className="text-black">1</sup>
                    Requires internet connection and compatible apps and surfaces. Results may vary depending on visual matches
                </div>
            </div>
        </div>
    );
}
