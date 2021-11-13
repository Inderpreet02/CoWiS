import React from 'react'
import { useHistory } from 'react-router'
import "./Card2.css"

function Card2( {id, test, add, title, photoURL} ) {

    const history = useHistory();
    
    return (
        <div className="card2 white" onClick={()=> history.push(`./${id}`)}>
            <div className="card2__container">
                {
                    add ? (
                        <div className="plus">
                            <span>
                                +
                            </span>
                        </div>
                    ) : (
                        <img src={photoURL} alt="" className="card2__img" />
                    )
                }
                <div className="card2__heading">
                    {
                        add ? (
                            <div className="card2__add">
                                Join Us
                            </div>
                        ) : (
                            <div >
                                {title}
                            </div>
                        )
                    }
                </div>
            </div>            
        </div>
    )
}

export default Card2
