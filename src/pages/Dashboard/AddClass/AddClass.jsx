
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const img_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const AddClass = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {user} = useAuth();
    // console.log(user.email);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    console.log(img_hosting_url);

    const [axiosSecure] = useAxiosSecure();
    const onSubmit = data => {
console.log(data);
        console.log('clicked');
        const formData = new FormData();
        formData.append('image', data.choose[0])
        console.log(formData);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {name, email, instructor, price, seats} = data;
                const newClass = {name, price: parseFloat(price), email, instructor,seats, choose:imgURL, status:'pending'}
                console.log(newClass)
                axiosSecure.post('/addclass', newClass)
                .then(data => {
                    console.log( data.data)
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Class added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })

    };
    
    return (
        <div>
            <h1 className="font-bold text-3xl text-orange-500 flex justify-center">Add a class</h1>
            {/* form start */}

            <div className="card w-full max-w-lg shadow-2xl bg-base-100 mx-auto my-10">
                <div className='mx-auto'>
                    <img className='w-[200px]' src="" alt="" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-10 pt-0">
                    <div className="flex gap-3">
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Class Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="class name here..." className="input input-bordered" />
                                {errors.name?.type === 'required' && <p className="text-red-600">Class Name field is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Instructor Name</span>
                                </label>
                                <input type="text" defaultValue={user?.displayName} {...register("instructor", { required: true })} placeholder="Instructor name here..." className="input input-bordered" />
                                {errors.instructor?.type === 'required' && <p className="text-red-600">Instructor name field is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Available Seats</span>
                                </label>
                                <input type="text" {...register("seats", { required: true })} placeholder="Available Seats" className="input input-bordered" />
                                {errors.seats?.type === 'required' && <p className="text-red-600">Available seats is required</p>}
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Class Image</span>
                                </label>
                                <input type="file" {...register("choose", {
                                    required: true,
                                })} placeholder="choose file" className="input input-bordered w-[150px]" />
                                {errors.choose?.type === 'required' && <p className="text-red-600">No file chosen</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Instructor Email</span>
                                </label>
                                <input type="email" defaultValue={user?.email} {...register("email", {
                                    required: true,
                            
                                })} placeholder="write Instructor here..." className="input input-bordered" />
                                {errors.email?.type === 'required' && <p className="text-red-600">Instructor email required</p>}
                               
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-orange-600">Price</span>
                                </label>
                                <input type="number" {...register("price", {
                                    required: true,
                            
                                })} placeholder="give your price..." className="input input-bordered" />
                                {errors.price?.type === 'required' && <p className="text-red-600">no price write</p>}
                               
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-control mt-6">
                        <input type="submit" className="btn bg-orange-400 hover:bg-[#fd1d1d] font-bold text-white" value="add a class"/>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddClass;