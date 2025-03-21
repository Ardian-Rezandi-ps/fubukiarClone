import { get, ref, set, update } from "firebase/database";
import { database } from "./firebase";

let Koleksi = false;
let isEvent = false;
let namaEvent = ""; // Variable untuk menyimpan nama event
export const updatepersecond = async (gender) => {
  let mg=gender;
  var gen="Demo";
  if(mg === "female"){
    gen="Demo2";
  }
  // Get isevent value from Firebase
  const eventRef = ref(database, `count/${gen}/isevent`);
  const snapshot = await get(eventRef);
  if (snapshot.exists()) {
      isEvent = snapshot.val();
  }
  const koleksiRef = ref(database, `count/${gen}/Koleksi`);
  const snapshotKol = await get(koleksiRef);
  if (snapshotKol.exists()) {
      Koleksi = snapshotKol.val();
  }
  // Get event name value from Firebase
  const eventNameRef = ref(database, `count/${gen}/event`);
  const eventSnapshot = await get(eventNameRef);
  if (eventSnapshot.exists()) {
      namaEvent = eventSnapshot.val();
  }

  return isEvent;
}
export const updatemove = async (x,y,gender) => {
    let mx=x;
    let my=y;
    let mg=gender;
    var gen="Demo";
    if(mg === "female"){
      gen="Demo2";
    }
 
    // Update the value in Firebase database
    await set(ref(database, `count/${gen}/moveX`), mx);
    await set(ref(database, `count/${gen}/moveY`), my);
    
}
export const KoleksitoFalse = async (gender) => {
  let mg=gender;
  var gen="Demo";
  if(mg === "female"){
    gen="Demo2";
  }
  await set(ref(database, `count/${gen}/Koleksi`), false);
}
// Export isEvent dan namaEvent
export const getIsEvent = () => isEvent;
export const getNamaEvent = () => namaEvent;
export const getKoleksi = () => Koleksi;
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

