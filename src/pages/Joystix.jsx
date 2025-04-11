import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { getContentSettingByTag } from "../lib/firebase/contentSetting";
import BackIcon from "../components/BackIcon";
import { sanitizeDOM } from "../lib/sanitizeDOM";
import LoadingScreen from "../components/LoadingScreen";
import { Joystick } from 'react-joystick-component';
import { updatemove, getIsEvent, getNamaEvent,getKoleksi,KoleksitoFalse, updatepersecond 
    ,onlineGender, KoleksiHitung, getJumlahkol,getLastItem} from "../lib/firebase/movexy";
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
    const [showQuestInfo, setShowQuestInfo] = useState(false);
    const [lastItemGet, setLastItemGet] = useState(null);
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

   

    useEffect(() => {
        const interval = setInterval(async () => {
            await handleupdatepersecond();
        }, 2000);

        return () => clearInterval(interval);
    }, [gender]);

    const handleStop = async (event) => {
        await updatemove(0, 0,gender);
    }
    const handleupdatepersecond = async () => {
        if (!gender) return;
        
        await updatepersecond(gender);
       
        setCurrentEvent(getNamaEvent());
        KoleksitoFalse(gender); 
        KoleksiHitung(gender);  
        setCollectionCount(getJumlahkol());
        setLastItemGet(getLastItem());
    };
    const handleMove = async (event) => {
        await updatemove(event.x, event.y, gender);
       
    }

    const typeWriter = (text) => {
        setIsTyping(true);
        let i = 0;
        setDialogText("");
        const speed =60;

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
       // console.log("neam even="+getNamaEvent());
        if(!isTyping){
            switch (getNamaEvent()) {
                case "Cendrawasih":
                 //   console.log("neam even egg");
                    npcDialog.text = " "+"This is Cendrawasih";
                    setDialogImage("/images/Cendrawasih.png");
                    break;
                case "Papeda":
                    npcDialog.text = " "+"This is Papeda";
                    setDialogImage("/images/Papeda.png");
                    break;
                case "Suling":
                    npcDialog.text = " "+"ini Suling";
                    setDialogImage("/images/Suling.png");
                    break;
               case "Parang":
                npcDialog.text = " "+"ini Parang";
                   setDialogImage("/images/Parang.png");
                    setShowOkButton(true);
                    break;
                case "Wor Wanita":
                        npcDialog.text = " "+"ini Wor Wanita";
                        setDialogImage("/images/Wor Wanita.png");
                        setShowOkButton(true);
                        break;
                case "Lukisan Kulit kayu":
                            npcDialog.text = " "+"Ini Lukisan Kulit kayu";
                            setDialogImage("/images/Lukisan Kulit kayu.png");
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

    const npcDialog = {
        text: "",
        image: "/images/Totem.png"
    };

    const handleBackChoice = () => {
        onlineGender(gender,false);
    };

    const handleLogout = () => {
        console.log("log klik");    
        handleBackChoice();
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };

    const questItems = [
        { name: "Papeda", collected: false },
        { name: "Parang", collected: false },
        { name: "Suling", collected: false },
        { name: "Cendrawasih", collected: false },
        { name: "Lukisan Kulit Kayu", collected: false },
        { name: "Wor Wanita", collected: false },
    ];


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
                    onClick={() => window.location.href = '/'}
                >
                   Kembali
                 
                </button>
           
            </div>
        );
    }

    if (collectionCount >= 6) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-primary-darker text-white">
                <h1 className="text-4xl font-bold  justify-center">Kamu Memenangkan Permainan Ini!</h1>
                <div className="flex justify-center">
                    <img src="/images/correct.png" alt="Congratulations" className="w-1/2 justify-center" />
                </div>
                <p id="selamat" className="mt-4 text-lg  justify-center">Selamat!</p>
                <button 
                    onClick={() => window.location.href = '/'}
                    className="mt-6 bg-primary-orange text-white px-4 py-2 rounded-lg justify-center"
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
            
    
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-primary-darker w-full h-full flex flex-col">
                        <div className="w-full h-1/2 p-4">
                            <img 
                                id="gambarEvent"
                                src={dialogImage} 
                                alt="NPC"
                                className="w-full h-full object-contain rounded-lg"
                            />
                            <p className="absolute top-2 right-2 text-white bg-black bg-opacity-50 px-2 rounded">Koleksi: {collectionCount}/6</p>
                        </div>

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
                <div id="ketkoleksi" className="bg-white px-4 py-2 rounded-lg text-xl font-bold text-primary-darker">
                    Koleksi: {collectionCount}/6
                </div>
                <button 
                    onClick={() => setShowQuestInfo(true)}
                    className="bg-primary-orange text-white px-4 py-2 rounded-lg mt-2"
                >
                    Quest Info
                </button>
            
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

            {showQuestInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full h-full p-6 rounded-lg">
                        <h1 className="text-xl font-bold mb-4 justify-center">Quest Items</h1>
                        <ul>
                            {questItems.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="mr-2">{item.collected ? "✔️" : "❌"}</span>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => setShowQuestInfo(false)}
                            className="bg-primary-orange text-white px-4 py-2 rounded-lg mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Joystix;
