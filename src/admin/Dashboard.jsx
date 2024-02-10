import { useState } from "react";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function Dashboard() {
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

  // Define collections
  const collections = {
    thankful: collection(db, import.meta.env.VITE_COLLECTION_THANKFUL),
    happy: collection(db, import.meta.env.VITE_COLLECTION_HAPPY),
    angry: collection(db, import.meta.env.VITE_COLLECTION_ANGRY),
    anxious: collection(db, import.meta.env.VITE_COLLECTION_ANXIOUS),
    lonely: collection(db, import.meta.env.VITE_COLLECTION_LONELY),
    sad: collection(db, import.meta.env.VITE_COLLECTION_SAD),
  };

  // Initialize state for form data
  const [formData, setFormData] = useState({
    thankful: { verse: "", hasBeenRead: false },
    happy: { verse: "", hasBeenRead: false },
    angry: { verse: "", hasBeenRead: false },
    anxious: { verse: "", hasBeenRead: false },
    lonely: { verse: "", hasBeenRead: false },
    sad: { verse: "", hasBeenRead: false },
  });
  const [documentId, setDocumentId] = useState(null);

  const handleChange = (e, collectionName) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [collectionName]: { ...formData[collectionName], [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = Object.keys(formData).reduce((acc, collectionName) => {
        if (formData[collectionName].verse.trim() !== "") {
          acc.push(
            addDoc(collections[collectionName], { ...formData[collectionName] })
          );
        }
        return acc;
      }, []);

      const results = await Promise.all(promises);

      setDocumentId(results.map((docRef) => docRef.id));
      console.log(
        "Documents written with IDs: ",
        results.map((docRef) => docRef.id)
      );

      setFormData(
        Object.keys(formData).reduce((acc, collectionName) => {
          acc[collectionName] = { verse: "", hasBeenRead: false };
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error adding documents: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.keys(collections).map((collectionName) => (
          <div key={collectionName}>
            <h3>{collectionName}</h3>
            <div>
              <label htmlFor={`${collectionName}-verse`}>Verse:</label>
              <textarea
                id={`${collectionName}-verse`}
                name="verse"
                value={formData[collectionName].verse}
                onChange={(e) => handleChange(e, collectionName)}
              />
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {documentId && <p>Document IDs: {documentId.join(", ")}</p>}
    </>
  );
}
