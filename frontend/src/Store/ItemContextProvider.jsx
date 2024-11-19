import React, { useContext, useState, useEffect } from "react"; // Correct import at the top
import itemContext, { jobContext } from "./store";
import jobs from "@/jobs"; // Static job data fallback

export default function ItemContextProvider({ children }) {
  // Initialize state variables
  let [items, setItems] = useState([]);
  let [filteritems, setFilteritems] = useState([]);
  let [keyword, setKeyword] = useState([]);
  let [location, setLocation] = useState([]);
  let [jobtype, setJobtype] = useState([]);
  let [salary, setSalary] = useState("");
  let [user, setUser] = useState(null);

  // Access jobs from jobContext
  const { jobs: contextJobs } = useContext(jobContext);

  // Set items and filteritems based on contextJobs or fallback to static data
  useEffect(() => {
    if (contextJobs && contextJobs.length > 0) {
      setItems(contextJobs); // Set state to jobs from context
      setFilteritems(contextJobs); // Set filtered items from context jobs
    } else {
      setItems(jobs); // Fallback to imported static jobs
      setFilteritems(jobs); // Set filtered items to static jobs
    }
  }, [contextJobs]); // Re-run whenever contextJobs changes

  console.log(keyword, location);

  // Function to apply filter based on keyword and location
  function applyfilter(keyword, location) {
    console.log(location, keyword);
    let newItem = items.filter((item) => {
      let locationMatch =
        item.location.toLowerCase() === location.toLowerCase();
      let keywordMatch = item.keyword.includes(keyword);

      return locationMatch && keywordMatch;
    });
    setFilteritems(newItem);
  }

  // Function to apply multiple filters
  function filterfunc() {
    let newitem = items.filter((item) => {
      let jobtypeMatch = jobtype.length
        ? jobtype.includes(item.employmentType)
        : true;
      let locationMatch = location.length
        ? location.includes(item.location)
        : true;

      let salaryMatch = salary ? item.salary > salary : true;
      let keywordMatch1 = keyword.length
        ? keyword.some((el) => item.keyword.includes(el))
        : true;

      return jobtypeMatch && salaryMatch && locationMatch && keywordMatch1;
    });
    setFilteritems(newitem);
  }

  return (
    <itemContext.Provider
      value={{
        user,
        setUser,
        items,
        setItems,
        filteritems,
        setFilteritems,
        applyfilter,
        keyword,
        setKeyword,
        location,
        setLocation,
        jobtype,
        setJobtype,
        salary,
        setSalary,
        filterfunc,
      }}
    >
      {children}
    </itemContext.Provider>
  );
}
