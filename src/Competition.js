import { useState } from "react";
import Compet_list from "./compet_list";
import Navbar from "./navbar";
import { comp_fetch } from './utilities'

// const List_competition = ({ competition_details }) => {

//     // onChange={fetch_price}
//     return ( 

//      );
// }


const Competition = () => {
    // const comp_data=[{competition_name: "WEB development",price: 150}]
    // const [competition_details, setCompet] = useState(comp_data);
    // let status=false;
    // const data=comp_fetch();
    //     console.log("from competition.js"+data)



    const [fees, setFees] = useState('100');

    return (<div className="competition_parent">
        <Navbar />

        <div className="competition">
            {/* <!-- <label for="">Registered Competitions:</label> --> */}
            {/* <ul id="reg_com">

            </ul> */}
            <table>
                <tr>
                    <td>Select competition:</td>
                    <td>
                        <select id="competition">
                            <option value="">Select Competition...</option>
                            {


                                fetch('http://localhost:3010/competition_details').then((res) => {
                                    if (res.ok) {
                                        res.json().then((data) => {
                                            // console.log(data.success);
                                            data.success.forEach(element => {
                                                <option value={element.price} >{element.competition_name}</option>
                                            })

                                        })
                                    } else {
                                        alert("error while fetch competition details")
                                    }
                                }, (rej) => console.log(rej))



                            }
                            {/* {<Compet_list competition_details={competition_details} /> } */}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Registration fee</td>
                    <td id="amt">{fees}</td>
                </tr>
                <tr>
                    <td colspan="2"><button className="pay-btn" id="rzp-button1">Pay & Register</button></td>

                    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                    <script src="../comp_reg.js"></script>
                </tr>
            </table>
        </div>
    </div>







    );
}

export default Competition;