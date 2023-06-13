import React from 'react';
import useStudentSelect from '../../../hooks/useStudentSelect';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MySelectedClass = () => {
    const [isStudent, refetch, isStudentLoading] = useStudentSelect();
    console.log(isStudent);

    const handleDelete = (select) => {



        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/selectedClass/${select}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your Class has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })





    }

    return (
        <div>
            <div className="overflow-x-auto">

                <table className="table">
                    {/* totalEnrolledStudent > 0 ? totalEnrolledStudent : */}
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}
                        {
                            isStudent?.map((selectClass, index) => (<tr>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={selectClass.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>


                                        </div>
                                    </div>
                                </td>
                                <td>{selectClass.className}</td>
                                <td className='font-bold'>
                                    {selectClass.name}
                                </td>
                                <td className='font-bold'>
                                    {`$${selectClass.price}`}
                                </td>
                                <td>
                                    {console.log(selectClass._id)}
                                    <Link to={`/dashboard/payment/${selectClass._id}`}>
                                        <button className='bg-[#9bef8a] hover:bg-[#c2fff8] p-2 rounded-lg font-bold'>Pay</button>
                                    </Link>
                                </td>
                                <td><button onClick={() => handleDelete(selectClass?._id)} className='bg-[#85e8a8] hover:bg-[#ca9d15] p-2 rounded-lg font-bold'>delete</button></td>

                            </tr>))
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MySelectedClass;