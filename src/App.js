import logo from './logo.svg';
import './App.css';
import Login from './login';
import Register from './Register';
import Drive from './Drive';
import ActivationEmail from './activateMail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/register" component={Register} exact={true}/>
      <Route path="/user/activate/:activation_token" component={ActivationEmail} exact={true}/>
      <Route path="/user/reset/:id" component={Resetpassword} exact={true}/>
      <Route path="/" component={Login} exact={true}/>
      <Route path="/forgot_pwd" component={Forgotpassword} exact={true}/>
      <Route path="/drive" component={Drive} exact={true}/>
    </Switch>

  </Router>
  );
}

export default App;

