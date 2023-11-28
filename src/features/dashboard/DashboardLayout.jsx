import styled from "styled-components";

import { useRecentBookings } from "./useRecentBookings";
import { useCabins } from "../cabins/useCabins";
import { useRecentStays } from "./useRecentStays";

import SalesChart from "./SalesChart";
import Spinner from '../../ui/Spinner';
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export const DashboardLayout = () => {
  const [isLoading, bookings] = useRecentBookings();
  const [isStaysLoading, stays, numDays] = useRecentStays();
  const [isCabinsLoading,, cabins] = useCabins();
  
  if(isLoading || isStaysLoading || isCabinsLoading) return <Spinner />;
  
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={stays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={stays} />
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
