import { useEffect, useState } from "react";


const PopularInstructor = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('https://weight-loss-school-server.vercel.app/popularinstructor')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    console.log(classes);
    return (
        <div>
            <h1 className="text-center text-3xl font-semibold text-orange-500 mt-20 mb-10">Popular Instructor</h1>
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
                {
                    classes.map(cls => (<>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={cls?.photoUrl} alt="Shoes" /></figure>

                        </div>
                    </>
                    ))
                }
            </div>
        </div>
    );
};

export default PopularInstructor;