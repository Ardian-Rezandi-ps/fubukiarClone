import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { getContentSettingByTag } from "../lib/firebase/contentSetting";
import BackIcon from "../components/BackIcon";
import { sanitizeDOM } from "../lib/sanitizeDOM";
import LoadingScreen from "../components/LoadingScreen";
import { Joystick } from 'react-joystick-component';
import {updatemove} from "../lib/firebase/movexy";
import {chat} from "../lib/firebase/movexy";
const Joystix = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedContent, setSelectedContent] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const params = useParams();
    const tag = params.tag;

    useEffect(() => {
        const fetchContent = async () => {
            const contents = await getContentSettingByTag("content");
            const contentByTag = contents.filter((item) => item.tag === tag);
            setSelectedContent(contentByTag[0]);
            setIsLoading(false);
        };
        fetchContent();
    }, [tag]);


    const handleStop = async (event) => {
        await updatemove(0, 0,gender);
    }
    const handleMove = async (event) => {
      //  console.log(`Direction: ${event.direction}, MoveX: ${event.x}, MoveY: ${event.y}`);
        await updatemove(event.x, event.y,gender);
    }

    const handleInteract = async (event) => {
        await chat("ok",gender);
        // Implementasi logika interaksi di sini
        console.log("Interaksi dilakukan!");
    }

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
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
            </div>
        );
    }

    return (
        <div>
              <BackIcon />
            <h1 style={{color:'white'}}>Test</h1>
            
            <div style={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
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
