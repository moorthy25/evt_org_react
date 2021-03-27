import { useState } from 'react';
import { Link } from 'react-router-dom'
import { getCookie } from './utilities'


const Login = () => {

    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')

// already login redirection
    if (getCookie('email') != "") {
        window.location = "../dashboard"
    }


    const loginHandler=(e)=>{
    e.preventDefault();
        const LoginData = {email,pass};
        fetch('http://localhost:3010/login_validate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(LoginData)
        }).then((success) => {
            if (success.ok) {
                success.json().then(json => {
                    console.log(json);
                    if(json.status){
                    document.cookie = "email=" + email
                    document.cookie = "utype=part"
                    window.location.href = "./dashboard"
                    }
                    else
                    alert("error ")
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
            <h6 className="signup">Don't have an account yet?<Link to='signup'>Sign up</Link></h6>
        </div>
    </div>
     );
}
 
export default Login;