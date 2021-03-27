import { Link } from 'react-router-dom'
const Login = () => {
    return ( 
        <div className="home">
        <div className="login">
            <form action="">
                <input type="text" placeholder="Email address"/>
                <input placeholder="Password" type="password" />
                <input type="button" value="Login" />
            </form>
            <h6 className="signup">Don't have an account yet?<Link to='signup'>Sign up</Link></h6>
        </div>
    </div>
     );
}
 
export default Login;