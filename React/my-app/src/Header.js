import { useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();
    const Logout = ()=>{
        window.sessionStorage.removeItem("isValid");
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("user_id");
        history.push('/login');
    }
    return ( <>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/myquotes">My Quotes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={Logout} style={{color:"red",marginLeft:1150}} href="/">Logout</a>
          </li>
        </ul>
        <ul className="navbar-nav">

        </ul>
      </div>
    </nav></> );
}

export default Header;