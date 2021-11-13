import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useHistory, useParams } from 'react-router'
import "./Card.css"
import { Link } from 'react-router-dom';

function Card( { name, desc, photoURL, id, enable} ) {

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);
    const rotateX2 = useTransform(y, [-20, 20], [10, -10]);
    const rotateY2 = useTransform(x, [-20, 20], [-10, 10]);


    const [user] = useAuthState(auth);
    const {serviceId} = useParams();
    const history = useHistory();

    const handleRoute = (e)=>{

        e.preventDefault();

        if(user.uid === serviceId){
            history.push(`./store/${id}`)
            console.log("Done");
        }else {
            console.log("Done");
        }
    }

    return (
        <div className="card" onClick={handleRoute}>
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
                            src={photoURL} alt="" className="card_img" />}
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
                            {name}  
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
