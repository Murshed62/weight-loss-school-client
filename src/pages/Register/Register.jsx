import { Link, useNavigate } from "react-router-dom";
import fruits from "../../assets/fruits.gif"
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { TbFidgetSpinner } from "react-icons/tb";

// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile, loading, setLoading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = { name: data.name, email: data?.email, role: 'student', photoUrl: data?.photo }
                        fetch('https://weight-loss-school-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userInfo)
                        })
                    })
                    .then(() => {
                        reset();
                        setLoading(false);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User create Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: error.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })

            })

        reset();
    };

    const password = watch('password');

    return (
        <>
            <Helmet>
                <title>SlimFit Academy | Sign Up</title>
            </Helmet>
            <div className="card w-full max-w-lg shadow-2xl bg-base-100 mx-auto my-10">
                <div className='mx-auto'>
                    <img className='w-[200px]' src={fruits} alt="" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-10 pt-0">
                    <div className="flex gap-3">
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name here..." className="input input-bordered" />
                                {errors.name?.type === 'required' && <p className="text-red-600">Name field is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Email</span>
                                </label>
                                <input type="text" {...register("email", { required: true })} placeholder="email here..." className="input input-bordered" />
                                {errors.email?.type === 'required' && <p className="text-red-600">Email field is required</p>}
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true, minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                })} placeholder="password here.." className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">is less than 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">password must have a capital letter and a special character</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Confirm Password</span>
                                </label>
                                <input type="password" {...register("confirm", {
                                    required: true,
                                    validate: (value) => value === password
                                })} placeholder="confirm password here..." className="input input-bordered" />
                                {errors.confirm?.type === 'required' && <p className="text-red-600">Confirm Password is required</p>}
                                {errors.confirm?.type === 'validate' && <p className="text-red-600">Passwords do not match</p>}
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-orange-600">Photo URL</span>
                        </label>
                        <input type="text" {...register("photo", { required: true })} placeholder="write photo url here..." className="input input-bordered" />
                        {errors.photo?.type === 'required' && <p className="text-red-600">Photo Url field is required</p>}
                    </div>
                    <span className='text-center'>Already have an account? Please <Link className='text-orange-600 font-semibold' to="/login">Login here</Link></span>
                    <div className="form-control mt-6">
                        <button className="btn bg-orange-400 hover:bg-[#fd1d1d] font-bold text-white"> {loading ? <TbFidgetSpinner className='animate-spin' size={25}></TbFidgetSpinner> : 'Register'}</button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default Register;