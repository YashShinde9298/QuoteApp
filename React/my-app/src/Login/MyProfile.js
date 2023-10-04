import { useEffect, useState } from "react";
import Header from "../Header";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function MyProfile(props) {
    const [loginInfo, setLoginInfo] = useState({ first_name: "", last_name: "", email: "", mobile: "", password: "" });
    var id = window.sessionStorage.getItem('user_id');
    const [message, setMessage] = useState("");
    useEffect(() => {
        select();
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }, [message])
    const select = () => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState == 4 && server.status == 200) {
                debugger;
                var logininfor = JSON.parse(server.responseText);
                setLoginInfo(logininfor[0]);
                console.log(loginInfo);
            }
        };
        server.open("GET", "http://127.0.0.1:9999/profile/" + id);
        server.send();

    }

    const textChange = (args) => {
        debugger;
        let copyOfLogin = { ...loginInfo };
        copyOfLogin[args.target.name] = args.target.value;
        setLoginInfo(copyOfLogin);

    }
    const Save = () => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState == 4 && server.status == 200) {
                debugger;
                var logininfor = JSON.parse(server.responseText);
                if (logininfor.affectedRows > 0) {
                    select();
                    toast.success("Profile Updated")
                }
                else {
                    toast.error("Something Went Wrong")
                }
            }
        };
        server.open("PUT", "http://127.0.0.1:9999/profile/" + id);
        server.setRequestHeader('Content-Type', 'application/json');
        server.send(JSON.stringify({ ...loginInfo }));

    }
    return (<>
        <Header />
        <MDBContainer fluid>

            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div>

            <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 text-center'>

                    <h2 className="fw-bold mb-5">My Profile</h2>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='First name' name="first_name" id='txtFName' value={loginInfo.first_name} type='text' onChange={textChange} />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='Last name' name="last_name" id='txtLName' value={loginInfo.last_name} onChange={textChange} type='text' />
                        </MDBCol>
                    </MDBRow>
                    <MDBInput wrapperClass='mb-4' label='Email' id='txtEmail' type='email' name="email" onChange={textChange} value={loginInfo.email} />
                    <MDBInput wrapperClass='mb-4' label='Phone no.' id='txtMobile' name="mobile" type='number' onChange={textChange} value={loginInfo.mobile} />
                    <MDBInput wrapperClass='mb-4' label='Password' id='txtPassword' name="password" type='text' onChange={textChange} value={loginInfo.password} />
                    <MDBBtn className='w-100 mb-4' size='md' onClick={Save}>Update Info</MDBBtn>
                </MDBCardBody>
            </MDBCard>
            <ToastContainer position='top-center' />
        </MDBContainer>
    </>);
}

export default MyProfile;