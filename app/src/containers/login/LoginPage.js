import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
import "./LoginPage.css"

const LoginPage = () => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

   async function login () {
        console.warn(email, password);
        let item = {email, password};
        let result = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*"
            },
            credentials:'include',
            body:JSON.stringify(item)
        })
        result = await result.json();
        console.log(result)
        localStorage.setItem("user-info",JSON.stringify(result))
        history.push("/")
    }

    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/")
        }
    })

  return (
    <div className="login">
        <div className="login__container">
            <h1 className="login__container--title">
                Login
            </h1>
            <p className="login__container--text">
                Faça login para desfrutar de bons eventos 
            </p>
            <div className="login__container__form">
                <form>
                    <input 
                        onChange={(e) =>setEmail(e.target.value)}
                        className="login__container__form--input" 
                        placeholder="email" 
                        type="text" 
                        name="email" 
                    />
                    <input 
                        onChange={(e) =>setPassword(e.target.value)}
                        type="password" 
                        className="login__container__form--input" 
                        placeholder="password" 
                        name="password" 
                    />
                    <button className="ui secondary button" onClick={login}>
                        <i className="font icon"></i>
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
