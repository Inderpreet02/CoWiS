import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router'
import MenuItem from '../components/MenuItem';
import { auth, db } from '../firebase';
import "./Menu.css"

function Menu() {

    const {storeID} = useParams();
    const [user] = useAuthState(auth);
    const [menu, setMenu] = useState([]);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [price, setPrice] = useState("");
    const [orders, setOrders] = useState([]);

    const [confirmed, setConfirmed] = useState(false)

    const handleSubmit = (e) => {

        e.preventDefault();

        db.collection("organisations").doc(user.uid).collection("services").doc(storeID).collection("offerings").add({
            offeringName: name,
            offeringImage: photoURL,
            offeringPrice: price,
            offeringDescription: ""
        })

        setName("");
        setPhotoURL("");
        setPrice("");

    }

    const verify = (e) => {
        
        e.preventDefault();

        const OTP = 1234;
        var check = window.prompt("Pls enter the OTP")

        alert("order has been confirmed")
        setConfirmed(true)
    }

    useEffect(()=> {
        user && db.collection("organisations").doc(user.uid).collection("services").doc(storeID).collection("offerings").onSnapshot(snapshot=>(
            setMenu(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))

        user && db.collection("organisations").doc(user.uid).collection("services").doc(storeID).collection("orders").onSnapshot(snapshot=>(
            setOrders(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
    }, [])

    console.log(orders);

    return (
        <div className="menu dark">
            <div className="menu__container">
                <div className="menu__heading">
                    Manage Menu
                </div>

                <form className="add__new">

                    <div className="add__newHeading">
                        Add a new item
                    </div>

                    <div className="menu__field">
                        <div className="menu__label">
                            Name*
                        </div>
                        <input value={name} onChange={(e)=> setName(e.target.value)} type="text" required placeholder="Service Name" className="menu__input" />
                    </div>

                    <div className="menu__field">
                        <div className="menu__label">
                            Price*
                        </div>
                        <input value={price} onChange={(e)=> setPrice(e.target.value)} type="text" required placeholder="Service Name" className="menu__input" />
                    </div>

                    <div className="menu__field">
                        <div className="menu__label">
                            Image*
                        </div>
                        <input value={photoURL} onChange={(e)=> setPhotoURL(e.target.value)} type="text" required placeholder="Service Name" className="menu__input" />
                    </div>

                    <button className="menu__add" onClick={handleSubmit}>
                        Add
                    </button>
                </form>

                <div className="menu__list">

                    <div className="menu__listHeading">
                        Menu Items
                    </div>
                    {
                        menu && menu.map(item => (
                            <MenuItem name={item.data.offeringName} id={item.id} photoURL={item.data.offeringImage} price={item.data.offeringPrice} />
                        ))
                    }
                </div>
            </div>

            <div className="service__order">
                <div className="orders__heading">
                    Orders
                </div>

                <div className="order__container">
                    {
                        orders && orders.map(item=> (
                            <div className="temp">
                                ccUCMC827iaGMv8gIFr1 : 1
                                <div className="order__accepted">
                                    {item.data.orderAccepted}
                                </div>

                                {
                                    confirmed ? (
                                        <div className="success">
                                            Order has been confirmed
                                        </div>
                                    ) : (

                                        <button className="order__confBtn" onClick={verify}>
                                            Verify the order
                                        </button>
                                    )
                                }

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Menu
