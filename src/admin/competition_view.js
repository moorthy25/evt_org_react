import { useState, useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import Navbar from "./navbar";
import { getCookie } from '../utilities';
// import axios from "axios"
// import './checkout'


const Competition_view = () => {
    const { id } = useParams();
    console.log(id);
    //     const [reload_reg_comp,set_regcomp]=useState(false);
    const [competition_details, setCompetition] = useState([{}])
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
        fetch('http://localhost:3010/admin/viewCompetition/'+id, { signal: abortCont.signal }).then(res => res.json().then(res => {
            console.log(res);
            setCompetition(res)
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
                        <th>update</th>
                    </tr>
                    {/* {competition_details && competition_details.map((data, index) => {
                        return (
                            <tr>
                                <td>
                                    <span><Link to={"competition/"+data._id}><span>{data.competition_name}</span></Link></span></td>
                                <td>{data.price}</td>
                                
                            </tr>
                        );
                    })
                    } */}
                    {
                        competition_details
                    }
                </table>
            </div>
        </div>
    
    );
}

export default Competition_view;