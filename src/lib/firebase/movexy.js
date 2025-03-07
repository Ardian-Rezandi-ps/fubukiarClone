import { get, ref, set,update } from "firebase/database";
import { database } from "./firebase";

export const updatemove = async (x,y,gender) => {
    let mx=x;
    let my=y;
    let mg=gender;
    var gen="Demo";
    if(mg === "female"){
      gen="Demo2";
    }
 
    // Update the value in Firebase database
       await set(ref(database, `count/`+gen+`/moveX`), mx);
      await set(ref(database, `count/`+gen+`/moveY`), my);// Mengupdate nilai moveX dan moveY
 
}

export const chat = async (chtstring,gender) => {
  
  let cht=chtstring;
  let mg=gender;
  var gen="Demo";
  if(mg === "female"){
    gen="Demo2";
  }
   
  // Update the value in Firebase database
    await set(ref(database, `count/`+gen+`/ischat`), true);
     await set(ref(database, `count/`+gen+`/chat`), cht);
     // Mengupdate nilai chat

}

