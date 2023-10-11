import { useEffect, useState } from "react";
import Header from "../Header";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";

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
        <div className='flex justify-center items-center pt-1 gap-11'>


            <h1 className='text-5xl font-semibold text-indigo-500'>Welcome to <br /> Awesome Quotes</h1>
            <div className='grid justify-center shadow-xl shadow-indigo-500 rounded-xl border w-3/5 p-5'>
                <div className="text-2xl font-semibold tracking-wider">
                    <h1>Update Data</h1>
                </div>
                <div className='grid gap-2'>
                    <div className='grid'>
                        <label>First Name</label>
                        <input type='text' name='first_name' onChange={textChange} placeholder='Enter First Name' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' value={loginInfo.first_name} />
                    </div>
                    <div className='grid'>
                        <label>Last Name</label>
                        <input type='text' name='last_name' onChange={textChange} placeholder='Enter Last Name' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' value={loginInfo.last_name} />
                    </div>
                    <div className='grid'>
                        <label>Email</label>
                        <input type='email' name='email' onChange={textChange} placeholder='Enter Email Address' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' value={loginInfo.email} disabled />
                    </div>
                    <div className='grid'>
                        <label>Mobile No.</label>
                        <input type='number' name='mobile' onChange={textChange} placeholder='Enter Mobile number' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' value={loginInfo.mobile} />
                    </div>
                    <div className='grid'>
                        <label>Password</label>
                        <input type='text' name='password' onChange={textChange} placeholder='Set Password' className='bg-gray-200 outline-none rounded-md h-9 w-80 ps-2' value={loginInfo.password} />
                    </div>
                    <button className='bg-indigo-500 w-28 rounded-lg h-9 text-white hover:bg-indigo-700' onClick={Save}>Update Info</button>

                </div>
            </div>
        </div>
        {/* <MDBContainer fluid>

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
        </MDBContainer> */}

    </>);
}

export default MyProfile;