import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { getContentSettingByTag } from "../lib/firebase/contentSetting";
import BackIcon from "../components/BackIcon";
import { sanitizeDOM } from "../lib/sanitizeDOM";
import LoadingScreen from "../components/LoadingScreen";
import { Joystick } from 'react-joystick-component';
import {updatemove} from "../lib/firebase/movexy";
const Joystix = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedContent, setSelectedContent] = React.useState(null);
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
        console.log('stop');
    }

    const handleMove = async (event) => {
      //  console.log(`Direction: ${event.direction}, MoveX: ${event.x}, MoveY: ${event.y}`);
        await updatemove(event.x, event.y);
    }

    

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <div>
              <BackIcon />
            <h1 style={{color:'white'}}>Test</h1>
            <div style={{ position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)' }}>
                <Joystick size={200} sticky={false} baseColor="white" stickColor="grey" move={handleMove} stop={handleStop}></Joystick>
            </div>
            
        </div>
    );
};

export default Joystix;
