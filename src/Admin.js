import { useState } from 'react'
import { getCookie } from './utilities'

const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    if (getCookie('email') != "" && 'admin' == getCookie('utype')) {
        window.location.href = "../admin/dashboard"
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const LoginData = { email, password };
        // console.log(JSON.stringify(LoginData))
        fetch('http://localhost:3010/admin/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(LoginData)
        }).then((success) => {
            if (success.ok) {
                success.json().then(json => {
                    console.log(json);
                    document.cookie = "email=" + json.success.email
                    document.cookie = "utype=admin"
                    window.location.href = "./admin/dashboard"
                });
            }
        }, (fail) => { alert(fail) })
            .catch((err) => {
                console.log(err);
                alert('Error while login')
            })
    }

    return (
        <div className="login">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" required value={email} placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Admin;