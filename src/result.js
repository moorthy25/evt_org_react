import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { getCookie } from './utilities'
// import axios from "axios"
// import './checkout'


const Result = () => {
    //     const [reload_reg_comp,set_regcomp]=useState(false);
    //     const [competition, setCompet] = useState([{ price: 0 }])
    //     const [index, setIndex] = useState(0)
    //     const [price, setPrice] = useState('')
    //     const [disabled, setDisable] = useState(false)
    //     const [paybtn,setPaybtn]=useState(false)

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Mobile, setMobile] = useState('')
    //     const [Order, setOrder] = useState('')
    // var new_compt=[];



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
                if (json.email != undefined) {
                    setName(json.name)
                    setEmail(json.email)
                    setMobile(json.phone_no)

                } else
                    window.location.href = "/"
            });
        }
    }, (fail) => { alert(fail); window.location.href = "/" })
        .catch((err) => {
            console.log(err);
            window.location.href = "/"
            // alert('Error while signup')
        })

    //     // end of login present component
    const [result, setResult] = useState([{}])

    useEffect(() => {
        const abortCont = new AbortController();
        fetch('http://localhost:3010/fetchWinners', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: getCookie('email') }),
            signal: abortCont.signal

        }).then(res => {
            res.json().then(res => {
                setResult(res);
            })
        }, rej => {
            console.log(rej)
        })
            .catch(rej => console.log(rej))
        // abort the fetch

        return () => abortCont.abort();
    }, [])


    return (
        <div className="comp_root">
            <Navbar />
            <div>
                {result && result.map((data, index) => {

                    return (
                        <div>
                            <h3>{data.competition_name}</h3>
                            <h6>First prize: <span> {data.f_prize}</span></h6>
                            <h6>Second prize:<span>{data.s_prize}</span></h6>
                            <h6>Third prize:<span>{data.t_prize}</span></h6>
                        </div>
                    );
                })
                }
            </div>
        </div>

    );
}

export default Result;