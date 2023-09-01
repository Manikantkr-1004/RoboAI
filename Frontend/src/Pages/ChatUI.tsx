import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import audiomic from "../assets/mic.mp3"
import bot from "../assets/bot.gif"

export function ChatUI() {

    const mic = <FontAwesomeIcon size="lg" icon={faMicrophone} />
    const mic1 = <FontAwesomeIcon size="lg" fade icon={faMicrophone} />
    const send  = <FontAwesomeIcon size="lg" icon={faPaperPlane} />
    const [inp,setInp] = useState<String>("");
    const [check,setCheck] = useState<Boolean>(false);
    const [isPlaying, setIsPlaying] = useState<Boolean>(false);

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
            recognition.interimResults = true;
            recognition.lang = "en-IN"; // Set the language for speech recognition

            recognition.onstart = () => {
                setCheck(true);
              };
        
            recognition.onresult = (event:any) => {
                const speechResult = event.results[0][0].transcript;
                
                setInp(speechResult);
                setCheck(false);
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

    window.onload = () => {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            // User granted access to the camera, do something with the stream
            const videoElement = document.createElement("video");
            videoElement.srcObject = stream;
            videoElement.play();

            videoElement.style.width =  "90%";// Set the width in pixels
            videoElement.style.height = "60%"; // Set the height in pixels
            videoElement.style.borderRadius = "20px"
            videoElement.style.margin = "auto";
      
            // Append the video element to your desired div
            const container = document.getElementById("video-container");
            container.appendChild(videoElement);
          })
          .catch((error) => {
            console.error("Camera access denied:", error);
            alert("Please allow Camera Permission!!")
          });
      };

      const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
          // "Enter" key was pressed
          handleSend();
        }
      };

      const handleSend = ()=>{
        console.log(inp);
        setInp("")
      }
      
    
    
    return (
        <>
        <div className="w-full h-full mb-30 flex gap-10 space-between">
            <div style={{width:"400px"}} className="p-2 rounded-xl">
                <div style={{width:"100%",margin:"auto"}}>
                    <img style={{width:"50%",display:"block",margin:"auto"}} src={bot} alt="bot-image" />
                </div><br/><br/>
                <div id="video-container" style={{width:"90%",height:"auto",margin:"auto"}}></div><br/><br/><br/>
            </div>
            <div className="w-60% h-100% border border-gray-950"></div>
        </div>
        <div className="w-full fixed bottom-0 z-9999 flex" >
            <input value={inp} onKeyPress={handleKeyPress} onChange={(e)=> setInp(e.target.value)} className="flex-grow border-2 border-black focus:border-custom-focus outline-none p-2" placeholder="Type...." />
            <div onClick={handleSend} className="flex items-center pl-4 pr-4 justify-center bg-gray-950 hover:bg-gray-950 text-gray-50 cursor-pointer border-r border-white">{send}</div>
            <div onClick={handleVoiceSearch} className="flex items-center pl-4 pr-4 justify-center bg-gray-950 hover:bg-gray-950 text-gray-50 cursor-pointer">{check? mic1:mic}</div>
        </div>
        {isPlaying && <audio src={audiomic} autoPlay></audio>}
        </>
    )
}
