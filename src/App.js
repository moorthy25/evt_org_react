import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './Admin'
import AdminDashboard from './AdminDashboard'
import Competition from './Competition';
import Dashboard from './Dashboard';
import Home from './Home'
import Login from './Login';
import Signup from './signup';


function App() {

    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                        <Route exact path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route exact path="/competition">
                            <Competition />
                        </Route>
                        <Route exact path="/admin">
                            <Admin />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route path="/admin/dashboard">
                            <AdminDashboard />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
