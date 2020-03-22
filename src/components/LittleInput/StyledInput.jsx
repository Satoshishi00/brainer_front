import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 1.3em;
  width: 100%;
  border: none;
  border-radius: 5px;
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
  color: #4b4b4b;
  background-color: #f0f0f0;
  ::placeholder {
    color: #b1b1b1;
  }
  :hover {
    cursor: text;
  }
  height: 2.5rem;
`;

export default StyledInput;
