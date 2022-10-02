import React, { useEffect, useState } from "react";
import "./form.css";
import { auth, db } from "../../firebase";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import logo from "../../img/in.png";
import { setEmail, setName, setPassword, setUser } from "../../redusers/users";
import { Input } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Form = () => {
  const { userName, Email, password, user } = useSelector(
    (state) => state.Users
  );
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(setUser(authuser));
        // if (authuser.displayName) {
        // } else {
        //   return authuser.updateProfile({
        //     displayName: userName,
        //   });
        console.log('sddsdsd')
        // }
      } else {

        dispatch(setUser(null));
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user, userName]);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPost(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, [post]);
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(Email, password)
      .then((authuser) => {
        return authuser.user.updateProfile({
          displayName: userName,
        });
      })
      .catch((err) => alert(err));
    setOpen(false);
  };
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(Email, password).catch((err) => alert(err));
    setOpenSignIn(false);
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form className="appForm">
            <center>
              <img style={{ width: "100px" }} src={logo} alt="sd" />
            </center>
            <Input
              type="text"
              onChange={(e) => dispatch(setName(e.target.value))}
              placeholder="username"
              value={userName}
            />
            <Input
              type="email"
              onChange={(e) => dispatch(setEmail(e.target.value))}
              placeholder="Email"
              value={Email}
            />
            <Input
              type="password"
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder="username"
              value={password}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>

          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={style}>
          <form className="appForm">
            <center>
              <img style={{ width: "100px" }} src={logo} alt="sd" />
            </center>
            <Input
              type="email"
              onChange={(e) => dispatch(setEmail(e.target.value))}
              placeholder="Email"
              value={Email}
            />
            <Input
              type="password"
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder="username"
              value={password}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="signIncontainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign IN</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
    </>
  );
};

export default Form;
