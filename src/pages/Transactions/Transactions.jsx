import { useState,useEffect } from "react";
import {toast,Toaster} from "sonner";
import axios from "axios";
import styles from "./Transactions.module.scss";
import Navbar from "../../components/Navbar/Navbar";
const Transactions=()=>{
    const [trans,setTrans]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            let res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions/${localStorage.getItem("user")}`);
            if(res.status===200){
                setTrans(res.data);
            }
            else{
                toast.error("Error fetching user transactions!");
            }
        }
        fetchData();
    },[trans])
    return(
        <div className={styles.transPage}>
            <Navbar page="My Transactions"/>
            <div className={styles.transInner}>
        {
            localStorage.getItem("user")===null?
            <h1>You are not logged in</h1>:
            <div className={styles.child}>
                <div className={styles.grandChild}>
                    {
                        trans.length===0?
                        <div className={styles.zeroTrans}>
                            Currently Zero Transactions
                        </div>:
                        <div className={styles.allTrans}>
                            {trans.map((item,id)=>(
                                <div className={styles.eachTrans} key={id}>
                                    <h2>
                                    {item.amount} BHAI
                                    </h2>
                                    <h2> 
                                        {item.type} {item.type==="Sent"?<>to</>:item.type==="Received"?<>from</>:null}
                                    </h2>
                                    <h2>
                                        {item.other} 
                                    </h2>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        }
            </div>
        <Toaster/>
        </div>
    );
}
export default Transactions;