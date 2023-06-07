import { Link } from "react-router-dom";
import fruits from "../../assets/fruits.gif"
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);


            })
    };


    return (
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
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-orange-600">Email</span>
                            </label>
                            <input type="text" {...register("email", { required: true })} placeholder="email here..." className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                    </div>
                    <div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-orange-600">Password</span>
                            </label>
                            <input type="text" {...register("password", { required: true })} placeholder="password here.." className="input input-bordered" />
                            {errors.password && <span className="text-red-600">Password is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-orange-600">Confirm Password</span>
                            </label>
                            <input type="text" {...register("confirm", { required: true })} placeholder="confirm password here..." className="input input-bordered" />
                            {errors.confirm && <span className="text-red-600">Confirm Password is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-orange-600">Photo URL</span>
                    </label>
                    <input type="text" {...register("photo", { required: true })} placeholder="write photo url here..." className="input input-bordered" />
                    {errors.photo && <span className="text-red-600">Photo Url is required</span>}
                </div>
                <span className='text-center'>Already have an account? Please <Link className='text-orange-600 font-semibold' to="/login">Login here</Link></span>
                <div className="form-control mt-6">
                    <button className="btn bg-orange-400 hover:bg-[#fd1d1d] font-bold text-white">Register</button>
                </div>
            </form>

        </div>
    );
};

export default Register;