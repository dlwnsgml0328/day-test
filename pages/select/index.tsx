import React, { useState } from 'react';
import timeZones from '../../components/TimeZonesReal/tmz_formatted.json';

const options = timeZones;

const Select: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.target;

    setSelectedOption(options[selectedIndex - 1].key);

    // Do something with the selected option...
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value=''>Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option.key}>
          {option.key}
        </option>
      ))}
    </select>
  );
};

export default Select;
