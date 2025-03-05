import { get, ref, set,update } from "firebase/database";
import { database } from "./firebase";

export const updatemove = async (x,y) => {
    let mx=x;
    let my=y;
      //  const tes = await get(ref(database, `/count/badwords`));
      //  console.log("test=", tes.val());
    // Update the value in Firebase database
   // const moveRef = ref(database, 'count/Demo'); // Menentukan referensi ke lokasi di database
        await set(ref(database, `count/Raja/moveX`), mx);
   //await set(ref(database, `count/Demo/moveY`), my);// Mengupdate nilai moveX dan moveY
  // set(ref(database, 'count/Demo'), {
 //  moveY: mx,
   // moveX: my
  //});
   
   console.log("xy="+mx);


}

