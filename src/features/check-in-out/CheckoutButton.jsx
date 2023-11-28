import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const [isCheckingOut, checkout] = useCheckout();
  
  return (
    <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
