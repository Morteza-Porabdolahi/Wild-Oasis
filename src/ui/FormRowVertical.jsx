import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  gap: 1.3rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRowVertical = ({ label, error, children }) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>
      }
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRowVertical
