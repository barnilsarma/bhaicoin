import { useEffect,useState } from "react";
import styles from "./Mine.module.scss";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
const Mine=()=>{
    const [game,setGame]=useState(false);
    const [score,setScore]=useState(10);
    const [playerInput,setplayerInput]=useState("");
    const navigate=useNavigate();
    const startGame=()=>{
        if(!localStorage.getItem("game")){
            localStorage.setItem("game","start");
            localStorage.setItem("score",10);
            setScore(localStorage.getItem("score"));
            localStorage.setItem("correct",Math.floor(Math.random()*100+1));
            navigate('/game');
        }
        else{
            setScore(localStorage.getItem("score"));
            navigate('/game');
        }
        setGame(true);
    }
    const ending=()=>{
        localStorage.removeItem("game");
        localStorage.removeItem("score");
        localStorage.removeItem("correct");
        navigate('/transactions');
    }
    const endGame=async ()=>{
        setGame(false);
        let res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/mine`,{
            user:localStorage.getItem("user"),
            amount:Number(localStorage.getItem("score"))
        });
        if(res.status===200){
            alert("The mined coins have been succesfully transferred to your wallet!!");
            localStorage.removeItem("game");
            localStorage.removeItem("score");
            localStorage.removeItem("correct");
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
    }
    return(
        <div className={styles.minePage}>
            {!game?
                <Navbar page="Mine Coins" />:null
            }
            {
                localStorage.getItem("user")?
                <div className={styles.innerCont}>
                    {
                        !localStorage.getItem("game") || !game?
                        <div className={styles.hero}>
                            <h1 className={styles.explain}>For mining "bhai",the user simply needs to play this "Guess my number Game"</h1>
                            <h2 className={styles.brief}>
                                The rules are simple, You need to guess a number and type in a text box. For each wrong guess, 1 bhai gets reduced. Initially there are 10 bhai, basically on each mining session, you can mine at max 10 bhai. Suppose you guess the number at 3rd trial, so by simple math you get 8 bhai.
                            </h2>
                            <button onClick={startGame}>
                                {!localStorage.getItem("correct")?<>Start Game</>:<>Resume Game</>}
                            </button>
                        </div>:
                        // <div className={styles.gameCont}>
                        //     Game
                        // </div>
                        null
                        // <div className={styles.gameCont}>
                        //     {score}
                        //     <input type="text" value={playerInput} onChange={(e)=>{
                        //         setplayerInput(e.target.value)
                        //     }} />
                        //     <button onClick={checkNum}>Go</button>
                        //     <button onClick={ending}>End game</button>
                        // </div>
                    }
                </div>
                :<h1>You are not logged in</h1>
            }
        </div>
    );
}

// const Mine=()=>{
//     const [game,setGame]=useState(false);
//     const [score,setScore]=useState(10);
//     const [playerInput,setplayerInput]=useState("");
//     const startGame=()=>{
//         if(!localStorage.getItem("game")){
//             localStorage.setItem("game","start");
//             localStorage.setItem("score",10);
//             setScore(localStorage.getItem("score"));
//             localStorage.setItem("correct",Math.floor(Math.random()*100+1));
//         }
//         else{
//             setScore(localStorage.getItem("score"));
//         }
//         setGame(true);
//     }
//     const ending=()=>{
//         localStorage.removeItem("game");
//         localStorage.removeItem("score");
//         localStorage.removeItem("correct");
//     }
//     const endGame=async ()=>{
//         setGame(false);
//         let res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/mine`,{
//             user:localStorage.getItem("user"),
//             amount:Number(localStorage.getItem("score"))
//         });
//         if(res.status===200){
//             alert("The mined coins have been succesfully transferred to your wallet!!");
//             localStorage.removeItem("game");
//             localStorage.removeItem("score");
//             localStorage.removeItem("correct");
//         }
//         else{
//             alert("Error transferring the coins!!");
//         }
//     }

//     const checkNum=()=>{
//         if(Number(playerInput)==Number(localStorage.getItem("correct"))){
//             setScore(localStorage.getItem("score"));
//             alert(`You got it correct. Congratulations, you just won ${score} bhai`);
//             localStorage.removeItem("correct");
//             endGame();
//         }
//         else if(Number(playerInput)<Number(localStorage.getItem("correct"))){
//             alert("Too Small!! Try a bigger number");
//             localStorage.setItem("score",score-1);
//             setScore(localStorage.getItem("score"));
//         }
//         else{
//             alert("Too Big!! Try a smaller number");
//             localStorage.setItem("score",score-1);
//             setScore(localStorage.getItem("score"));
//         }
//     }
//     return(
//         <div className={styles.minePage}>
//             {!game?
//                 <Navbar page="Mine Coins" />:null
//             }
//             {
//                 localStorage.getItem("user")?
//                 <div className={styles.innerCont}>
//                     {
//                         !localStorage.getItem("game") || !game?
//                         <div className={styles.hero}>
//                             <h1 className={styles.explain}>For mining "bhai",the user simply needs to play this "Guess my number Game"</h1>
//                             <h2 className={styles.brief}>
//                                 The rules are simple, You need to guess a number and type in a text box. For each wrong guess, 1 bhai gets reduced. Initially there are 10 bhai, basically on each mining session, you can mine at max 10 bhai. Suppose you guess the number at 3rd trial, so by simple math you get 8 bhai.
//                             </h2>
//                             <button onClick={startGame}>
//                                 {!localStorage.getItem("correct")?<>Start Game</>:<>Resume Game</>}
//                             </button>
//                         </div>:
//                         <div className={styles.gameCont}>
//                             {score}
//                             <input type="text" value={playerInput} onChange={(e)=>{
//                                 setplayerInput(e.target.value)
//                             }} />
//                             <button onClick={checkNum}>Go</button>
//                             <button onClick={ending}>End game</button>
//                         </div>
//                     }
//                 </div>
//                 :<h1>You are not logged in</h1>
//             }
//         </div>
//     );
// }

export default Mine;