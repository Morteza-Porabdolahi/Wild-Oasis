import { useEffect, useRef } from "react";

const useOutsideClick = (close, listenCaptuting = true) => {
  const ref = useRef();
  
  useEffect(() => {
    function handleClick(e) {
      if(ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    
    document.addEventListener('click', handleClick, listenCaptuting);

    return () => {
      document.removeEventListener('click', handleClick, listenCaptuting);
    }
    
  }, [close]);
  
  return [ref];
}

export default useOutsideClick;
