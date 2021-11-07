import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, useParams } from 'react-router'
import { auth, db } from './firebase';

function Service() {
    const [menu, setMenu] = useState([]);
    const {serviceId} = useParams();
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [price, setPrice] = useState("");
    const [edit, setEdit] = useState(false);

    if(!user){
        history.push("/");
    }

    const handleSubmit = () => {
        db.collection("organisations").doc(user.uid).collection("services").doc(serviceId).collection("menu").doc("ZXRqtUGFCutp42Cbc8X9").set({
            price: price,
            name: "new Hamez",
            decs: "new desc"
        })

        console.log(price);

        setEdit(!edit);

    }

    const addItem = (e) => {
        e.preventDefault();

        db.collection("organisations").doc(user.uid).collection("services").doc(serviceId).collection("menu").add({
            name: "hamez",
            price: 69420,
            desc: "chetans fav"
        })
    }

    useEffect(()=> {
        user && db.collection("organisations").doc(user.uid).collection("services").doc(serviceId).collection("menu").onSnapshot(snapshot=>(
            setMenu(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
    }, [])

    return (
        <div className="service">
            <h1>
                {serviceId}
            </h1>

            <h2>meNu</h2>

            <h3>Add Menu item</h3>

            <button onClick={addItem}>+ add item</button>

            {menu && (
                <div className="menu">
                    {
                        menu.map(item=> (
                            <div className="item">
                                {item.data.name}
                                <p>Price: {item.data.price}</p>
                                <button onClick={()=> setEdit(!edit)}>Edit</button><button>delete</button>{edit && <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/> }<button onClick={handleSubmit}>Accept</button>
                            </div>
                            
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default Service
