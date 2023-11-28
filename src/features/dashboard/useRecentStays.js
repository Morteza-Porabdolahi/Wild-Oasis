import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last') ? 7 : +searchParams.get('last');
  const queryDate = subDays(new Date(), numDays).toISOString(); 

  const { isLoading, data: stays } = useQuery({
    queryKey: ['stays', numDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(stay => stay.status !== 'unconfirmed');

  return [isLoading, confirmedStays, numDays];
}
