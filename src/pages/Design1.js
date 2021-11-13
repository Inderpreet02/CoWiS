import React from 'react'
import "./Design1.css"
import { motion, transform } from "framer-motion"
import planetOne from "../images/planet.svg"
import planetTwo from "../images/planet-2.svg"
import planetThree from "../images/planet-3.svg"
import planetFour from "../images/planet-4.svg"
import { Link } from 'react-router-dom'
import { animationOne, transition } from '../components/Animations'

function Design1() {

    const leftFadeIn = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    }
    return (
        <motion.div className="D1"
            initial="out" animate="in" exit="out" variants={animationOne} transition={transition}
            >
            <div className="D1_container">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.8}}
                    className="containerLeft"
                    >

                    <motion.h1 className="left_h1"
                        variants={leftFadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.8}}
                        >
                        Welcome to CoWiS
                    </motion.h1>

                    <motion.p className="left_heading"
                        variants={leftFadeIn}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.8}}
                        >
                        Let's go on a great Journey
                    </motion.p>

                    <motion.button className="btn"
                        whileHover={{scale: 1.05}}
                        whileTap={{
                            scale: 0.99,
                            backgroundColor: "#67f6e7",
                            border: "none",
                            color: "#000"
                        }}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: { duration: 0.8}}}
                        >
                        <Link to="./main" className="link">
                            <div to="D2">
                                Follow along
                            </div>
                        </Link>
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.8}}
                    className="containerRight">
                    <motion.img
                        whileTap={{scale: 0.9}}
                        drag
                        dragElastic={0.2}
                        dragConstraints={{left: 0, right: 250, top: 0, bottom: 50}}
                        initial={{opacity: 0, y:-100}}
                        animate={{opacity: 1, y: 0, transition:{ duration: 0.8 }}}
                        className="img_1" src={planetOne} alt="" />
                    <motion.img
                        whileTap={{scale: 0.8}}
                        drag
                        dragElastic={0.2}
                        dragConstraints={{left: 0, right: 0, top: 0, bottom: 60}}
                        initial={{opacity: 0, x: 100}}
                        animate={{opacity: 1, x: 0, transition:{ duration: 0.8 }}}
                        className="img_2" src={planetTwo} alt="" />
                    <motion.img 
                        whileTap={{scale: 1.1}}
                        drag
                        dragElastic={0.2}
                        dragConstraints={{left: 0, right: 200, top: 0, bottom: 50}}
                        initial={{opacity: 0, x:-100}}
                        animate={{opacity: 1, x: 0, transition:{ duration: 0.8 }}}
                        className="img_3" src={planetThree} alt="" />
                    <motion.img 
                        whileTap={{scale: 1.3}}
                        drag
                        dragConstraints={{left: 10, right: 0, top: 0, bottom: 0}}
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0, transition:{ duration: 0.8 }}}
                        className="img_4" src={planetFour} alt="" />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Design1
