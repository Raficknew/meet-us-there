import { useEffect, useState } from "react";
import "./App.css";
import { axiosInstance } from "./lib/api/axios";

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   axiosInstance
  //     .get("/api/rest/v1/data")
  //     .then((response) => setData(response.data));
  // }, []);

  return <div>Data: Data</div>;
}

export default App;
