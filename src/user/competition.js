import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getCookie } from '../utilities'

const User_comp = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [participant_info, setparticipant_info] = useState([{}])
    
    const [fprize,setFprize]=useState('')
    const [sprize,setSprize]=useState('')
    const [tprize,setTprize]=useState('')


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
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: getCookie('email') }),
            signal: abortCont.signal

        }).then(res => {
            res.json().then(res => {
                console.log(res);
                setparticipant_info(res)

            })
        }, rej => {
            console.log(rej)
        })
            .catch(rej => console.log(rej))
        // abort the fetch


        return () => abortCont.abort();
    }, [])

    useEffect(() => {
        const abortCont = new AbortController();
        fetch('http://localhost:3010/user/fetchWinners', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: getCookie('email') }),
            signal: abortCont.signal

        }).then(res => {
            res.json().then(res => {
                console.log(res);
                setFprize(res.f_prize)
                setSprize(res.s_prize)
                setTprize(res.t_prize)
            })
        }, rej => {
            console.log(rej)
        })
            .catch(rej => console.log(rej))
        // abort the fetch


        return () => abortCont.abort();
    }, [])

    const handle_winner = (e) => {
        if(fprize==''||sprize==''||tprize==''){
            alert("please select prize list properly")
            return
        }
if(fprize==sprize||fprize==tprize||sprize==tprize){
    alert("Each prize must goes to different participant. You can't give more than one prize to same participant")
}
// disabled={fprize!=sprize&&fprize!=tprize?false:true}
// disabled={sprize!=fprize&&sprize!=tprize?false:true}
// disabled={tprize!=sprize&&tprize!=fprize?false:true}
        let prize_data = {
                email:Email,
                winners:{
                    f_prize:fprize,
                s_prize: sprize,
                t_prize: tprize
                }
        }


        fetch('http://localhost:3010/user/updateWinners', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prize_data)
        }).then((success) => {
            // if (success.ok) {
            //     success.json().then(json => {
            //         if(json.status) 
            alert('Prize list updated successfully');
            // else alert('There is an error while adding competition')
            //     });
            // }
        }, (fail) => { alert('Fall! Prize list updated successfully'); })
            .catch((err) => {
                console.log(err);
                alert('Error while sending Notification')
            })


    }


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
                {/* <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Insititute</th>
                    </tr> */}
                        <form onSubmit={handle_winner}>
                            <select value={fprize} placeholder="First prize" onChange={e=>setFprize(e.target.value)} id="">
                                <option disabled={fprize==null||''?false:true} value="">Select First prize winner</option>
                {participant_info && participant_info.map((data, index) => {
                    return (
                        <option value={data.email}>{data.email+"-"+data.name}</option>
                        
                        );
                    })
                }
                        </select>
                            <select value={sprize} placeholder="Second prize" onChange={e=>setSprize(e.target.value)} id="">
                <option disabled={fprize==null||''?false:true} value="">Select Second prize winner</option>
                {participant_info && participant_info.map((data, index) => {
                    return (
                        <option value={data.email}>{data.email+"-"+data.name}</option>
                        
                        );
                    })
                }
                        </select>
                            <select value={tprize} placeholder="Third prize" onChange={e=>setTprize(e.target.value)} id="">
                <option disabled={fprize==null||''?false:true} value="">Select Third prize winner</option>
                {participant_info && participant_info.map((data, index) => {
                    return (
                                <option value={data.email}>{data.email+"-"+data.name}</option>
                                
                                );
                            })
                        }
                        </select>
                        <button>Update prize</button>
                    </form>
                {/* </table> */}
            </div>
        </div>
    );
}

export default User_comp;