import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      @media only screen and (max-width: 382px) {
        padding: 2rem 2rem;
      }

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      min-width: 21rem;
    `}
    
  font-size: 1.4rem;
  margin-top: 2rem;
`;

Form.defaultProps = {
  type: 'regular',
}

export default Form;
