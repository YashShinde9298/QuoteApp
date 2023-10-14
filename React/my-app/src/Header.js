import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const userName = sessionStorage.getItem("username");
  const Logout = () => {
    window.sessionStorage.removeItem("isValid");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("user_id");
    history.push('/login');
  }


  return (
    <div>
      <div className="flex h-14 shadow-xl items-center place-content-between px-2 bg-white">
        <div >
          <h1 className="text-3xl font-semibold tracking-wider text-indigo-500">Awesome Quotes</h1>
        </div>
        <div className="flex space-x-6 text-lg font-medium tracking-wider ">
          <button onClick={() => { history.push('/home') }} className="hover:text-indigo-500 hover:underline" >Home</button>
          <button onClick={() => { history.push('/myquotes') }} className="hover:text-indigo-500 hover:underline" >My Quotes</button>
          <button onClick={() => { history.push('/fav') }} className="hover:text-indigo-500 hover:underline" >Favourite Quotes</button>
          <button onClick={() => { history.push('/profile') }} className="hover:text-indigo-500 hover:underline" >Profile</button>
        </div>
        <div className="flex space-x-4 items-center">
          <h4 className="text-xl pt-2">Welcome, <span className="font-semibold">{userName}</span></h4>

          <button className="text-red-500 text-lg underline hover:text-red-700" onClick={Logout}>Log out</button>
        </div>
      </div>
    </div>);
}

export default Header;