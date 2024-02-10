import { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Emotion from "./routes/Emotion";
import Root from "./routes/Root";

function App() {
  const [thankful, setThankful] = useState([]);
  const [happy, setHappy] = useState([]);
  const [angry, setAngry] = useState([]);
  const [anxious, setAnxious] = useState([]);
  const [lonely, setLonely] = useState([]);
  const [sad, setSad] = useState([]);
  const [loading, setLoading] = useState(true);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //collection references
  const colThankful = collection(db, import.meta.env.VITE_COLLECTION_THANKFUL);
  const colHappy = collection(db, import.meta.env.VITE_COLLECTION_HAPPY);
  const colAngry = collection(db, import.meta.env.VITE_COLLECTION_ANGRY);
  const colAnxious = collection(db, import.meta.env.VITE_COLLECTION_ANXIOUS);
  const colLonely = collection(db, import.meta.env.VITE_COLLECTION_LONELY);
  const colSad = collection(db, import.meta.env.VITE_COLLECTION_SAD);

  //handle async

  useEffect(() => {
    const unsubscribe = [
      onSnapshot(colThankful, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setThankful(newData);
      }),
      onSnapshot(colHappy, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHappy(newData);
      }),
      onSnapshot(colAngry, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAngry(newData);
      }),
      onSnapshot(colAnxious, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnxious(newData);
      }),
      onSnapshot(colLonely, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLonely(newData);
      }),
      onSnapshot(colSad, (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSad(newData);
        setLoading(false); // Once all data is fetched, set loading to false
      }),
    ];

    return () => {
      unsubscribe.forEach((unsub) => unsub());
    };
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/bible-jar" element={<Root />} />
          <Route
            path="/display/:emotion"
            element={
              <Emotion
                happy={happy}
                anxious={anxious}
                angry={angry}
                lonely={lonely}
                thankful={thankful}
                sad={sad}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
