import { Link } from 'react-router-dom';
import weight from '../../assets/weight.gif'
const Login = () => {
    return (
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 mx-auto my-10">
            <div className='mx-auto'>
                <img className='w-[200px]' src={weight} alt="" />
            </div>
            <div className="card-body p-10 pt-0">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-orange-600">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-orange-600">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <Link href="#" className="label-text-alt text-orange-600">Forgot password?</Link>
                    </label>
                    <span className='text-center'>Are you new? Please <Link className='text-orange-600 font-semibold' to="/register">Register here</Link></span>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-orange-400 hover:bg-[#fd1d1d] font-bold text-white">Login</button>
                </div>
            </div>

        </div>
    );
};

export default Login;