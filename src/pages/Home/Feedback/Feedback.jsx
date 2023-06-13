import React from 'react';
import feedback from '../../../assets/feedback.gif';

const Feedback = () => {
    return (
        <div>
            <h1 className='text-center my-10 font-semibold text-3xl text-orange-600'>Student Feedback</h1>
            
            <div className="hero min-h-fit bg-orange-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-orange-600">Student Feedback !</h1>
      <div className="rating mt-3">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
      <p className="py-6 flex justify-center"><img src={feedback} alt="" /></p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-orange-600 font-semibold">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-orange-600 font-semibold">Feedback</span>
          </label>
          <textarea type="text" placeholder="give your valuable feedback here..." className="input input-bordered" />
          <label className="label">
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-orange-400 hover:bg-orange-500 font-bold text-white">Submit</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Feedback;