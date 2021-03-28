import { Link } from "react-router-dom";
import { useState } from 'react';
import { getCookie } from '../utilities'

const AdminDashboard = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    if (getCookie('email') == "" && 'admin' != getCookie('utype')) {
        window.location = "../admin"
    }
    const logout = () => {
        //delete cookie
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "utype=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "/"
    }

    fetch('http://localhost:3010/admin/loginValidate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: getCookie('email') })
    })
        .then((success) => {
            if (success.ok) {
                success.json().then(json => {
                    setName(json.success.name)
                    setEmail(json.success.email)
                });
            }
            else {
                window.location.href = "/"
            }
        })
        .catch(() => {
            alert('Error while login')
        })

    return (
        <div className="container">
            <div className="navbar">
                <ul>
                    <li><Link to="../admin/dashboard">Dashboard</Link></li>
                    {/* <li><Link to="../admin/event">Event</Link></li> */}
                    <li><Link to="../admin/competition">Competition</Link></li>
                    <li><Link to="../admin/invitation">Invitation</Link></li>
                    <li><Link to="../admin/notification">Notification</Link></li>
                    <li><button onClick={logout}>LOGOUT</button></li>
                </ul>
            </div>
            <div className="userInfo">
                <h2>Name : {Name}</h2>
                <h2>Email : {Email}</h2>
            </div>
        </div>
    );
}

export default AdminDashboard;