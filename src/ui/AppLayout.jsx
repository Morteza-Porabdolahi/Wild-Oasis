import { Outlet } from "react-router-dom"
import styled from "styled-components"

import Header from "./Header"
import Sidebar from "./Sidebar"

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;

  @media only screen and (max-width: 480px) {
    padding: 3rem 2rem 4.4rem;
  }
`

const StyledAppLayout = styled.div`
display: grid;
height: 100vh;
grid-template-columns: 26rem 1fr;
grid-template-rows: auto 1fr;

@media (max-width: 791px) {
  grid-template-columns: 1fr;
}
`
const Container = styled.div`
max-width: 120rem;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 3.2rem;
`
const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
