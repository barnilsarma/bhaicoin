import styles from "./Game.module.scss";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Game=()=>{
    const [score,setScore]=useState(10);
    const [playerInput,setplayerInput]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        setScore(localStorage.getItem("score"));
    },[]);
    const ending=()=>{
        localStorage.removeItem("game");
        localStorage.removeItem("score");
        localStorage.removeItem("correct");
        navigate('/transactions');
    }
    const endGame=async ()=>{
        let res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/mine`,{
            user:localStorage.getItem("user"),
            amount:Number(localStorage.getItem("score"))
        });
        if(res.status===200){
            alert("The mined coins have been succesfully transferred to your wallet!!");
            localStorage.removeItem("game");
            localStorage.removeItem("score");
            localStorage.removeItem("correct");
            navigate('/transactions');
        }
        else{
            alert("Error transferring the coins!!");
        }
    }

    const checkNum=()=>{
        if(Number(playerInput)==Number(localStorage.getItem("correct"))){
            setScore(localStorage.getItem("score"));
            alert(`You got it correct. Congratulations, you just won ${score} bhai`);
            localStorage.removeItem("correct");
            endGame();
        }
        else if(Number(playerInput)<Number(localStorage.getItem("correct"))){
            alert("Too Small!! Try a bigger number");
            localStorage.setItem("score",score-1);
            setScore(localStorage.getItem("score"));
        }
        else{
            alert("Too Big!! Try a smaller number");
            localStorage.setItem("score",score-1);
            setScore(localStorage.getItem("score"));
        }
        if(localStorage.getItem("score")<1){
            console.log("Game Over!! Unfortunately none of your guesses were correct!!");
            localStorage.removeItem("game");
            localStorage.removeItem("score");
            localStorage.removeItem("correct");
            navigate('/transactions');
        }
    }
    return(
        <div className={styles.game}>
            <div className={styles.innerCont}>
                <h3>{score} BHAI</h3>
                <input type="text" value={playerInput} onChange={(e)=>{
                    setplayerInput(e.target.value)
                }} />
                <button onClick={checkNum}>Go</button>
                <button onClick={ending}>End game</button>
            </div>
        </div>
    );
}
export default Game;