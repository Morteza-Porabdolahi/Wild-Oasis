import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams);

  // Filtering logic
  searchParamsObj.status = searchParamsObj.status === 'all' ? "" : searchParamsObj.status;

  //Sorting logic
  searchParamsObj.sortBy ||= 'startDate-desc';
  const [field, direction] = searchParamsObj.sortBy.split('-');

  searchParamsObj.sortBy = { field, direction };

  // PAGINATION
  searchParamsObj.page ||= 1;
  searchParamsObj.page = +searchParamsObj.page;
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['bookings', searchParamsObj],
    queryFn: () => getBookings(searchParamsObj),
  });

  // PRE-FETCHING
  if(data) {
    const pageCount = Math.ceil(data.count / PAGE_SIZE);
    
    if(searchParamsObj.page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', {...searchParamsObj, page: searchParamsObj.page + 1}],
        queryFn: () => getBookings({...searchParamsObj, page: searchParamsObj.page + 1}),
      })
    }

    if(searchParamsObj.page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', {...searchParamsObj, page: searchParamsObj.page - 1}],
        queryFn: () => getBookings({...searchParamsObj, page: searchParamsObj.page - 1}),
      })
    }
  }
  
  return [isLoading, error, data]
}
