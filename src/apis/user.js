import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/frb_config";

export const fetchUser = async(uid) => {
    console.log(uid);
    try {
        const usersDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(usersDocRef);
  
        if (userDocSnap.exists()) {
            return userDocSnap.data();
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const allUsers = async() => {
    try{
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(usersList);
        return usersList;
    } catch (err) {
        console.log(err);
        return null;
    }
}