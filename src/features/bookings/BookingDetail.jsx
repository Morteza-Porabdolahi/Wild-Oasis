import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const [isLoading, error, booking] = useBooking();
  const [isCheckingOut, checkOut] = useCheckout();
  const [isDeleting, deleteBooking] = useDeleteBooking();

  const moveBack = useMoveBack();

  if(isLoading) return <Spinner />
  if(!booking?.id) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button disabled={isDeleting} variation="danger" onClick={() => deleteBooking(bookingId)}>Delete</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete resourceName={`booking #${bookingId}`} disabled={isDeleting} onConfirm={() => deleteBooking(bookingId)} />
          </Modal.Window>
        </Modal>
        {
          status === 'unconfirmed' && 
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
        }

        {
          status === 'checked-in' && 
            <Button disabled={isCheckingOut} onClick={() => checkOut(bookingId)}>Check out</Button>
        }
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
