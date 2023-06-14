import { Link, useLocation, useNavigate } from 'react-router-dom';
import weight from '../../assets/weight.gif'
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from 'sweetalert2';
import { useRef } from 'react';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { loading, setLoading, signIn, googleSignIn, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const emailRef = useRef();

    //handle submit
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
               
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true })
            }).catch(error => {
                setLoading(false);
                console.log(error.message);
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: error.message,
                //   })
            })
    }

    //handle google sign in
    const handleGoogleSignIn = () => {
        googleSignIn().then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            const userInfo = { name: loggedUser.displayName, email: loggedUser.email, photoUrl: loggedUser.photoURL, role: 'student' }
            fetch('https://weight-loss-school-server.vercel.app/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            }).then(result => result.json()
                .then(data => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User Login Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(from, { replace: true })
                })
            )

        }).catch(error => {
            setLoading(false);
            console.log(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        })
    }

    //handle password reset
    const handleReset = (event) => {
        event.preventDefault()
        const email = emailRef.current.value;
        resetPassword(email).then(() => {
            setLoading(false);
            Swal.fire('Reset Password Link send to your email')
        }).catch(error => {
            setLoading(false);
            console.log(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        })

    }

    return (
        <>
            <Helmet>
                <title>SlimFit Academy | Login</title>
            </Helmet>
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-10">
                <div className='mx-auto'>
                    <img className='w-[200px]' src={weight} alt="" />
                </div>
                <form onSubmit={handleSubmit} className="card-body  pt-0">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-orange-600">Email</span>
                        </label>
                        <input type="text" placeholder="email" name='email' ref={emailRef} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-orange-600">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" />
                        <label className="label">
                            <button onClick={handleReset} className="label-text-alt text-orange-600">Forgot password?</button>
                        </label>
                        <span className='text-center'>Are you new? Please <Link className='text-orange-600 font-semibold' to="/register">Register here</Link></span>
                    </div>
                    <div className="form-control ">
                        <button className="btn bg-orange-400 hover:bg-[#fd1d1d] font-bold text-white">
                            {loading ? <TbFidgetSpinner className='animate-spin' size={25}></TbFidgetSpinner> : 'Login'}
                        </button>
                    </div>

                </form>
                <div className="form-control">
                    <button onClick={handleGoogleSignIn} className="btn btn-outline  hover:bg-[#fd1d1d] border-none"><FcGoogle className='text-3xl'></FcGoogle></button>
                </div>

            </div></>
    );
};

export default Login;