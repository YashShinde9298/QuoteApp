import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { MDBBtn, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardImage, MDBCheckbox, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
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
    return (<>

        <MDBContainer fluid>

            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div>

            <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 text-center'>

                    <h2 className="fw-bold mb-5">Sign up now</h2>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='First name' name="first_name" id='txtFName' type='text' onChange={OnTextChange} />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='Last name' name="last_name" id='txtLName' onChange={OnTextChange} type='text' />
                        </MDBCol>
                    </MDBRow>

                    <MDBInput wrapperClass='mb-4' label='Email' id='txtEmail' type='email' name="email" onChange={OnTextChange} />
                    <MDBInput wrapperClass='mb-4' label='Phone no.' id='txtMobile' name="mobile" type='number' onChange={OnTextChange} />
                    <MDBInput wrapperClass='mb-4' label='Password' id='txtPassword' type='password' name="password" onChange={OnTextChange} />
                    <MDBBtn className='w-100 mb-4' size='md' onClick={insert}>sign up</MDBBtn>

                </MDBCardBody>
            </MDBCard>
            <ToastContainer position='top-center' />
        </MDBContainer>
    </>);
}

export default Register;