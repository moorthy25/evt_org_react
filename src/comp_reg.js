var options = {
    "key": "rzp_test_H0l7ruuVdzWaFR", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "AMC BCA Dept",
    "description": "Test Transaction for Hover registration",
    "image": "https://ams.americancollege.edu.in/ams/images/aclogin_logofinal.png",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "http://localhost/dashboard.html",
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": "The American College,Madurai"
    },
    "theme": {
        "color": "#3399cc"
    }
};

document.getElementById('rzp-button1').onclick = function (e) {
    if (document.getElementById("amt").innerHTML == "" || null) {
        alert("select competition to checkout")
        return;
    }
    //initiate payment
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resObj = JSON.parse(this.responseText)
            if (resObj.status) {
                options.order_id = resObj.order.id
                var rzp1 = new Razorpay(options);
                rzp1.open();
            }
        }
    }
    http.open("post", "/user/payment", true)
    http.setRequestHeader("Content-Type", "application/json")
    http.send(JSON.stringify({
        amount: document.getElementById("amt").innerHTML, email: useremail,
        competition_id: compet_id
    }))
    e.preventDefault();
}

/* second part */

var compet_id;
        function logout() {
            document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location = "login.html"
        }
        function fetch_price(com_id) {
            document.getElementById('amt').innerHTML = ""
            compet_id = com_id
            amt_tmp = competition_details.filter(val => val._id == com_id)[0].price * 100
            options.amount = amt_tmp.toString()
            document.getElementById('amt').innerHTML = competition_details.filter(val => val._id == com_id)[0].price
        }

        var competition_details = [];
        var res;
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        var useremail;
        window.onload = () => {
            //verify the user is logged in oer not
            useremail = getCookie('email');
            if (useremail == "") {
                window.location = "index.html"
            }
            var http = new XMLHttpRequest();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var resObj = JSON.parse(this.responseText)
                    if (resObj.status) {
                        res = resObj
                        var parentNode = document.getElementById('competition')
                        resObj.competition.forEach(element => {
                            competition_details.push(element)
                            var options = document.createElement('option')
                            options.setAttribute('value', element._id)
                            options.innerHTML = element.competition_name;
                            parentNode.appendChild(options)
                        });
                        document.getElementById('username').innerHTML = resObj.user_details[0].name
                        document.getElementById('uemail').innerHTML = resObj.user_details[0].email
                        document.getElementById('college').innerHTML = resObj.user_details[0].institution
                        options.prefill.name = resObj.user_details[0].name
                        options.prefill.email = resObj.user_details[0].email
                        options.prefill.contact = res.user_details[0].phone_no

                    }
                }
            }
            http.open("post", "/user/validate", true)
            http.setRequestHeader("Content-Type", "application/json")
            http.send(JSON.stringify({ email: useremail }))
        }