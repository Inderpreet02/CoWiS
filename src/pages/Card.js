import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./Card.css"

function Card() {

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);
    const rotateX2 = useTransform(y, [-20, 20], [10, -10]);
    const rotateY2 = useTransform(x, [-20, 20], [-10, 10]);

    const [user] = useAuthState(auth);
    console.log(user);
    return (
        <div className="card">
            <motion.div
                style={{x, y, rotateX, rotateY, z: 100}}
                drag
                dragElastic={0.15}
                dragConstraints= {{ top: 0, left: 0, right: 0, bottom: 0}}
                
                className="card_container">
                <div className="card_top">
                    <div className="circle_wrapper">
                        <div className="circle">

                        </div>
                    </div>
                    <div className="img_wrapper">
                        {user && <motion.img 
                            style={{x, y, rotateX2, rotateY2, z: 10000}}
                            drag
                            dragElastic={0.8}
                            dragConstraints= {{ top: 0, left: 0, right: 0, bottom: 0}}
                            src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=85" alt="" className="card_img" />}
                    </div>
                </div>

                <div className="card_bottom">
                    <motion.div 
                        style={{x, y, rotateX2, rotateY2, z: 10000}}
                        drag
                        dragElastic={0.15}
                        dragConstraints= {{ top: 0, left: 0, right: 0, bottom: 0}}

                        className="card_text">
                        <div className="card_heading">
                            Chitkara University
                        </div>

                        <p className="card_desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tempore veniam labore eveniet vel ex error obcaecati fuga possimus optio ipsam id a amet odio 
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default Card
