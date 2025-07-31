import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SortArrowSpan from './sort.arrow';

interface CountryOption {
  code: string;
  dial_code: string;
  flag_svg_url: string; // Assuming you have SVG URLs
  name: string;
}

const CustomSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 150px; 
`;

const SelectTrigger = styled.div`
  display: flex;
  padding: 12px 10px;
  cursor: pointer;  

  img {
    width: 20px;
    height: auto;
    margin-right: 10px;
    border-radius: 2px;
  }
`;

const OptionsList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: ${props => (props.$isOpen ? 'block' : 'none')};
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }

  img {
    width: 20px;
    height: auto;
    margin-right: 10px;
    border-radius: 2px;
  }
`;

export default function PhoneInputComponent({ options, value, onSelect, name }: {
    options: any[];
    value: string;
    onSelect: CallableFunction;
    name: string;
}){
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.phone_code === value) || options[0];
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (e: any, optionValue: string) => {
    onSelect(e, optionValue);
    setIsOpen(false);
  };

  return (
    <CustomSelectWrapper ref={wrapperRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)} role="combobox" aria-haspopup="listbox" aria-expanded={isOpen}>
        {selectedOption && (
          <img src={selectedOption.flag_url} alt={selectedOption.phone_code} />
        )}
        {selectedOption ? selectedOption.phone_code : 'Select...'}
        <SortArrowSpan $direction={'desc'}>&#9660;</SortArrowSpan>
      </SelectTrigger>
      <OptionsList $isOpen={isOpen} role="listbox">
        {options.map((option, index) => (
          <OptionItem
            key={index}
            onClick={() => handleOptionClick({target: {name, value: option.phone_code}}, option.phone_code)}
            role="option"
            aria-selected={option.phone_code === value}
          >
            <img src={option.flag_url} alt={option.phone_code} />
            {option.phone_code}
          </OptionItem>
        ))}
      </OptionsList>
      <input type="hidden" name={name} value={value} />
    </CustomSelectWrapper>
  );
};
