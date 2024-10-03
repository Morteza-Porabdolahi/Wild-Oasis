import styled from "styled-components";

const HamburgerIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  align-self: start;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }

  @media only screen and (min-width: 791px) {
    display: none;
  }
`;

export default HamburgerIcon;
