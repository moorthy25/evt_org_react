import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { getCookie } from './utilities'
import axios from "axios"
// import './checkout'


const Notification = () => {

    const [notification,setNotification]=useState([{}])

    // checking login is present
    const email = getCookie('email')
    if (email == "") {
        window.location = "../login"
    }

    const LoginData = { email };
    fetch('http://localhost:3010/validate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LoginData)
    }).then((success) => {
        if (success.ok) {
            success.json().then(json => {
                if (json.email == undefined) {
                    window.location.href = "/"
                } 
            });
        }
    }, (fail) => { alert(fail); window.location.href = "/" })
        .catch((err) => {
            console.log(err);
            window.location.href = "/"
            // alert('Error while signup')
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
        var y=d.getFullYear();
        var mo=d.getMonth();
        var date=d.getDate();
        return (date+"/"+mo+"/"+y+" "+ h + ":" + m + ":" + s);
      }
    
    return (
        <div className="notification_root">
            <Navbar />
            <div className="notify-component">
                {/* <h2></h2> */}
                {/* <table> */}
                    {/* <tr>
                        <th>Sender</th>
                        <th>Message</th>
                        <th>Time</th>
                    </tr> */}
                    {notification && notification.map((data, index) => {

                        return (
                            // <tr>
                                <div className="notify-data">
                                    <h4>From {data.from}</h4>
                                    <p>- {timeFunction(data.createdAt)}</p>
                                    <h3>{data.message}</h3>
                                </div>
                        );
                    })
                    }
                {/* </table> */}
            </div>
        </div>

    );
}

export default Notification;