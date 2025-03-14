import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { getContentSettingByTag } from "../lib/firebase/contentSetting";
import BackIcon from "../components/BackIcon";
import { sanitizeDOM } from "../lib/sanitizeDOM";
import LoadingScreen from "../components/LoadingScreen";
import { Joystick } from 'react-joystick-component';
import { updatemove, getIsEvent, getNamaEvent, updatepersecond } from "../lib/firebase/movexy";
import { chat } from "../lib/firebase/movexy";

const Joystix = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedContent, setSelectedContent] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [showChatGrid, setShowChatGrid] = React.useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogText, setDialogText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isEventActive, setIsEventActive] = useState(false);
    const [currentEvent, setCurrentEvent] = useState("");
    const params = useParams();
    const tag = params.tag;

    const chatTemplates = [
        "Halo", "Apa kabar?", "Selamat pagi",
        "Permisi", "Senang bertemu", "Sampai jumpa",
        "Terima kasih", "Maaf", "Bisa bantu?"
    ];

    const handleChatTemplate = async (message) => {
        await chat(message, gender);
    };

    useEffect(() => {
        const fetchContent = async () => {
            const contents = await getContentSettingByTag("content");
            const contentByTag = contents.filter((item) => item.tag === tag);
            setSelectedContent(contentByTag[0]);
            setIsLoading(false);
        };
        fetchContent();
    }, [tag]);
    //if(!isTyping){
        useEffect(() => {
        // Set up the interval when component mounts
     
        const interval = setInterval(async () => {
            
                 await handleupdatepersecond();
            
        }, 2000); // Run every 1000ms (1 second)

        // Clean up the interval when component unmounts
        return () => clearInterval(interval);
        }, [gender]); // Add gender as dependency since it's used in handleupdatepersecond
   // }
    const handleStop = async (event) => {
        await updatemove(0, 0,gender);
    }
    const handleupdatepersecond = async () => {
        if (!gender) return; // Guard clause if gender is not set
        
        await updatepersecond(gender);
        setIsEventActive(getIsEvent());
        setCurrentEvent(getNamaEvent());

       
    };
    const handleMove = async (event) => {
        await updatemove(event.x, event.y, gender);
       
    }

    const typeWriter = (text) => {
        setIsTyping(true);
        let i = 0;
        setDialogText("");
        const speed =60; // kecepatan mengetik (ms)

        const typing = setInterval(() => {
            if (i < text.length) {
                setDialogText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typing);
                setIsTyping(false);
            }
        }, speed);
    };

    const handleInteract = async (event) => {
        //await chat("ok", gender);
      
      if(!isTyping){
        switch (getNamaEvent()) {
            case "Eggs":
                npcDialog.text = " "+"This is magic Eggs";
                npcDialog.image = "/images/Eggs.png";
                break;
            case "Totem":
                npcDialog.text = " "+"This is totem from rock";
                npcDialog.image = "/images/Totem.png";
                break;
            case "Shield":
                npcDialog.text = " "+"This is Shield to use in war";
                npcDialog.image = "/images/Shield.png";
                break;
            default:
                npcDialog.text = " "+"Nothing here";
                npcDialog.image = "";
                break;
        }
        setShowDialog(true);
        setDialogText(npcDialog.text);
       // typeWriter(npcDialog.text);
      }  
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };

    // Pindahkan definisi npcDialog ke atas agar bisa dimodifikasi
    const npcDialog = {
        text: "",
        image: "/images/Totem.png"
    };

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    if (gender === null) {
        return (
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                   <BackIcon />
                <h1 style={{color:'white'}}>Pilih Player:</h1>     
                <br></br>
                <button style={{ backgroundColor: 'white', width:'250px', fontSize: '30px', padding: '10px 20px', margin: '10px' }} onClick={() => handleGenderSelect('male')}>Raja</button>
                <br></br>
                <button style={{ backgroundColor: 'white', width:'250px', fontSize: '30px', padding: '10px 20px', margin: '10px' }} onClick={() => handleGenderSelect('female')}>Ratu</button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-4 p-4">
                <BackIcon />
                
                {/* Chat Template Toggle dan Grid */}
                <div className="w-[90%] max-w-md">
                    <button 
                        onClick={() => setShowChatGrid(!showChatGrid)}
                        className="bg-primary-orange text-white px-4 py-2 rounded-t-lg font-bold w-full"
                    >
                        {showChatGrid ? "Tutup Chat" : "Buka Chat"}
                    </button>
                    
                    {showChatGrid && (
                        <div className="bg-primary-darker p-4 rounded-b-lg rounded-tr-lg w-full">
                            <div className="grid grid-cols-3 gap-2 w-full">
                                {chatTemplates.map((template, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleChatTemplate(template)}
                                        className="bg-white text-primary-darker px-2 py-3 rounded-lg text-sm hover:bg-primary-orange hover:text-white transition-colors w-full break-words"
                                    >
                                        {template}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Dialog Box */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-primary-darker w-full h-full flex flex-col">
                        {/* Image Container */}
                        <div className="w-full h-1/2 p-4">
                            <img 
                                src={npcDialog.image} 
                                alt="NPC"
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>

                        {/* Dialog Container */}
                        <div className="w-full h-1/2 bg-white p-6 rounded-t-3xl flex flex-col">
                            <div className="flex-1 overflow-y-auto">
                                <p className="text-2xl text-center">
                                    {dialogText}
                                    {isTyping && <span className="animate-pulse">|</span>}
                                </p>
                            </div>
                            {!isTyping && (
                                <div className="flex justify-center pb-4">
                                    <button 
                                        onClick={() => setShowDialog(false)}
                                        className="bg-primary-orange text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-primary-orange/90 transition-colors"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div id="joysticon" style={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                {isEventActive && (
                    <button 
                        onClick={handleInteract}
                        style={{ 
                            backgroundColor: 'white',
                            width: '200px',
                            height: '60px',
                            borderRadius: '30px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                    >
                        Interact
                    </button>
                )}
                <Joystick size={200} sticky={false} baseColor="white" stickColor="grey" move={handleMove} stop={handleStop}></Joystick>
            </div>
        </div>
    );
};

export default Joystix;
