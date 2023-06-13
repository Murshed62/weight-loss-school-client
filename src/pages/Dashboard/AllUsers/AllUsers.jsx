import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcVoicePresentation } from "react-icons/fc";
import { toast } from "react-hot-toast";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
    });

    const handleMakeInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
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
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
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

    console.log(users);
    return (
        <div>
            <h1>All users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Status</th>
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
                                            className="btn  text-white bg-[#4db5ff] btn-ghost "
                                        >
                                            {" "}
                                            < FcVoicePresentation />
                                        </button>)
                                    }
                                    </td>
                                    <td>{
                                        user.role === 'instructor' ? ('instructor') : (<button
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn  text-white bg-[#4db5ff] btn-ghost "
                                        >
                                            {" "}
                                            < FcVoicePresentation />
                                        </button>)
                                    }
                                    </td>
                                    <td>{
                                        user.role === 'instructor' ? ('instructor') : ( <button
                                            onClick={() => handleMakeInstructor(user)}
                                            className="btn text-white bg-[#4db5ff] btn-ghost "
                                        >
                                            {" "}
                                            < FcVoicePresentation />
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