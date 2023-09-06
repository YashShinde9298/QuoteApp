import { Route } from "react-router-dom";
import Login from "./Login";

function ProtectedRoute(props) {
    var isValid = false;

    var isUserValid = window.sessionStorage.getItem("isValid");

    if(isUserValid!=null && isUserValid == 'true'){
        isValid = true;
    }
    else{
        isValid = false;
    }

    if(isValid){
        return <Route exact path={props.path} component={props.component}/>
    }
    else{
        return <Login></Login>
    }
}

export default ProtectedRoute;