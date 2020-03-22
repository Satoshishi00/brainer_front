import React from "react";

const MakeLinkIfUrl = theString => {
  console.log("the string", theString);
  let array_tmp = theString.theString.split(" ");
  const regex = /^https:\/\//g;
  let str_reconstruction = "";
  let avant_link = "";
  let link = "";
  for (let i = 0; i < array_tmp.length; i++) {
    if (array_tmp[i].match(regex)) {
      link = array_tmp[i];
      avant_link = str_reconstruction;
      str_reconstruction = "";
      continue;
    }
    str_reconstruction += array_tmp[i] + " ";
  }
  return (
    <div>
      <p>
        {avant_link}
        <a href={link}>{link}</a>
        {str_reconstruction}
      </p>
    </div>
  );
};

export default MakeLinkIfUrl;
