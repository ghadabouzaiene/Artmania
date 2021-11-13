import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const auth = useSelector((state)=>state.auth)

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');
  
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      let currentTimestamp = Date.now()
      const url = await storageRef.getDownloadURL();
      const createdAt = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp);
      const author = auth.user._id;
      const author_name = auth.user.firstname
      const story = "";
      const tags = [];
      const name = file.name;
      const likes  = [] ;


      await collectionRef.add({ url, createdAt,author,story,tags, name ,author_name, likes});
      
      setUrl(url);
    });
  }, [file,auth.user]);



  return { progress, url, error };
}

export default useStorage;