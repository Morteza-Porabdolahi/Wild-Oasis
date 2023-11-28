import styled from "styled-components";
import { useThemeContext } from "../context/ThemeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useThemeContext();
  
  return (
    <StyledLogo>
      <Img src={!isDarkMode ? "/logo-light.png" : "/logo-dark.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
