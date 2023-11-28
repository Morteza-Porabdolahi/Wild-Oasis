import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last') ? 7 : +searchParams.get('last');
  const queryDate = subDays(new Date(), numDays).toISOString(); 

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', numDays],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return [isLoading, bookings];
}
