import React, { useEffect, useState } from "react";
import { jobContext } from "./store";

export default function JobContextProvider({ children }) {
  let [jobs, setJobs] = useState([]);
  let [singleJob, setSingleJob] = useState([]);
  let [searchName, setSearchName] = useState("");
  let [filter, setFilter] = useState([]);
  useEffect(() => {
    let newarray = jobs.filter((item) => {
      let newitem = item.title.toLowerCase().includes(searchName);
      return newitem;
    });
    setFilter(newarray);
  }, [searchName, jobs]);

  return (
    <jobContext.Provider
      value={{
        jobs,
        setJobs,
        singleJob,
        setSingleJob,
        searchName,
        setSearchName,
        filter,
      }}
    >
      {children}
    </jobContext.Provider>
  );
}
