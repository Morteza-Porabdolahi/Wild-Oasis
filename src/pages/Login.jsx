import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;

const LoginInnerLayout = styled.main`
  max-width: 55rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Login() {
  return <LoginLayout>
    <LoginInnerLayout>
      <Logo />
      <Heading as="h4">Log in to your account </Heading>
      <LoginForm />
    </LoginInnerLayout>
  </LoginLayout>;
}

export default Login;
