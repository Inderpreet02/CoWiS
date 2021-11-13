import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { animationThree, animationTwo, transition } from '../components/Animations'
import Card2 from '../components/Card2'
import testSec from '../components/testSec'
import { db } from '../firebase'
import Design1 from './Design1'
import "./Main.css"

function Main() {

    const history = useHistory();
    const [orgs, setOrgs] = useState([]);

    const leftFadeIn = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    }

    const rightFadeIn = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 100},
        visible: {opacity: 1, y: 0}
    }

    useEffect(()=> {
        db.collection("organisations").onSnapshot(snpashot=>(
            setOrgs(snpashot.docs.map(doc=>(
            {
              id: doc.id,
              data: doc.data(),
            }
          )))
        ))
    }, [])

    console.log(orgs);

    return (
        <motion.div className="main"
            initial="out" animate="in" exit="end" variants={animationThree} transition={transition}
            >
            <motion.div className="main__container">
                <div className="main__section1 dark">
                    <motion.div className="circle__wrapperMain"
                        variants={rightFadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.5, delay: 0.3}}
                        >
                        <motion.div className="circle__main">
                            
                        </motion.div>
                    </motion.div>
                    <motion.div className="main__heading"
                        variants={leftFadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.5, delay: 0.3}}
                    >
                        Timeless product,
                        <br></br>
                        outstanding brand.
                    </motion.div>
                    <motion.div className="main__desc"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.5, delay: 0.3}}
                        >
                        We craft outstanding direct-to-consumer brands with the common
                        <br></br>
                        ambition to offer true craftsmanship, timeless products that are
                        <br></br>
                        carbon neutral – and this without ever making any concessions.
                    </motion.div>
                </div>

                <div className="main__section2 white">
                    <div className="section2__heading">
                        We Work With
                    </div>

                    <div className="sec2__cardContainer">
                        <div className="addcard__container">
                            {
                                orgs && orgs.map(({id: id,  data: {organisationName, organisationImage}}) => (
                                    <Card2 add={false} id={id} title={organisationName} photoURL={organisationImage}/>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="main__section3 dark">
                    <div className="circle__wrapperMain2">
                        <div className="circle__main2">
    
                        </div>
                    </div>
                    <div className="sec3__heading">
                        Register Now
                    </div>

                    <Link className="link" to="/register">
                        <motion.div className="sec3__btn"
                            whileHover={{scale: 1.05}}
                            whileTap={{
                                scale: 0.99,
                                backgroundColor: "#67f6e7",
                                border: "none",
                                color: "#000"
                            }}
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition: { duration: 0.5}}}
                            >
                            To the registration page 🔥
                        </motion.div>
                    </Link>

                    <div className="sec3__work">
                        <div className="work__clints">
                            <div className="clints_no">
                                20000
                            </div>
                            <div className="clints__text">
                                Clints
                            </div>
                        </div>
                        <div className="work__services">
                            <div className="services_no">
                                52515
                            </div>
                            <div className="sercvices__text">
                                Services
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    )
}

export default Main
