import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { getCookie } from '../utilities';
// import axios from "axios"
// import './checkout'


const Competition = () => {
    //     const [reload_reg_comp,set_regcomp]=useState(false);
    const [competition_details, setCompetition] = useState(false);
    //     const [index, setIndex] = useState(0)
    //     const [price, setPrice] = useState('')
    //     const [disabled, setDisable] = useState(false)
    //     const [paybtn,setPaybtn]=useState(false)

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Mobile, setMobile] = useState('')



    // checking login is present
    const email = getCookie('email')
    if (email == "") {
        window.location = "../login"
    }

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
        fetch('http://localhost:3010/admin/viewCompetition', { signal: abortCont.signal }).then(res => res.json().then(res => {
            console.log(res);
            setCompetition(res)
        }), rej => {
            console.log(rej)
        }).catch(rej => console.log(rej))
        // abort the fetch


        return () => abortCont.abort();
    }, [])


    return (
        <div className="admin_competition_root">
                <div>Hello, {Name}</div>
                <Navbar />
                <div>
                    <h2>Competitions</h2>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Team leader</th>
                            <th>Team leader's Mail</th>
                        </tr>
                        {competition_details && competition_details.map((data) => {
                            console.log(data);
                            
                            return (
                                <tr>
                                    <td>{data.competition_name}</td>
                                    <td>{data.price}</td>
                                    <td>{data.team_leader.name}</td>
                                    <td>{data.team_leader.email}</td>
                                </tr>
                            );
                        })
                        }
                    </table>
                </div>
                {/* <form onSubmit={handleSubmit}>
                <input type="text" required value={email} placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
                </form> */}
        </div>
    ); 
} 

export default Competition;