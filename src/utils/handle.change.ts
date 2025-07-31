import React from 'react';

function setNestedValue<T extends Record<string, any>>(obj: T, path: string[], value: any): T {
  if (path.length === 0) {
    return value;
  }

  const [head, ...rest] = path;
  const newObj:any = { ...obj };

  newObj[head] = (typeof newObj[head] === 'object' && newObj[head] !== null)
    ? setNestedValue(newObj[head], rest, value)
    : setNestedValue({}, rest, value);

  return newObj;
}

const handleChange = <T extends Record<string, any>>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;

  const path = name.split('.');

  setFormData(prev => {
    return setNestedValue(prev, path, value);
  });
};

export default handleChange;