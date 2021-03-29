import { useState } from 'react';
import { Link } from 'react-router-dom'
import { getCookie } from '../utilities'


const User = () => {

    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')

// already login redirection
    if (getCookie('email') != "" && getCookie('utype') == "tleader") {
        window.location = "../user/dashboard"
    }


    const loginHandler=(e)=>{
    e.preventDefault();
        const LoginData = {email,pass};
        fetch('http://localhost:3010/user/login_validate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(LoginData)
        }).then((resp) => {
            console.log(resp);
            if (resp.ok) {
                resp.json().then(json => {
                    console.log(json);
                    if(json.success){
                    document.cookie = "email=" + email
                    document.cookie = "utype=tleader"
                    window.location.href = "../user/dashboard"
                    }
                    else
                    alert("User name and password doesn't exist ")
                });
            }
        }, (fail) => { alert(fail) })
        .catch((err) => {
            console.log(err);
            alert('Error while signup')
        })
    }
    return ( 
        <div className="home">
        <div className="login">
            <form onSubmit={loginHandler}>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email address"/>
                <input placeholder="Password" onChange={(e)=>setPass(e.target.value)} type="password" />
                <button>Login</button>
            </form>
        </div>
    </div>
     );
}
 
export default User;