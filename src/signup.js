import { useState } from 'react';
import { Link } from 'react-router-dom'
import { getCookie } from './utilities'



const Signup = () => {
    // already login redirection
    if (getCookie('email') != "") {
        window.location = "../dashboard"
    }


    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const [mnum,setMnum]=useState('')
    const [institute,setInstitute]=useState('')

    const signupHandler=(e)=>{
        
        e.preventDefault();
        const LoginData = {
            name,
            email,
            phone_no:mnum,
            password:pass,
            institution:institute 
        };
        // console.log(JSON.stringify(LoginData))
        fetch('http://localhost:3010/signup', {
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
            <form onSubmit={signupHandler}>
                <input className="form_input" focus type="text" onChange={(e)=>setName(e.target.value)}  placeholder="Your Name"/>
                <input className="form_input" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email address"/>
                <input className="form_input" placeholder="password" type="password" onChange={(e)=>setPass(e.target.value)} />
                <input className="form_input" type="text" onChange={(e)=>setMnum(e.target.value)} placeholder="Your Mobile Number"/>
                <input className="form_input" type="text" onChange={(e)=>setInstitute(e.target.value)} placeholder="College"/>
                <button>Signup</button>
            </form>
            <h6 className="signup">Already have an account?<Link to='login'>Login</Link></h6>
        </div>
    </div>
     );
}
 
export default Signup;