import React from 'react';
import { Link } from 'react-router-dom';

const ShowInstructor = ({inst}) => {
  
    const {_id,photoUrl, email, name} = inst;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={photoUrl} alt="Shoes" /></figure>
        <div className="card-body text-center mx-auto">
          <h2 className="card-title">Instructor Name: {name}</h2>
          <p className='font-semibold'>Email: {email}</p>
          <Link className="card-actions justify-end flex justify-center">
            <button className="btn bg-orange-400 hover:bg-orange-500 text-white font-bold">Details</button>
          </Link>
        </div>
      </div>
    );
};

export default ShowInstructor;