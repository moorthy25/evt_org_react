import { Link } from "react-router-dom";
import { useState } from 'react';
import { getCookie } from '../utilities'

const Navbar = () => {
    // const [Name, setName] = useState('')
    // const [Email, setEmail] = useState('')


    // checking login is present
    const email = getCookie('email')
    if (email == "") {
        window.location = "../login"
    }
    const logout = () => {
        //delete cookie
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "utype=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "/"
    }

    // const LoginData = { email };
    // fetch('http://localhost:3010/validate', {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(LoginData)
    // }).then((success) => {
    //     if (success.ok) {
    //         success.json().then(json => {
    //             if (json.email!=undefined) {
    //                 setName(json.name)
    //                 setEmail(json.email)
    //             } else
    //                 window.location.href = "/"
    //         });
    //     }
    // }, (fail) => { alert(fail+"here"); /*window.location.href = "/"*/ })
    //     .catch((err) => {
    //         console.log(err);
    //         window.location.href = "/"
    //         // alert('Error while signup')
    //     })

// end of login present component



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
            {/* code here */}


        </div>
    );
}

export default Navbar;