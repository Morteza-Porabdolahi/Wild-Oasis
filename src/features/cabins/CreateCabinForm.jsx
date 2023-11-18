import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = !!editId;

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const [isCreating, createCabin] = useCreateCabin();
  const [isEditing, editCabin] = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      const image = typeof data.image === 'string' || data.image === null ? data.image : data.image[0];

      editCabin({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => {
          reset({
            name: '',
            maxCapacity: '',
            regularPrice: '',
            discount: 0,
            description: '',
            image: '',
          })
          onClose?.();
        },
      })
    } else {
      createCabin({ ...data, image: data.image[0] }, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input disabled={isWorking} type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input disabled={isWorking} type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 10,
            message: "Price should be at least 10"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount shoud be less than regular price"
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image", {
          required: isEditSession ? false : "This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
