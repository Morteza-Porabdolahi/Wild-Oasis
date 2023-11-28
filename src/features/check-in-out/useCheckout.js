import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) => updateBookingApi(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out!`);
      
      queryClient.invalidateQueries({ active: true })
      navigate(`/dashboard`, { replace: true });
    },
    onError: () => toast.error('Booking could not be updated !')
  });

  return [isCheckingOut, checkOut];
}
