import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 1em;
  width: 90%;
  border: none;
  padding-left: 0.3em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
  color: #4b4b4b;
  ::placeholder {
    color: #b1b1b1;
  }
  background-color: #f0f0f0;
  :hover {
    cursor: text;
  }
  height: 3rem;
`;

export default StyledInput;
