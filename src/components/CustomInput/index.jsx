import React from "react";
import StyledInput from "./StyledInput";

const CustomInput = ({ update, ...rest }) => (
  <div className="bbb">
    <StyledInput onChange={e => update(e, e.target || {})} {...rest} />
  </div>
);

export default CustomInput;
