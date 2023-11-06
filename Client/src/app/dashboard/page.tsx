"use client";
import React from "react";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";

const ECommerce: React.FC = () => {
  return (
    <>
    <h1>Dashboard</h1>
    </>
  );
};

export default ECommerce;
