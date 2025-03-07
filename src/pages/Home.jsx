import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
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

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-primary-darker">
            <h1 className="text-4xl font-bold text-primary-brass mb-8">Empat Raja</h1>
            <Link
                to="/joystix"
                className="bg-primary-orange text-white text-xl font-bold rounded-xl px-10 py-6 hover:bg-primary-orange/90 transition-colors"
            >
                Mulai Bermain
            </Link>
        </div>
    );
};

export default Home;
