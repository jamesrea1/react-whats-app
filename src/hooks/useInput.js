import { useState } from 'react';

function useInput(initialValue = '', type = 'text') {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  //const reset = () => setValue('');
  const setValueOnly = (value = '') => {
    setValue(value, type);
  };

  return {
    attrs: {
      type,
      value,
      onChange,
    },
    type,
    value,
    onChange,
    setValue: setValueOnly,
  };
}

export default useInput;
