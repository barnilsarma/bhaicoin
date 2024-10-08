import { auth, provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useState,useEffect } from "react";
import {toast,Toaster} from "sonner";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar.jsx";
import styles from "./Home.module.scss";
const Home=()=>{
    const [trans,setTrans]=useState([]);
    const handleClick = () => {
        signInWithPopup(auth,provider).then((data)=>{
            localStorage.setItem("user",data.user.displayName);
            localStorage.setItem("email",data.user.email);
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/add`,{
                user:localStorage.getItem("user"),
                email:localStorage.getItem("email")
            }).then((res)=>{
                if(res.status===200){
                    toast.success("User registered successfully!!");
                }
                else{
                    toast.error("User registration failed");
                }
            });
        });
    }
    const handleLogout=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("email");
    }
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
    },[trans]);
    return(
        <div className={styles.homeCont}>
            {
                localStorage.getItem("user")!==null?
                <Navbar page="home"/>:null
            }
            <div className={styles.homeInner}>
                <div className={styles.hero}>
                    <h1>Bhaicoin</h1>
                    <p>Embracing simplicity and user friendliness</p>
                    {
                        localStorage.getItem("user")===null?
                        <>
                            <p>To start using it, you must log in</p>
                            <button onClick={handleClick}>
                                Login with Google
                            </button>

                        </>:
                        <>
                            <p>Welcome {localStorage.getItem("user")}</p>
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    }
                </div>
                <div className={styles.accDetails}>
                    <h1>Account Details</h1>
                    <div className={styles.accBody}>
                {
                         trans.length===0?
                         <div className={styles.zeroTrans}>
                             Currently Zero Transactions
                         </div>:
                         <div className={styles.details}>
                            <h3 className={styles.items}>
                                <p>
                                    Your Current Balance
                                </p>
                                <h6 className={styles.content}>
                                    {trans[trans.length-1].balance} BHAI
                                 </h6>
                             </h3>
                             <h3 className={styles.items}>
                                <p>
                                    Total Transactions made
                                </p>
                                <h6 className={styles.content}>
                                    {trans.length}
                                 </h6>
                             </h3>
                         </div>
                     }
                     </div>
                </div>
            </div>
            <Toaster/>
        </div>
    );
}

// const Home=()=>{
//     const [trans,setTrans]=useState([]);
//     const handleClick = () => {
//         signInWithPopup(auth,provider).then((data)=>{
//             localStorage.setItem("user",data.user.displayName);
//             localStorage.setItem("email",data.user.email);
//             axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/add`,{
//                 user:localStorage.getItem("user"),
//                 email:localStorage.getItem("email")
//             }).then((res)=>{
//                 if(res.status===200){
//                     toast.success("User registered successfully!!");
//                 }
//                 else{
//                     toast.error("User registration failed");
//                 }
//             });
//         });
//     }
//     const handleLogout=()=>{
//         localStorage.removeItem("user");
//         localStorage.removeItem("email");
//     }
//     useEffect(()=>{
//         async function fetchData(){
//             let res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions/${localStorage.getItem("user")}`);
//             if(res.status===200){
//                 setTrans(res.data);
//             }
//             else{
//                 toast.error("Error fetching user transactions!");
//             }
//         }
//         fetchData();
//     },[trans])
//     return(
//         <>
//         {
//             localStorage.getItem("user")===null?
//             <button onClick={handleClick}>
//                 Login with Google
//             </button>:
//             <div>
//                 <div>
//                     Welcome to bhaicoin, the payments app for new generation.
//                     <button onClick={handleLogout}>
//                         Logout
//                     </button>
//                     {
//                         trans.length===0?
//                         <div>
//                             Currently Zero Transactions
//                         </div>:
//                         <div>
//                             Hello {localStorage.getItem("user")}
//                             Your Current Balance:{trans[trans.length-1].balance}
//                             Total Transactions made: {trans.length}
//                         </div>
//                     }
//                 </div>
//             </div>
//         }
//         <Toaster/>
//         </>
//     );
// }
export default Home;