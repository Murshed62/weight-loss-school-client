import { useEffect, useState } from "react";

const EnrolledStudent = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://weight-loss-school-server.vercel.app/payments')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    
    return (
        <div>
            <h1 className="text-center font-bold text-orange-500 text-3xl mb-2 mt-2">Enrolled Classes List</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Payment Status</th>

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
                                                    <img src={user?.payment?.image} alt="Avatar Tailwind CSS Component" />

                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user?.payment?.className}</td>
                                    <td>{user?.payment?.email}</td>
                                    <td>{user?.payment?.price}</td>
                                    <td>{user?.date}</td>
                                    <td>{user?.status}</td>

                                </tr>
                            </>))
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default EnrolledStudent;