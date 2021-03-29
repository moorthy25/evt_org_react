import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import { getCookie } from '../utilities'

const UserDashboard = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [participant_info, setparticipant_info] = useState([{}])

    if (getCookie('email') == "" && 'utype' != getCookie('utype')) {
        window.location = "../user"
    }
    const logout = () => {
        //delete cookie
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "utype=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "/"
    }


    fetch('http://localhost:3010/user/loginValidate', {
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


        useEffect(() => {
            const abortCont = new AbortController();
            fetch('http://localhost:3010/user/participant', { 
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email:getCookie('email')}),
                signal: abortCont.signal 

            }).then(res => {
                res.json().then(res => {
                    console.log(res);
                setparticipant_info(res)
            
            })}, rej => {
                console.log(rej)
            })
                .catch(rej => console.log(rej))
            // abort the fetch
    
    
            return () => abortCont.abort();
        }, [])
    



    return (
        <div className="container">
            <div className="navbar">
                <ul>
                    <li><Link to="../user/dashboard">Dashboard</Link></li>
                    {/* <li><Link to="../admin/event">Event</Link></li> */}
                    <li><Link to="../user/enter_result">Competition</Link></li>
                    <li><button onClick={logout}>LOGOUT</button></li>
                </ul>
            </div>
            <div className="userInfo">
                <h2>Name : {Name}</h2>
                <h2>Email : {Email}</h2>
            </div>
            <div className="paticipantInfo">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Insititute</th>
                    </tr>
                {participant_info && participant_info.map((data, index) => {
                    return (
                        <tr>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.phone_no}</td>
                            <td>{data.institution}</td>
                        </tr>
                    );
                })
                }
                </table>
            </div>
        </div>
    );
}

export default UserDashboard;