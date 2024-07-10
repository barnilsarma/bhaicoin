import { useState,useEffect } from "react";
import {toast,Toaster} from "sonner";
import axios from "axios";
const Home=()=>{
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
        <>
        {
            localStorage.getItem("user")===null?
            <h1>You are not logged in</h1>:
            <div>
                <div>
                    {
                        trans.length===0?
                        <div>
                            Currently Zero Transactions
                        </div>:
                        <>
                            {trans.map((item,id)=>(
                                <div key={id}>
                                    {item.user}
                                    {item.amount} {item.type} {item.type==="Sent"?<>to</>:item.type==="Received"?<>from</>:null}
                                    {item.other} 
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        }
        <Toaster/>
        </>
    );
}
export default Home;