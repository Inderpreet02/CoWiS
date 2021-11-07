import React, { useEffect, useState } from 'react';

import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, provider } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Service from './Service';
import Design1 from './pages/Design1';
import CardPage from './pages/CardPage';

function App() {
  
  const [user] = useAuthState(auth);

  const [input, setInput] = useState("");

  const [post, setPost] = useState([]);

  const [services, setServices] = useState([]);

  const register = (e) => {
    e.preventDefault();

    db.collection("organisations").doc(user.uid).set({
      organisationName: "Thapar",
      desc: "Jod bahi jod",
      photoURL: "",

    })
  }

  const addService = (e) =>{
    e.preventDefault();

    db.collection("organisations").doc(user.uid).collection("services").add({
      name: "Square 1",
      photoURL: "",
      desc: "test"
    })
  }

  const send = (e) =>{
    e.preventDefault();

    db.collection("posts").add({
      name: "JOD",
      desc: "test",
      message: input
    })
  }


  const logIn = (e) =>{
    e.preventDefault();

    auth.signInWithPopup(provider)
    .catch(err=> alert(err))
  }

  useEffect(()=> {
    db.collection("posts").onSnapshot(snpashot=>(
      setPost(snpashot.docs.map(doc=>(
        {
          id: doc.id,
          data: doc.data(),
        }
      )))
    ))
  }, [user])

  useEffect(()=> {
    user && db.collection("organisations").doc(user.uid).collection("services").onSnapshot(snpashot=>(
      setServices(snpashot.docs.map(doc=>(
        {
          id: doc.id,
          data: doc.data(),
        }
      )))
    ))
  },[user])

  return (
    <div className="App">
      <Router>
        <>
          <Switch>
            <Route path="/D1">
              <Design1/>
            </Route>
            <Route path="/D2">
              <CardPage/>
            </Route>
            <Route path="/:serviceId">
              <Service/>
            </Route>
            <Route path="/">
            <h1>nigger </h1>

              {user && 
                <div className="dadad">
                  USER ID: {user.uid}
                </div>
              }

              <button onClick={logIn}>LogIn</button>
              <button onClick={ (e) => auth.signOut()}>LogOut</button>


              <input type="text" value={input} onChange={e=>setInput(e.target.value)} />
              <button onClick={send}>ADD</button>
              {post && post.map(({id, data: {message, name, desc}})=> (
                <div className="temp">
                  {message}
                </div>
              ))}

              {
                user && 
                <div className="register">
                  <button className="add__register" onClick={register}>
                    Register New
                  </button>
                </div>
              }

              {user && 
                <div className="adad">
                  <h1>Add services</h1>
                  <button onClick={addService}>+ Add Service</button>

                  <div className="asdas">
                    {services && services.map(({id: id, data: {name, desc}})=>
                      <Link key={id} to = {`/${id}`}>
                        {name}
                      </Link>
                    )}
                  </div>
                </div>
              }
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
