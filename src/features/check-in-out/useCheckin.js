import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const { bookingId } = useParams();
  const navigate = useNavigate();
  
  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: (newBookingObj = {}) => updateBookingApi(bookingId, { status: 'checked-in', isPaid: true, ...newBookingObj }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      
      queryClient.invalidateQueries({ active: true })
      navigate(`/dashboard`, { replace: true });
    },
    onError: () => toast.error('Booking could not be updated !')
  });

  return [isCheckingIn, checkIn]
}
