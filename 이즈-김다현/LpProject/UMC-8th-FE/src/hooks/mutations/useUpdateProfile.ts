import { useMutation } from "@tanstack/react-query";

function useUpdateProfile() {
    return useMutation({
        mutationFn: useUpdateProfile,
        
    })
}

export default useUpdateProfile;