import React from "react";

const FormRowSelect = ({ name, value, handleChange, labelText, list = [] }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        className={"form-select"}
        value={value}
        name={name}
        onChange={handleChange}
      >
        {list.map((itemValue, index) => (
          <option value={itemValue} key={index}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
