import styles from "./Room.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import {useState, useEffect } from "react";
import axios from "axios";

const Room=()=>{

    const {user}=useParams();
    const [amount,setAmount]=useState(0);
    const [recepient,setRecepient]=useState("");
    useEffect(()=>{
        async function fetchData(){
            try{
                let res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/read/${user}`);
                setRecepient(res.data[0].user);
            }
            catch(err){
                alert("Problem in finding user");
            }
        }
        fetchData();
    },[]);

    const sendMoney=async(e)=>{
        try{
            e.preventDefault();
            let req=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/send`,{
                sender:localStorage.getItem("user"),
                amount:Number(amount),
                recipient:recepient
            });
            if(req.status==200) alert("Transaction successfull!!");
        }
        catch(err){
            alert("Problem in transaction!!");
        }
    }

    return(
        <div className={styles.Room}> 
            <Navbar/>
            <div className={styles.innerCont}>
                <h1 className={styles.heading}>Transfer to {recepient}</h1>
                <form>
                    <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                    <button className={styles.send} onClick={sendMoney}>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Room;