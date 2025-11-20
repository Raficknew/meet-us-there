import { useEffect } from "react";

export default function LoadingPage() {
  useEffect(() => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    console.log(params);
  }, []);
  return <div>Loading...</div>;
}
