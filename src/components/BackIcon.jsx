import React from "react";
import { useNavigate } from "react-router-dom";

const BackIcon = ({ className, url, iconColor }) => {
    const selectedColor = {
        white: "#fff",
        black: "#000",
        default: "#A79068",
    };

    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(url || -1)} className={`${className} p-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024">
                <path fill={selectedColor[iconColor] || selectedColor.default} d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
                <path
                    fill={selectedColor[iconColor] || selectedColor.default}
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                />
            </svg>
        </div>
    );
};

export default BackIcon;
