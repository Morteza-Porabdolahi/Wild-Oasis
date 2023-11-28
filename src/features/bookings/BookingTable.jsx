import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBookings } from './useBookings';
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const [isLoading, error, data] = useBookings();

  if (isLoading) return <Spinner />

  const { data: bookings, count } = data;

  if (bookings.length <= 0) return <Empty resourceName="Bookings" />

  return (
    <>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <Menus key={booking.id}>
              <BookingRow booking={booking} />
            </Menus>
          )}
        />
        <Table.Footer>
          <Pagination resultsLength={count} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default BookingTable;
