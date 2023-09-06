import { useParams } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./Login";
import Register from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Quotes from "../Pages/Quotes";
import MyQuotes from "../Pages/MyQuotes";
import Header from "../Header";
import MyProfile from "./MyProfile";

function Controller() {
    var { path } = useParams();
    return (<>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute exact path="/home" component={Quotes} />
            <ProtectedRoute exact path="/myquotes" component={MyQuotes} />
            <ProtectedRoute exact path="/profile" component={MyProfile} />
        </Switch>
    </>);
}

export default Controller;