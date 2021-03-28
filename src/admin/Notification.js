import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { getCookie } from '../utilities'
import axios from "axios"
// import './checkout'


const Admin_Notification = () => {

    const [notification, setNotification] = useState([{}])

    // checking login is present
    const email = getCookie('email')
    if (email == "") {
        window.location = "../login"
    }

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Mobile, setMobile] = useState('')

    fetch('http://localhost:3010/admin/loginValidate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
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


    // end of login present component


    useEffect(() => {
        const abortCont = new AbortController();
        fetch('http://localhost:3010/notification', { signal: abortCont.signal }).then(res => res.json().then(res => {
            setNotification(res)

        }), rej => {
            console.log(rej)
        })
            .catch(rej => console.log(rej))
        // abort the fetch


        return () => abortCont.abort();
    }, [])

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function timeFunction(time) {
        var d = new Date(time);
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        var s = addZero(d.getSeconds());
        var y = d.getFullYear();
        var mo = d.getMonth();
        var date = d.getDate();
        return (date + "/" + mo + "/" + y + " " + h + ":" + m + ":" + s);
    }

    const [message,setMessage]=useState('')

    const handle_Notify=()=>{
        let invit_data={
            message: message,
            from: "Admin- Hover"
        }
 
    
        fetch('http://localhost:3010/admin/sendNotification', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invit_data)
        }).then((success) => {
            // if (success.ok) {
            //     success.json().then(json => {
                //         if(json.status) 
                alert('Notification sent successfully');
                    // else alert('There is an error while adding competition')
            //     });
            // }
        }, (fail) => { alert('Fall! Notification sent successfully'); })
            .catch((err) => {
                console.log(err);
                alert('Error while sending Notification')
            })    
    
    
    }



    return (
        <div className="notification_root">
            <Navbar />
            <div className="notify-component">
                <h2>List of Notification</h2>
                <table>
                    <tr>
                        <th>Sender</th>
                        <th>Message</th>
                        <th>Time</th>
                    </tr>
                    {notification && notification.map((data, index) => {

                        return (
                            <tr>
                                <td>{data.from}</td>
                                <td>{timeFunction(data.createdAt)}</td>
                                <td>{data.message}</td>
                            </tr>
                        );
                    })
                    }
                </table>
            </div>
            <div>
                <form onSubmit={handle_Notify}>
                    <input type="text" required placeholder="Message" onChange={e=>{setMessage(e.target.value)}} value={message} />
                    <button>Send Notification</button>
                </form>
            </div>
        </div>

    );
}

export default Admin_Notification;