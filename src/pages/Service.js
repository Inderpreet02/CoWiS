import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory, useParams } from 'react-router'
import { auth, db } from '../firebase';
import Card from './Card';
import "./Service.css"

function Service( ) {
    const [menu, setMenu] = useState([]);
    const {serviceId} = useParams();
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [price, setPrice] = useState("");
    const [edit, setEdit] = useState(false);
    const [services, setServices] = useState([]);
    const [input, setInput] = useState("");
    const [orgData, setOrgData] = useState({});
    const [name, setName] = useState();
    const [photoURL, setPhotoURL] = useState();
    const [desc, setDesc] = useState();

    const [enableAdd, setEnableAdd] = useState(false);


    if(!user){
        history.push("/");
    }

    const addService = (e) =>{
        e.preventDefault();
    
        db.collection("organisations").doc(serviceId).collection("services").add({
          serviceName: name,
          serviceImage: photoURL,
          serviceDescription: desc
        })

        setName("");
        setPhotoURL("");
        setDesc("");
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


    useEffect(() => {

        user && db.collection("organisations").doc(user.uid).get().then((doc) => (
            setOrgData(
                doc.data()
            )
        ))

        if(user && user.uid === serviceId){
            setEnableAdd(true);
        }
    }, [user])

    // useEffect(()=> {
    //     user && db.collection("organisations").doc(user.uid).collection("services").doc(serviceId).collection("menu").onSnapshot(snapshot=>(
    //         setMenu(snapshot.docs.map((doc) => (
    //             {
    //                 id: doc.id,
    //                 data: doc.data(),
    //             }
    //         )))
    //     ))
    // }, [])
    

    useEffect(()=> {
        user && db.collection("organisations").doc(serviceId).collection("services").onSnapshot(snpashot=>(
          setServices(snpashot.docs.map(doc=>(
            {
              id: doc.id,
              data: doc.data(),
            }
          )))
        ))
    },[user])

    return (
        <div className="service dark">
            <div className="service__container">
                <div className="service__genInfo">

                    <div className="sevice__heading">
                        <div className="org__name">
                            {orgData.organisationName}
                        </div>

                        <span>Description:</span> <br/>
                        {orgData.organisationDesc ? (
                            <div className="org__desc">
                                {orgData.organisationDesc}
                            </div>
                            ) : (
                                <div className="org__desc">
                                    None
                                </div>
                            )
    
                        }
                    </div>

                    <img src={orgData.organisationImage} alt="" className="service__img" />
                </div>

                {
                    enableAdd ? (
                        <div className="service__create">
                            <div className="create__heading">
                                Create New Service
                            </div>

                            <form className="service__form">

                                <div className="service__field">
                                    <div className="service__label">
                                        Name*
                                    </div>
                                    <input value={name} onChange={(e)=> setName(e.target.value)} type="text" required placeholder="Service Name" className="service__input" />
                                </div>

                                <div className="service__field">
                                    <div className="service__label">
                                        Display Image*
                                    </div>
                                    <input value={photoURL} onChange={(e)=> setPhotoURL(e.target.value)} type="text" required placeholder="Image URL" className="service__input" />
                                </div>

                                <div className="service__field">
                                    <div className="service__label">
                                        Description*
                                    </div>
                                    <textarea value={desc} placeholder="Description ..." onChange={(e)=> setDesc(e.target.value)} required className="service__input" cols="25" rows="4"></textarea>
                                </div>

                                <button className="service__btn" onClick={addService}>
                                    Create Service
                                </button>
                            </form>
                        </div>
                    )   :   (
                        <>
                            
                        </>
                    )
                }

                <div className="service__manage">
                    <div className="manage__heading">
                        Manage Your Services
                    </div>

                    <div className="manage__container">
                        {
                            services && services.map(service=> (
                                <Card enable={enableAdd} id={service.id} name={service.data.serviceName} photoURL={service.data.serviceImage} desc={service.data.serviceDescription}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service
