"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  let router = useRouter();
  return (
    <button className={"btn btn-primary"} onClick={() => router.push("/users")}>
      Create
    </button>
  );
};

export default NewUserPage;
