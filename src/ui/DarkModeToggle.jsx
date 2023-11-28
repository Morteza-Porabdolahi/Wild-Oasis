import { useThemeContext } from '../context/ThemeContext';
import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  )
}

export default DarkModeToggle
