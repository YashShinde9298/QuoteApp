import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./Login";
import Register from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Quotes from "../Pages/Quotes";
import MyQuotes from "../Pages/MyQuotes";
import MyProfile from "./MyProfile";
import FavouriteQuotes from "../Pages/FavouriteQuotes";
import NotFound from "../Pages/NotFound";

function Controller() {
    return (<>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute exact path="/home" component={Quotes} />
            <ProtectedRoute exact path="/myquotes" component={MyQuotes} />
            <ProtectedRoute exact path="/profile" component={MyProfile} />
            <ProtectedRoute exact path="/fav" component={FavouriteQuotes} />
            <Route exact path="/*" component={NotFound} />
        </Switch>
    </>);
}

export default Controller;