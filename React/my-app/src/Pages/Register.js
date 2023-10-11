import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const history = useHistory();
    const [user, setUser] = useState({ first_name: "", last_name: "", email: "", password: "", mobile: "" });

    const [message, setMessage] = useState("");
    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }, [message]);

    const OnTextChange = (args) => {
        var copyOfUser = { ...user };
        copyOfUser[args.target.name] = args.target.value;
        setUser(copyOfUser);
    }

    const insert = () => {
        var server = new XMLHttpRequest();
        debugger;
        server.onreadystatechange = () => {
            if (server.readyState === 4 && server.status === 200) {
                var responseReceived = JSON.parse(server.responseText);
                if (responseReceived.affectedRows !== undefined && responseReceived.affectedRows > 0) {

                    if (user.first_name.length == "") {
                        toast.error("Enter first name");
                    } else if (user.last_name.length == "") {
                        toast.error("Enter last name");
                    } else if (user.email.length == "") {
                        toast.error("Enter email");
                    } else if (user.mobile.length == "") {
                        toast.error("Enter mobile number");
                    } else if (user.password.length == "") {
                        toast.error("Enter Password");
                    } else {
                        setUser({
                            user: {
                                first_name: "", last_name: "", email: "", password: "", mobile: ""
                            }
                        })
                        history.push('/login');
                    }
                }
                else {
                    toast.error(setMessage("Something went wrong"));
                }
            }
        };
        server.open("POST", "http://127.0.0.1:9999/register");
        server.setRequestHeader("Content-Type", "application/json");
        server.send(JSON.stringify({ ...user }));
    }
    const Login = () => {
        history.push('/login');
    }
    return (<div className='flex justify-center items-center pt-1 gap-11'>


        <h1 className='text-5xl font-semibold text-indigo-500'>Welcome to <br /> Awesome Quotes</h1>
        <div className='grid justify-center shadow-xl shadow-indigo-500 rounded-xl border w-3/5 p-5'>
            <div>
                <h1>Sign up to Platform</h1>
            </div>
            <div className='grid gap-2'>
                <div className='grid'>
                    <label>First Name</label>
                    <input type='text' name='first_name' onChange={OnTextChange} placeholder='Enter First Name' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' />
                </div>
                <div className='grid'>
                    <label>Last Name</label>
                    <input type='text' name='last_name' onChange={OnTextChange} placeholder='Enter Last Name' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' />
                </div>
                <div className='grid'>
                    <label>Email</label>
                    <input type='email' name='email' onChange={OnTextChange} placeholder='Enter Email Address' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' />
                </div>
                <div className='grid'>
                    <label>Mobile No.</label>
                    <input type='number' name='mobile' onChange={OnTextChange} placeholder='Enter Mobile number' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' />
                </div>
                <div className='grid'>
                    <label>Password</label>
                    <input type='password' name='password' onChange={OnTextChange} placeholder='Set Password' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' />
                </div>
                <button className='bg-indigo-500 w-20 rounded-lg h-9 text-white hover:bg-indigo-700' onClick={insert}>Sign Up</button>
                <div>
                    <p>Already have an Account? <a onClick={Login} class="link-info" className='hover:cursor-pointer'>Log In</a></p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Register;