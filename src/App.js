import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Admin from './admin/Admin'
import AdminDashboard from './admin/AdminDashboard'
import Competition from './Competition';
import Dashboard from './Dashboard';
import Home from './Home'
import Login from './Login';
import Notification from './Notification';
import Result from './result';
import Signup from './signup';
import Competition_admin from './admin/competition'
import Competition_admin_view from './admin/competition_view'
import Invitation from './admin/invitation';
import Admin_Notification from './admin/Notification';

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
                        <Route exact path="/notification">
                            <Notification />
                        </Route>
                        <Route exact path="/result">
                            <Result />
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
                        <Route exact path="/admin/competition">
                            <Competition_admin />
                        </Route>
                        <Route path="/admin/invitation">
                            <Invitation />
                        </Route>
                        <Route exact path="/admin/notification">
                            <Admin_Notification />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
