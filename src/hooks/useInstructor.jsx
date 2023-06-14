import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure(); 

    // using axios secure with react query

    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
           if(!loading && user?.email){
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            
            return res.data;
           }
        }
    })
    return [isInstructor, isInstructorLoading]
}
export default useInstructor;