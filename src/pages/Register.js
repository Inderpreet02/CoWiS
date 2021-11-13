import React, { useState } from 'react'
import "./Register.css"
import logo from "./google-icon.svg"
import { auth, db, provider } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { animate } from 'tsparticles';
import { animationTwo, transition } from '../components/Animations';
import { motion } from 'framer-motion';

function Register() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [desc, setDesc] = useState("");
    const history = useHistory();

    const logIn = (e) =>{
        e.preventDefault();
    
        auth.signInWithPopup(provider)
        .catch(err=> alert(err))
    }

    const register = (e) => {
        e.preventDefault();

        db.collection("organisations").doc(user.uid).set({
          organisationName: name,
          organisationDesc: desc,
          organisationImage: photoURL,
          organisationMobile : phone,
          organisationEmail : user.email,
          organisationAddress : address,
        })

        setName("");
        setAddress("");
        setPhone("");
        setPhotoURL("");
        setDesc("");

        history.push(`./${user.uid}`);
    }

    const leftFadeIn = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    }

    const rightFadeIn = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    }

    const fadedown = {
        hidden: { opacity: 0, y: -100},
        visible: {opacity: 1, y: 0}
    }

    const fadeup = {
        hidden: { opacity: 0, y: 100},
        visible: {opacity: 1, y: 0}
    }

    const fade = {
        hidden: { opacity: 0},
        visible: {opacity: 1}
    }

    const [user] = useAuthState(auth);
    return (

        <motion.div className="register"
            initial = "out" animate="in" exit="end" variants={animationTwo} transition={transition}
            >
                <motion.div className="circle__wrapperMain3">
                    <motion.div className="circle__main3"
                        variants={fadedown}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.8, delay: 0.8}}>

                    </motion.div>
                </motion.div>
            <div className="register__container">

                <form className="register__form">
                    <div className="form__header">
                        <motion.div className="form__headerText"
                            variants={fadedown}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 1, delay: 0.8}}
                            >
                            {
                                user ? (
                                    <span>Loged In As {user.email}</span>
                                    ) : (
                                    <span> Not Logged In</span>
                                )
                            } 
                        </motion.div>

                        {
                            !user ? (

                            <motion.div className="register__login" onClick={logIn}
                                variants={fade}
                                initial="hidden"
                                animate="visible"
                                transition={{duration: 0.5, delay: 0.5}}>
                                <motion.img src={logo} alt=""/> SIGN IN WITH Google
                            </motion.div>
                            ) : (
                                
                            <motion.div className="register__logout" onClick={()=> auth.signOut()}
                                variants={fade}
                                initial="hidden"
                                animate="visible"
                                transition={{duration: 0.5, delay: 0.5}}>
                                Logout
                            </motion.div>
                            )
                        }

                    </div>


                    {
                        user ? (
                            <div className="from__desc">
                                <div className="form__field">
                                    <motion.div className="feild__label"
                                        variants={leftFadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}
                                        >
                                        Organisation Name*
                                    </motion.div>
                                    <motion.input value={name} onChange={(e)=> setName(e.target.value)} type="text" required placeholder="Organisation Name" className="feild__input" 
                                        variants={fade}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}/>
                                </div>

                                <div className="form__field">
                                    <motion.div className="feild__label"
                                        variants={leftFadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}>
                                        Organisation Address*
                                    </motion.div>
                                    <motion.input value={address} onChange={(e)=> setAddress(e.target.value)} type="text" required placeholder="Address" className="feild__input" 
                                        variants={fade}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}/>
                                </div>

                                <div className="form__field">
                                    <motion.div className="feild__label"
                                        variants={leftFadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}>
                                        Contact Number*
                                    </motion.div>
                                    <motion.input value={phone} onChange={(e)=> setPhone(e.target.value)} type="text" required placeholder="Contact Number" className="feild__input" 
                                        variants={fade}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}/>
                                </div>

                                <div className="form__field">
                                    <motion.div className="feild__label"
                                        variants={leftFadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}>
                                        Image url*
                                    </motion.div>
                                    <motion.input value={photoURL} onChange={(e)=> setPhotoURL(e.target.value)} type="url" required placeholder="Image url" className="feild__input" 
                                        variants={fade}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}/>
                                </div>

                                <div className="form__field">
                                    <motion.div className="feild__label"
                                        variants={leftFadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}>
                                        Description*
                                    </motion.div>
                                    <motion.textarea value={desc} onChange={(e)=> setDesc(e.target.value)} rows="4" cols="20" required placeholder="Organisation Desc" className="feild__input" 
                                        variants={fade}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{duration: 0.5, delay: 0.5}}/>
                                </div>

                                <motion.button onClick={register} className="form__btn"
                                    variants={fade}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{duration: 0.5, delay: 0.5}}> Register </motion.button>
                                </div>
                        )   :   (
                            <div className="form__notlogedin">
                                Sign with google to procede
                            </div>
                        )
                    }
                </form>
            </div>
        </motion.div>
    )
}

export default Register
