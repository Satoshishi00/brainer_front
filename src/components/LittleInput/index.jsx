import React from "react";
import StyledInput from "./StyledInput";

const LittleInput = ({ update, ...rest }) => (
  <div>
    <StyledInput onChange={e => update(e, e.target || {})} {...rest} />
  </div>
);

export default LittleInput;
