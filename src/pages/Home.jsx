import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { getContentSettingByTag } from "../lib/firebase/contentSetting";
import { useAuth } from "../context/AuthProvider";
import logoGaleri from "/images/logo-galeri-indonesia-kaya.png";
import { getCountFromTotal } from "../lib/firebase/scannedImageServices";
import { getSelectedUserPoints } from "../lib/firebase/users";
import LoadingScreen from "../components/LoadingScreen";
import { getCanClaim } from "../lib/firebase/quiz";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../lib/firebase/firebase";
const Home = () => {
    const { user, logoutUser } = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedContent, setSelectedContent] = React.useState(null);
    const [countFromTotal, setCountFromTotal] = React.useState("");
    const [userPoint, setUserPoint] = React.useState("");
    const [canClaim, setCanClaim] = React.useState(false);
    const [showStory, setShowStory] = React.useState(false);
    const navigate = useNavigate();
    initializeApp(firebaseConfig);
    const hasCompletedTutorial = sessionStorage.getItem("hasCompletedTutorial");
    const redirectUserUrl = hasCompletedTutorial ? "/start" : "/guide";
    const getUserPoint = async () => {
        const point = await getSelectedUserPoints(user.id);
        setUserPoint(point);
    };

    useEffect(() => {
        const fetchContent = async () => {
            const contents = await getContentSettingByTag("content");
            const contentByTag = contents.find((item) => item.tag === "home");
            setSelectedContent(contentByTag);
            setIsLoading(false);
        };

        fetchContent();
    }, []);

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                const res = await getCountFromTotal(user.id);
                const claim = await getCanClaim();
                setCountFromTotal(res);
                setCanClaim(claim);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        getUserPoint();
    }, [user]);

    useEffect(() => {
        // Mengubah judul tab browser
        document.title = "Empat Raja";
        setIsLoading(false);
    }, []);

    const handleStartClick = () => {
        setShowStory(true);
    };

    const handleContinueToGame = () => {
        navigate('/joystix');
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (showStory) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-primary-darker p-8">
               
               <div className="max-w-2xl text-white text-lg leading-relaxed mb-8 text-center">
                <h1>Arungi</h1>
               </div>
                <div className="max-w-2xl text-white text-base leading-relaxed mb-8 text-center">
                    
                    <p className="mb-8">
                    Di sebuah desa yang damai, hiduplah sepasang suami istri yang sangat menginginkan seorang anak. Setiap hari mereka berdoa dengan tulus, berharap keajaiban datang ke dalam hidup mereka.
Suatu pagi, mereka memutuskan pergi ke hutan untuk mencari kayu bakar…<br></br> <b>Tanpa mereka tahu, hari itu akan mengubah segalanya.</b>
</p>
                   
                    <button
                        onClick={handleContinueToGame}
                        className="bg-primary-orange text-white text-xl font-bold rounded-xl px-10 py-6 hover:bg-primary-orange/90 transition-colors"
                    >
                        Mulai Petualangan
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-primary-darker">
            <h1 className="text-4xl font-bold text-primary-brass mb-8">Arungi - Empat Raja</h1>
            <button
                onClick={handleStartClick}
                className="bg-primary-orange text-white text-xl font-bold rounded-xl px-10 py-6 hover:bg-primary-orange/90 transition-colors"
            >
                Mulai Bermain
            </button>
        </div>
    );
};

export default Home;
