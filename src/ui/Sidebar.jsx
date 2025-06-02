import styled from "styled-components"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
//import Uploader from "../data/Uploader";

import Logo from './Logo';
import MainNav from './MainNav';

import HamburgerIcon from "./HamburgerIcon"
import { HiBars4 } from "react-icons/hi2"

const StyledSidebar = styled.aside`
background-color: var(--color-grey-0);
padding: 3.2rem 2.4rem;
border-right: 1px solid var(--color-grey-100);
grid-row: 1/-1;
display: flex;
flex-direction: column;
gap: 3rem;
overflow: hidden;

@media only screen and (max-width: 791px) {
position: fixed;
z-index: 1;
top: 1.5rem;
left: 1.5rem;
bottom: 1.5rem;
border-radius: 1.5rem;
box-shadow: 1px 1px 1rem var(--color-grey-50);
padding: 1.2rem;
width: 25rem;
transition: all .2s;

${props => props.$isOpen ? '' : `
width: 5rem;
height: 5rem;
top: .3rem;
background: none;
box-shadow: none;
border-right: 0;
`}
}
`
const Sidebar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false);
  }, [location])
  
  
  return (
    <StyledSidebar $isOpen={isOpen}>
      <HamburgerIcon onClick={() => setIsOpen(!isOpen)}>
        <HiBars4 />
      </HamburgerIcon>
      <Logo />
      <MainNav />
      {/*<Uploader />*/}
    </StyledSidebar>
  )
}

export default Sidebar
