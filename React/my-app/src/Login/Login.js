import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
    // const [message, setMessage] = useState("");
    // const [userData, setUserData] = useState([]);

    const OnTextChange = (args) => {
        var copyOfLogin = { ...loginInfo };
        copyOfLogin[args.target.name] = args.target.value;
        setLoginInfo(copyOfLogin);
    }

    const LogIn = () => {
        var server = new XMLHttpRequest();
        debugger;
        server.onreadystatechange = () => {
            if (server.readyState === 4 && server.status == 200) {
                var data = JSON.parse(server.responseText);
                debugger;
                if (data.length > 0) {
                    if (loginInfo.email.length == '') {
                        toast.error("Please enter email")
                    } else if (loginInfo.password.length == '') {
                        toast.error("Please enter password")
                    } else {
                        window.sessionStorage.setItem("username", `${data[0].first_name}`);
                        window.sessionStorage.setItem("isValid", 'true');
                        window.sessionStorage.setItem("user_id", `${data[0].user_id}`);
                        history.push('/home');
                    }

                }
                else {
                    toast.error("Invalid Credentials");
                }
            }
        }
        server.open("POST", "http://127.0.0.1:9999/login");
        server.setRequestHeader("Content-Type", "application/json");
        server.send(JSON.stringify({ ...loginInfo }));
    }

    const Register = () => {
        history.push('/register');
    }
    return (
        <div className='flex justify-center items-center pt-24 gap-11 '>
            <h1 className='text-5xl font-semibold text-indigo-500'>Welcome to <br /> Awesome Quotes</h1>
            <div className='grid justify-center shadow-xl shadow-indigo-500 rounded-xl border w-3/5 p-5'>
                <div className="text-2xl font-semibold tracking-wider">
                    <h1>Sign in to Platform</h1>
                </div>
                <div className='grid gap-2'>
                    <div className='grid'>
                        <label>Your Email</label>
                        <input type='email' name='email' value={loginInfo.email} onChange={OnTextChange} placeholder='Enter Email' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' />
                    </div>
                    <div className='grid'>
                        <label>Your Password</label>
                        <input type='password' name='password' value={loginInfo.password} onChange={OnTextChange} placeholder='Enter Password' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' />
                    </div>
                    <button className='bg-indigo-500 w-20 rounded-lg h-9 text-white hover:bg-indigo-700' onClick={LogIn}>Log In</button>
                    <div>
                        <p>Don't have an account? <a onClick={Register} class="link-info" className='hover:cursor-pointer'>Register here</a></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>);
}

export default Login;