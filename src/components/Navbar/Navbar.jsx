import styles from "./Navbar.module.scss";
import {Link} from "react-router-dom";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const SearchBar=()=>{
    const [person,setPerson]=useState("");
    const navigate=useNavigate();
    const searchPerson=()=>{
        setPerson(person.trim());
        navigate(`/room/${person}`);
    }
    return(
        <div className={styles.searchCont}>
            <input className={styles.box} type="text" value={person} onChange={(e)=>setPerson(e.target.value)} placeholder="Search for people by name" />
            <button className={styles.go} onClick={searchPerson}>Go</button>
        </div>
    );
}
const Navbar=(props)=>{
    return(
        <div className={styles.NavCont}>
            <SearchBar/>
            <div className={styles.navLinks}>
                <Link className={styles.item} style={{border:`${props.page==='home'?'1px':'0px'} solid #ffffff`}} to='/'>Home</Link>
                <Link className={styles.item} style={{border:`${props.page==='My Transactions'?'1px':'0px'} solid #ffffff`}} to='/transactions'>My Transactions</Link>
                <Link className={styles.item} style={{border:`${props.page==='Mine Coins'?'1px':'0px'} solid #ffffff`}} to='/mine'>Mine Coins</Link>
            </div>
        </div>
    );
}
export default Navbar;