import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

import { useSettings } from './useSettings';

function UpdateSettingsForm() {
  const [isLoading, , settings = {}] = useSettings();

  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;

  const [isUpdating, updateSetting] = useUpdateSetting();
  
  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value || value == settings[name]) return;

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input disabled={isUpdating} onBlur={e => handleUpdate(e, "minBookingLength")} defaultValue={minBookingLength} type='number' id='min-nights' />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input disabled={isUpdating} onBlur={e => handleUpdate(e, "maxBookingLength")} defaultValue={maxBookingLength} type='number' id='max-nights' />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input disabled={isUpdating} onBlur={e => handleUpdate(e, "maxGuestsPerBooking")} defaultValue={maxGuestsPerBooking} type='number' id='max-guests' />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input disabled={isUpdating} onBlur={e => handleUpdate(e, "breakfastPrice")} defaultValue={breakfastPrice} type='number' id='breakfast-price' />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
