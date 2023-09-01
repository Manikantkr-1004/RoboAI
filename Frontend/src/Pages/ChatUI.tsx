import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import audiomic from "../assets/mic.mp3"

export function ChatUI() {

    const mic = <FontAwesomeIcon size="lg" icon={faMicrophone} />
    const mic1 = <FontAwesomeIcon size="lg" fade icon={faMicrophone} />
    const send  = <FontAwesomeIcon size="lg" icon={faPaperPlane} />
    const [inp,setInp] = useState<String>("");
    const [check,setCheck] = useState<Boolean>(false);
    const [isPlaying, setIsPlaying] = useState<Boolean>(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleVoiceSearch = () => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            setCheck(true);
            setIsPlaying(true);
            setTimeout(() => {
                setIsPlaying(false);
              }, 1000); // 1000ms = 1 second
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US"; // Set the language for speech recognition

            recognition.onstart = () => {
                setCheck(true);
              };
        
            recognition.onresult = (event:any) => {
                const speechResult = event.results[0][0].transcript;
                // console.log(event);
                
                setInp(speechResult);
                setCheck(false);

                clearTimeout(timeoutId);
                const newTimeoutId = setTimeout(() => {
                setCheck(false);
                recognition.stop();
                }, 5000); // 5000ms = 5 seconds
                setTimeoutId(newTimeoutId);
            };

            recognition.onend = () => {
                setCheck(false);
            };
        
            recognition.start();
        } else {
            console.log("Speech recognition not supported on this browser.");
            // You might want to provide a user-friendly message or alternative search method
        }
    };
    
    
    return (
        <>
        <div className="w-full flex space-between border border-gray-400">
            <div className="w-1/2 border border-gray-400">
                <div className="h-1/2 w-full border border-gray-400">hi1</div>
                <div className="h-1/2 w-full border border-gray-400">hi2</div>
            </div>
            <div className="w-1/2 border border-gray-400"></div>
        </div>
        <div className="w-full fixed bottom-0 z-9999 flex" >
            <input value={inp} onChange={(e)=> setInp(e.target.value)} className="flex-grow border border-gray-950 focus:border-custom-focus outline-none p-2" placeholder="Type...." />
            <div className="flex items-center pl-4 pr-4 justify-center bg-gray-950 hover:bg-gray-950 text-gray-50 cursor-pointer">{send}</div>
            <div onClick={handleVoiceSearch} className="flex items-center pl-4 pr-4 justify-center bg-gray-950 hover:bg-gray-950 text-gray-50 cursor-pointer">{check? mic1:mic}</div>
        </div>
        {isPlaying && <audio src={audiomic} autoPlay></audio>}
        </>
    )
}
