import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess:() => {
      toast.success(`The booking successfully deleted !`);
      queryClient.invalidateQueries({
        active: true
      });
    },
    onSettled: () => navigate('/bookings'),
    onError: () => {
      toast.error(`An error occurred while deleteing booking!`);
    }
  });

  return [isDeleting, deleteBooking];
}
