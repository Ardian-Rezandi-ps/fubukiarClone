import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { getContentSettingByTag } from "../lib/firebase/contentSetting";
import BackIcon from "../components/BackIcon";
import { sanitizeDOM } from "../lib/sanitizeDOM";
import LoadingScreen from "../components/LoadingScreen";
import { Joystick } from 'react-joystick-component';
import { updatemove, getIsEvent, getNamaEvent,getKoleksi,KoleksitoFalse, updatepersecond 
    ,onlineGender, KoleksiHitung, getJumlahkol} from "../lib/firebase/movexy";
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
    const [Koleksi, setCurrentKoleksi] = useState("");
    
    const [dialogImage, setDialogImage] = useState("/images/Totem.png");
    const [collectionCount, setCollectionCount] = useState(0);
    const [showOkButton, setShowOkButton] = useState(false);
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
       
        setCurrentEvent(getNamaEvent());
        //setCurrentKoleksi(getKoleksi());
      //  if (getKoleksi()) {
            // Update Firebase to set Koleksi to false
        
            KoleksitoFalse(gender); 
            KoleksiHitung(gender);  
            // Increment collection counter (max 7)
            setCollectionCount(getJumlahkol());
       // }
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
        console.log("neam even="+getNamaEvent());
        if(!isTyping){
            // Check if this is a new collection
           

            switch (getNamaEvent()) {
                case "Eggs":
                    console.log("neam even egg");
                    npcDialog.text = " "+"This is magic Eggs";
                    setDialogImage("/images/Eggs.png");
                    break;
                case "Totem":
                    npcDialog.text = " "+"This is totem from rock";
                    setDialogImage("/images/Totem.png");
                    break;
                case "Shield":
                    npcDialog.text = " "+"This is Shield to use in war";
                    setDialogImage("/images/Shield.png");
                    break;
               case "Vilager Wanita NPC":
                    npcDialog.text = " "+"Maukah ikut Lomba mencari Benda?";
                    setDialogImage("/images/Eggs.png");
                    setShowOkButton(true);
                    break;
                default:
                    npcDialog.text = " "+"Nothing here";
                    setDialogImage("/images/Shield.png");
                    break;
            }
            setShowDialog(true);
            setDialogText(npcDialog.text);
        }  
    };

    const handleGenderSelect = (selectedGender) => {
        setIsEventActive(true);
        setGender(selectedGender);
        onlineGender(selectedGender,true);
    };

    // Pindahkan definisi npcDialog ke atas agar bisa dimodifikasi
    const npcDialog = {
        text: "",
        image: "/images/Totem.png"
    };

    const handleBackChoice = () => {
        onlineGender(gender,false);
         // Reset gender to allow selection again
    };

    const handleLogout = () => {
        console.log("log klik");    
        handleBackChoice();
        setTimeout(() => {
            window.location.href = '/'; // Kembali ke halaman utama setelah 2 detik
        }, 2000);
    };

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    if (gender === null) {
        return (
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
               
                <h1 style={{color:'white'}}>Pilih Player:</h1>     
                <br></br>
                <button style={{ backgroundColor: 'white', width:'250px', fontSize: '30px', padding: '10px 20px', margin: '10px' }} onClick={() => handleGenderSelect('male')}>Raja</button>
                <br></br>
                <button style={{ backgroundColor: 'white', width:'250px', fontSize: '30px', padding: '10px 20px', margin: '10px' }} onClick={() => handleGenderSelect('female')}>Ratu</button>
                <br></br>
                <br></br>
                <br></br>
                <button 
                    style={{ backgroundColor: 'white', width:'150px', fontSize: '20px', padding: '10px 20px', margin: '10px' }} 
                    onClick={() => window.location.href = '/'} // Reroute to home
                >
                   Kembali
                 
                </button>
           
            </div>
        );
    }

    if (collectionCount >= 7) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-primary-darker text-white">
                <h1 className="text-4xl font-bold  justify-center">Kamu Memenangkan Permainan Ini!</h1>
                <div className="flex justify-center">
                    <img src="/images/correct.png" alt="Congratulations" className="w-1/2" />
                </div>
                <p id="selamat" className="mt-4 text-lg  justify-center">Selamat!</p>
                <button 
                    onClick={() => window.location.href = '/'} // Reroute to home
                    className="mt-6 bg-primary-orange text-white px-4 py-2 rounded-lg"
                >
                    Kembali ke Beranda
                </button>
            </div>
        );
    }

    return (
        <div>
            <button 
                onClick={handleLogout}
                style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}
            >
                Logout
            </button>
            
    
                {/* Chat Template Toggle dan Grid */}
                {/* <div className="w-[90%] max-w-md"> */}
                {/*     <button  */}
                {/*         onClick={() => setShowChatGrid(!showChatGrid)} */}
                {/*         className="bg-primary-orange text-white px-4 py-2 rounded-t-lg font-bold w-full" */}
                {/*     > */}
                {/*         {showChatGrid ? "Tutup Chat" : "Buka Chat"} */}
                {/*     </button> */}
                    
                {/*     {showChatGrid && ( */}
                {/*         <div className="bg-primary-darker p-4 rounded-b-lg rounded-tr-lg w-full"> */}
                {/*             <div className="grid grid-cols-3 gap-2 w-full"> */}
                {/*                 {chatTemplates.map((template, index) => ( */}
                {/*                     <button */}
                {/*                         key={index} */}
                {/*                         onClick={() => handleChatTemplate(template)} */}
                {/*                         className="bg-white text-primary-darker px-2 py-3 rounded-lg text-sm hover:bg-primary-orange hover:text-white transition-colors w-full break-words" */}
                {/*                     > */}
                {/*                         {template} */}
                {/*                     </button> */}
                {/*                 ))} */}
                {/*             </div> */}
                {/*         </div> */}
                {/*     )} */}
                {/* </div> */}


            {/* Dialog Box */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-primary-darker w-full h-full flex flex-col">
                        {/* Image Container */}
                        <div className="w-full h-1/2 p-4">
                            <img 
                                id="gambarEvent"
                                src={dialogImage} 
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
                                    {showOkButton ? (
                                        <>
                                            <button 
                                                onClick={() => {
                                                    setShowDialog(false);
                                                    // Tambahkan logika untuk OK di sini jika diperlukan
                                                }}
                                                className="bg-primary-orange text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-primary-orange/90 transition-colors"
                                            >
                                                OK
                                            </button>
                                            <button 
                                                onClick={() => setShowDialog(false)}
                                                className="bg-primary-orange text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-primary-orange/90 transition-colors"
                                              >
                                                Batal
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => setShowDialog(false)}
                                            className="bg-primary-orange text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-primary-orange/90 transition-colors"
                                        >
                                            Tutup
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div id="joysticon" style={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                {/* Collection Counter */}
            
                    <div id="ketkoleksi" className="bg-white px-4 py-2 rounded-lg text-xl font-bold text-primary-darker">
                        Koleksi: {collectionCount}/7
                    </div>
            
                
                {/* Interact Button */}
              
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
             
                <Joystick size={200} sticky={false} baseColor="white" stickColor="grey" move={handleMove} stop={handleStop}></Joystick>
            </div>
        </div>
    );
};

export default Joystix;
