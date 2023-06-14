import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ShowClass = ({cls, handleEnroll}) => {
    const {user} = useAuth();
    
    
    const selectedClass = {
        ClassId:cls._id,
        className: cls.name,
        image: cls.choose,
        name: cls.instructor,
        AvailableSeat: cls.seats,
        price: cls.price,
        email: cls.email,
        student: user?.email,
      };
      
    
      const styleForButton = {
        backgroundColor: cls?.seats === 0 ? 'red' : 'initial'
      }

    return (
        <div style={styleForButton} className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={cls?.choose} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Class Name: {cls.name}</h2>
    <h2 className="card-title">Instructor: {cls.instructor}</h2>
    <p className='mb-5'>Available Seats: {cls.seats}</p>
    <p className='mb-5'>Price: {cls.price}</p>
    <div className="card-actions justify-end">
      <button onClick={() => handleEnroll(selectedClass)} className="btn bg-orange-400 font-bold text-white hover:bg-orange-500 mx-auto">Select Class</button>
    </div>
  </div>
</div>
    );
};

export default ShowClass;