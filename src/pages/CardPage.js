import { motion } from 'framer-motion'
import React from 'react'
import { animationOne, animationTwo, transition } from '../components/Animations'
import Card from './Card'
import "./CardPage.css"

function CardPage() {
    return (
        <motion.div className="cardPage"
            initial="out" animate="in" exit="end" variants={animationTwo} transition={transition}
        >
            <Card/>
        </motion.div>
    )
}

export default CardPage
