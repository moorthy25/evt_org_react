import { useState, useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import Navbar from "./navbar";
import { getCookie } from '../utilities';
// import axios from "axios"
// import './checkout'


const Invitation = () => {
    // const { id } = useParams();
    // console.log(id);
        const [invit_name,setInvit_name]=useState('');
        const [invit_email,setInvit_email]=useState('');
    const [list_invitee,setList_invitee] = useState(false)
        const [title_name, setTitle_name] = useState('')
        const [invit_link, setInvit_link] = useState('')
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
        fetch('http://localhost:3010/admin/Invitee', { signal: abortCont.signal }).then(res => res.json().then(res => {
            console.log(res);
            setList_invitee(res)
        }), rej => {
            console.log(rej)
        }).catch(rej => console.log(rej))
        // abort the fetch


        return () => abortCont.abort();
    }, [])

    //     useEffect(()=>{
    //         const abortCont = new AbortController();
    //         fetch("http://localhost:3010/registered_competition", {
    //             method: 'POST',
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email: email }),
    //             signal: abortCont.signal
    //         }).then(resp => { resp.json().then((suc)=>{setRegCompet(suc)
    //             let list_id=suc.map((data, index) => {
    //                 return data._id
    //             })
    //             console.log("list id",list_id);
    //             console.log("new compt",new_compt);
    //             list_id.forEach(id=>new_compt=new_compt.filter(element => element._id!=id))
    //             // console.log("new compt",new_compt);
    //             setCompet(new_compt)
    //             // setPrice(0)
    //             if(!new_compt.length) setPaybtn(true);
    //             else setPaybtn(false)
    //         },(fail)=>console.log(fail))  }, fail => console.log(fail))
    //         return () => abortCont.abort();
    //     },[reload_reg_comp])


    //     useEffect(() => {
    //         setPrice(competition[index].price);
    //     }, [index])

const handleSubmit=()=>{
    let invit_data={
        name: invit_name,
        email: invit_email
    }
    fetch('http://localhost:3010/admin/Invitee', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invit_data)
    }).then((success) => {
        if (success.ok) {
            success.json().then(json => {
                if(json.status) alert('Invitee added successfully');
                else alert('There is an error while adding competition')
            });
        }
    }, (fail) => { alert(fail) })
        .catch((err) => {
            console.log(err);
            alert('Error while adding Invitee')
        })    


}


const handle_Mail=()=>{
    let invit_data={
        title: title_name,
        rules_link: invit_link
    }

    fetch('http://localhost:3010/admin/sendInvitation', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invit_data)
    }).then((success) => {
        // if (success.ok) {
        //     success.json().then(json => {
            //         if(json.status) 
            alert('mail sent successfully');
                // else alert('There is an error while adding competition')
        //     });
        // }
    }, (fail) => { alert('fall! mail sent successfully'); })
        .catch((err) => {
            console.log(err);
            alert('Error while sending Mail')
        })    


}


    return (
        <div className="admin_competition_root">
            <div>Hello, {Name}</div>
            <Navbar />
            <div>
                <h2>Invitation</h2>
                <h6>List of Invitee</h6>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {list_invitee && list_invitee.map((data, index) => {
                        return (
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                            </tr>
                        );
                    })
                    }
                </table>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" onChange={e=>{setInvit_name(e.target.value)}} value={invit_name} />
                    <input type="email" placeholder="Email" onChange={e=>{setInvit_email(e.target.value)}} value={invit_email} />
                    <button>Add Invitee</button>
                </form>
            </div>
            <div>
                <form onSubmit={handle_Mail}>
                    <input type="text" required placeholder="Event Title" onChange={e=>{setTitle_name(e.target.value)}} value={title_name} />
                    <input type="text" required placeholder="Rules PDF Link" onChange={e=>{setInvit_link(e.target.value)}} value={invit_link} />
                    <button>Send Mail TO Invitees</button>
                </form>
            </div>
        </div>
    
    );
}

export default Invitation;