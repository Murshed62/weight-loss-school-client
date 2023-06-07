import { Link } from "react-router-dom";

const PageNotFound = () => {
    
    return (
        <div className="bg-pageNotFound">
           <Link className="bg-orange-400 hover:bg-orange-600 text-3xl rounded-xl py-3 px-6 font-bold text-white"to='/'>Go to Home</Link>
        </div>
    );
};

export default PageNotFound;