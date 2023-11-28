import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

const FullPage = styled.div`
height: 100dvh;
background-color: var(--color-grey-50);
display: flex;
justify-content: center;
align-items: center;
`

const ProtectedRoute = ({ children }) => {
  const [isLoading, isAuth] = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuth) {
      navigate('/login');
    }
  }, [isAuth, isLoading, navigate]);

  if (isLoading) return <FullPage><Spinner /></FullPage>

  if(isAuth) return children;
}

export default ProtectedRoute
