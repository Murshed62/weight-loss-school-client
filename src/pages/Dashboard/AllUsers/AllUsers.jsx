import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcVoicePresentation } from "react-icons/fc";
import { toast } from "react-hot-toast";
import adminIcon from '../../../assets/admin.png';
import instructorIcon from '../../../assets/instructor.png';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
    });

    const handleMakeInstructor = (user) => {
        fetch(`https://weight-loss-school-server.vercel.app/users/instructor/${user._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success(`${user.name} is an instructor Successfully`);
                }
            });
    }

    const handleMakeAdmin = (user) => {
        fetch(`https://weight-loss-school-server.vercel.app/users/admin/${user._id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success(`${user.name} is an admin Successfully`);
                }
            });
    }

    
    return (
        <div>
            <h1 className="text-center font-bold text-3xl text-orange-400">Manage users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Make Admin</th>
                            <th>Make Instructor</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => (<>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user?.photoUrl} alt="Avatar Tailwind CSS Component" />

                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{
                                        user.role === 'admin' ? ('admin') : (<button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn bg-orange-100 btn-ghost hover:bg-orange-200"
                                        >
                                            {" "}
                                            <img width={20} src={adminIcon} alt="" />
                                        </button>)
                                    }
                                    </td>
                                    <td>{
                                        user.role === 'instructor' ? ('instructor') : (<button
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn  bg-orange-100 btn-ghost hover:bg-orange-200  "
                                        >
                                            {" "}
                                            <img width={16} src={instructorIcon} alt="" />
                                        </button>)
                                    }
                                    </td>

                                </tr>
                            </>))
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AllUsers;