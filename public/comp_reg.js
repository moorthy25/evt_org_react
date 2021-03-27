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