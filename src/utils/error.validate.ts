import InputValidation from '@/models/input.validation';
import React from 'react';

const errorValidate = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setErrors: React.Dispatch<{ [key: string]: string }>,
  errors: { [key: string]: string },
  validations?: InputValidation[]
) => {
  const { name, value } = e.target;
  let newErrors: { [key: string]: string } = { ...errors };
  if (!value) {
    newErrors[name] = 'Is required';
  } else if (validations) {
    let regxError = '';
    validations.forEach((validation) => {
      if (!validation.regx.test(value)) {
        regxError = validation.message;
        return
      }
    })
    newErrors[name] = regxError;
  }
  else {
    newErrors[name] = '';
  }
  setErrors(newErrors);
};

export default errorValidate;