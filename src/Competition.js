import { useState } from "react";
import Navbar from "./navbar";
// import './comp_reg.js'


const Competition = () => {

    return (

<div className="home" >
    <Navbar />
        {/* <div className="nav">
            <h1>Event Management System</h1>
            <ul className="navList">
                <li value="home" onclick="document.getElementById('home').classList.remove('hide');document.getElementById('competition_div').classList.add('hide')">Home</li>
                <li value="competition" onclick="document.getElementById('competition_div').classList.remove('hide');document.getElementById('home').classList.add('hide')">Competition</li>
                <li><a onclick="logout()">Logout</a></li>
            </ul>

        </div> */}
        <div id="competition_div" className="hide">
            <label for="">Registered Competitions:</label>
            <ul id="reg_com">

            </ul>
            <table>
                <tr>
                    <td>Select competition:</td>
                    <td><select name="competition" onchange="fetch_price(this.value)" id="competition">
                            <option value="">Please select...</option>
                        </select></td>
                </tr>
                <tr>
                    <td>Registration fee</td>
                    <td id="amt"></td>
                </tr>
                <tr>
                    <td colspan="2"><button className="pay-btn" id="rzp-button1">Pay & Register</button></td>
                    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                    <script src="../comp_reg.js"></script>
                </tr>
            </table>
        </div>
        <div id="home">
            <table>
                <tr>
                    <td>Name</td>
                    <td id="username"></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td id="uemail"></td>
                </tr>
                <tr>
                    <td>College</td>
                    <td id="college"></td>
                </tr>
            </table>
        </div>
    </div>

    );
}

export default Competition;