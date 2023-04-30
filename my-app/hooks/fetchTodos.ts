import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export type todoType = { [key: number]: string } | {};

export default function useFetchTodos() {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<todoType>({});
  const [isChanged, setIsChanged] = useState(false);

  const mutate = () => {
    setIsChanged((prev) => !prev);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser!.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data().todos);
          setTodos(docSnap.data().todos);
        }
        if (!docSnap.exists) {
          console.log("Shit");
        }
      } catch (error) {
        setError("An error occured");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isChanged, currentUser]);

  return { loading, error, todos, mutate };
}
