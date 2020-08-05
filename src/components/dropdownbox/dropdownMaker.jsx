//Making a custom hook that could be used to create dropdown boxes.
import styles from "./dropdown.css";
import React, { useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

//Label is the name of the dropdown e.g. country
//defaultState represents the default state of the hook
//e.g. [country, setCountry] = useState('');
//options in case of dropdown is usually an iterabe e.g., a list of countries.
const useDropDown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);

  const DropDownMaker = () => (
    <FormControl className={styles.formControl}>
      <label htmlFor={label}>
        {label}
        <NativeSelect
          id={label}
          value={state}
          onChange={e => setState(e.target.value)}
          disabled={!options.length}
        >
          {options.map((item) => 
            <option key={item} value={item}>
              {item}
            </option>
          )}
        </NativeSelect>
      </label>
    </FormControl>
  );
  return [state, DropDownMaker, setState];
};

export default useDropDown;
