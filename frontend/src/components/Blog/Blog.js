import React, { useEffect } from "react";

export default function Blog() {
  useEffect(() => {
    alert("Blog page loaded");
  }, []);
  return <h2>Blog Page</h2>;
}
