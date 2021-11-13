import React from 'react'
import "./MenuItem.css"

function MenuItem( { name, photoURL, price} ) {
    return (
        <div className="menuItem">
            <div className="item__main">
                <img src={photoURL} alt="" className="menu__itemImg" />
                <div className="menu__itemName">
                    {name}
                </div>
            </div>

            <div className="item__menuPrice">
                Rs.{price}
            </div>
        </div>
    )
}

export default MenuItem
