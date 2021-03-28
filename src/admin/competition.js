import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { getCookie } from '../utilities';
// import axios from "axios"
// import './checkout'


const Competition = () => {
    const [competition_details, setCompetition] = useState(false);
        const [comp_name,setComp_name]=useState('');
        const [comp_price, setComp_price] = useState('')
        const [pdf_link, setPdf_link] = useState('')
        const [comp_leader, setcomp_leader] = useState('')
        const [comp_leader_email,setcomp_leader_email]=useState("")
        const [comp_leader_Pass,setcomp_leader_Pass]=useState("")

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
const handleSubmit=()=>{

let comp_data={
    competition:{
        competition_name: comp_name,
        max_mark: 100,
        price: comp_price,
        rules_pdf_path: pdf_link
    },
    team_leader:{
        name: comp_leader,
        email: comp_leader_email,
        password:comp_leader_Pass
    }
}


    fetch('http://localhost:3010/admin/addCompetition', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comp_data)
    }).then((success) => {
        if (success.ok) {
            success.json().then(json => {
                if(json.status) alert('Competition added successfully');
                else alert('There is an error while adding competition')
            });
        }
    }, (fail) => { alert(fail) })
        .catch((err) => {
            console.log(err);
            alert('Error while adding Competition')
        })    


}

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
                <form onSubmit={handleSubmit}>
                <input type="text" required value={comp_name} placeholder="Competition Name" onChange={(e) => setComp_name(e.target.value)} />
                <input type="text" required value={comp_price} placeholder="price" size="4" onChange={(e) => setComp_price(e.target.value)} />
                <input type="text" required value={pdf_link} placeholder="PDF link for Rules and Regulatoin" onChange={(e) => setPdf_link(e.target.value)} />
                <input type="text" required value={comp_leader} placeholder="Team leader Name" onChange={(e) => setcomp_leader(e.target.value)} />
                <input type="text" required value={comp_leader_email} placeholder="Team leader's Email" onChange={(e) => setcomp_leader_email(e.target.value)} />
                <input type="text" required value={comp_leader_Pass} placeholder="Team leader's Password" onChange={(e) => setcomp_leader_Pass(e.target.value)} />
                <button>Create</button>
                </form>
                




        </div>
    ); 
} 

export default Competition;