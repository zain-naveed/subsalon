import React, { useState } from "react";
import Select from "react-select";
import { jobType } from "../../../Shared";

function MySelection({
  formikField,
  form,
  setForm,
  value,
  error,
  touched,
  setJobsty,
  jobsty,
}) {
  const [selectedOption, setSelectedOption] = useState(jobType.fullTime);
  const options = [
    { value: jobType.fullTime, label: "Full Time" },
    { value: jobType.partTime, label: "Part Time" },
  ];

  const dropSelect = (e, setFieldValue) => {
    setSelectedOption(e.value);
    setJobsty(e.value);
 
    
  };
  

  return (
    <div>
      <Select
        // className="iptAuth ts"
        className="selection_Side"
        aria-label="Default select example dropPro"
        name="jobtype"
        value={options.filter((optn) => {
          return optn.value === selectedOption;
        })}
        options={options}
        onChange={(e) => {
          dropSelect(e);
        }}
      />
    </div>
  );
}

export default MySelection;
