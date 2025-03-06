import { get, ref, set,update } from "firebase/database";
import { database } from "./firebase";

export const updatemove = async (x,y,gender) => {
    let mx=x;
    let my=y;
    let mg=gender;
    var gen="Demo";
    if(gender === "female"){
      gen="Demo2";
    }
      const tes = await get(ref(database, `count/`+gen+`/moveX`));
      console.log("test=", String(tes.val()));
    // Update the value in Firebase database
   // const moveRef = ref(database, 'count/Demo'); // Menentukan referensi ke lokasi di database
      await set(ref(database, `count/`+gen+`/moveX`), mx);
      await set(ref(database, `count/`+gen+`/moveY`), my);// Mengupdate nilai moveX dan moveY
  // set(ref(database, 'count/Demo'), {
 //  moveY: mx,
   // moveX: my
  //});
   
  // console.log("xy="+mx);


}

