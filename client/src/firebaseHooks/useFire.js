import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFire = (collection) => {
  const [profilepicture, setProfilePicture] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setProfilePicture(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { profilepicture };
}

export default useFire;