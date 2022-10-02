import React, { useEffect } from "react";
import "./App.css";
import CreatePost from "./components/createpost/createpost";
// import InstagramEmbed from 'react-instagram-embed';
import Header from "./components/header/header";
import Posts from "./components/posts/posts";
import { db } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { addPosts } from "./redusers/posts";
function App() {
  const { post } = useSelector((state) => state.Posts);
  const { user } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          addPosts(
            snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
          )
        );
      }); 
  }, []);

  // useEffect(() => {
  //   dispatch(getposts());
  //   console.log(post);
  // }, [post]);
  return (
    <div className="app">
      <Header />
      <div className="app_posts">
      {post.length > 0
        ? post.map(({ id, post }) => (
            <Posts
              key={id}
              userName={post.userName}
              caption={post.caption}
              imgeUrl={post.imageUrl}
            />
          ))
        : "Loading..."}
        </div>
        {/* <InstagramEmbed
  clientAccessToken='<appId>|<clientToken>'
  url='https://instagr.am/p/Zw9o4/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  injectScript
  protocol=''
  onLoading={() => {}}
  onSuccess={() => {}} 
  onAfterRender={() => {}}
  onFailure={() => {}}
/> */}
              {user ? <CreatePost userName={post.userName} /> : "Login to create post"}

    </div>
  );
}

export default App;
