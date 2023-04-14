import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchTodos(){
    const{currentUser} = useAuth()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [todos, setTodos] = useState(null)
    console.log(error)

    useEffect(()=>{
        async function fetchData() {
            try{
                const docRef = doc(db,'users',currentUser.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    console.log(docSnap.data())
                    setTodos(docSnap.data().todos)
                }
                if(!docSnap.exists){
                    console.log("Shit")
                }
            }catch(error){
                setError("An error occured")
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])

    return {loading,error,todos}
}