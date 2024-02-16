"use client";
const error = (error: Error) => {
  return <div>{error?.message}</div>;
};

export default error;
