import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="App">

            <head>
                <title>Event management System</title>
            </head>
            <body>
                <div class="index_home">

        <div class="nav">
            <img src="../1.png" alt="logo"/>
            <h1>Event Organzation System</h1>
            <ul>
                <li><Link to="../">Home</Link></li>
                <li><Link to="../login">Login</Link></li>
                <li><Link to="../signup">Signup</Link></li>
            </ul>
        </div>
                    <div class="img-gallery">
                        <img src="1.jpg" alt="Event img"></img>
                        <img src="2.jpg" alt="Event img"></img>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Home;