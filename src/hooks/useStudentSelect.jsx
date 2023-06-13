import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStudentSelect = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    // using axios secure with react query

    const { data: isStudent, refetch, isLoading: isStudentLoading } = useQuery({
        queryKey: ['isStudent', user?.email],
        // enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/selectedClass?email=${user.email}`);
                return res.data;
            }

        }
    })
    return [isStudent, refetch, isStudentLoading]
}
export default useStudentSelect;