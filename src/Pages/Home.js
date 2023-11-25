import React, { useEffect,useState } from 'react';
import { getDocs ,collection, deleteDoc,doc} from 'firebase/firestore';
import { db } from '../firebase-config';

function Home  () {
  const [postLists,setPostList] = useState([]);
  const postCollectionRef=collection(db,"posts");
  const getPosts = async () => {
    try {
      const data = await getDocs(postCollectionRef);
      setPostList(
        data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    console.log("Effect called");
    getPosts();
  }, []);
  return (
    <div className='homePage'>
      {postLists.map((post)=>{
        return (

         <div className="post">
   
          <div className="postHeader">
       
            <div className="title">
              <h1> {post.title}</h1>
            </div>
            <div className='deletePost'>
              <button onClick={()=>{deletePost(post.id)}}>&#128465;</button>
            </div>
          </div>
         <div className='postTextContainer'> {post.postText}</div> 
         {/* <h3>@{post.author.name}</h3> */}
          </div>
        );
      }
      )}

    
    </div>
  )
}

export default Home