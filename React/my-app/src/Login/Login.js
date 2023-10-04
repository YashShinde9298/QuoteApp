import { MDBBtn, MDBBtnGroup, MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
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
                        // setUserData([]);
                        window.sessionStorage.setItem("username", `${data[0].first_name}`);
                        window.sessionStorage.setItem("isValid", 'true');
                        window.sessionStorage.setItem("user_id", `${data[0].user_id}`);
                        history.push('/home');
                    }

                }
                else {
                    toast.error(setMessage("Invalid Credentials"));
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
    return (<>
        <MDBContainer fluid>

            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div>

            <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 text-center'>

                    <h2 className="fw-bold mb-3">Welcome To Quote App</h2>
                    <h2 className="fw-bold mb-5">Log In</h2>

                    <MDBInput wrapperClass='mb-4 w-100' label='Email address' name='email' value={loginInfo.email} id='txtEmail' type='email' size="lg" onChange={OnTextChange} />
                    <MDBInput wrapperClass='mb-4 w-100' label='Password' name='password' value={loginInfo.password} id='txtPassword' type='password' size="lg" onChange={OnTextChange} />

                    <MDBBtn className='w-100 mb-4' size='md' onClick={LogIn}>Log In</MDBBtn>
                    <div>
                        <p className='ms-5'>Don't have an account? <a onClick={Register} class="link-info">Register here</a></p>
                    </div>

                </MDBCardBody>
            </MDBCard>
            <ToastContainer position='top-center' />
        </MDBContainer>
    </>);
}

export default Login;