import React from "react";
import { Joystick } from 'react-joystick-component';
import { useAuth } from "../context/AuthProvider";
import { ref, set } from "firebase/database";
import { database } from "../lib/firebase/firebase";

const ControlArundaya = () => {
  const { user } = useAuth();

  // Fungsi untuk update moveX dan moveY ke Users/{user.id}/moveX dan moveY
  const updatemoveUser = async (x, y) => {
    if (!user?.id) return;
    await set(ref(database, `Users/${user.id}/moveX`), x);
    await set(ref(database, `Users/${user.id}/moveY`), y);
  };

  const handleMove = (event) => {
    updatemoveUser(event.x, event.y);
  };

  const handleStop = () => {
    updatemoveUser(0, 0);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-primary-darker p-8">
     <Joystick
        size={200}
        sticky={false}
        baseColor="white"
        stickColor="grey"
        move={handleMove}
        stop={handleStop}
      />
    </div>
  );
};

export default ControlArundaya;
