import React from "react";
import { Audio } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <Audio
      height="80"
      width="80"
      //radius="9"
      color="green"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
