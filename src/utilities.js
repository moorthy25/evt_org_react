const getCookie = (cname) => {
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



const logout = () => {
    //delete cookie
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "utype=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "/"
}
const login_validate = () => {

    const email=getCookie('email')
    const LoginData = { email };
    fetch('http://localhost:3010/validate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LoginData)
    }).then((success) => {
        if (success.ok) {
            success.json().then(json => {
                if (json.status) {
                    console.log(json.user_details[0]);
                    return json.user_details[0];
                }else
                window.location.href = "/"
            });
        }
    }, (fail) => { alert(fail);window.location.href = "/" })
        .catch((err) => {
            console.log(err);
            window.location.href = "/"
            // alert('Error while signup')
        })
}

const comp_fetch=()=>{
    fetch('http://localhost:3010/competition_details').then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                // console.log(data.success);
                return { data:data.success};
                // status=true;
                // data.success.forEach(element => {

                // });
            })
        } else {
            alert("error while fetch competition details")
        }
    },(rej)=>console.log(rej))
}

module.exports = {
    getCookie,
    login_validate,
    logout,
    comp_fetch
}
