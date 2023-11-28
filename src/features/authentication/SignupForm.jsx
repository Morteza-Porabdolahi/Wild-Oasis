import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

function SignupForm() {
  const [isSigningUp, signup] = useSignUp();
  const { reset, formState: { errors }, register, getValues, handleSubmit } = useForm();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, {
      onSettled: () => reset(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled={isSigningUp} {...register('fullName', { required: 'This field is required!' })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled={isSigningUp} {...register('email', {
          required: 'This field is required!', pattern: {
            value: /^(\w+\.*)+@(\w+\.+)+\w{2,}$/,
            message: 'Provide a valid email address!'
          }
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" disabled={isSigningUp} {...register('password', {
          required: 'This field is required!', minLength: {
            value: 8,
            message: 'The password must be greater than 8 characters',
          }
        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isSigningUp} {...register('passwordConfirm', { required: 'This field is required!', validate: (value) => value === getValues().password || 'Passwords need to be matched !' })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={reset} disabled={isSigningUp} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
