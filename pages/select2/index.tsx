import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const MySelect = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find((option) => option.value === selectedValue);
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <label htmlFor='mySelect'>Select an option:</label>
      <select id='mySelect' value={selectedOption?.value || ''} onChange={handleSelectChange}>
        <option value=''>-- Select an option --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div>
          <p>Selected option: {selectedOption.label}</p>
          <p>Click an option to select it:</p>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption.value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySelect;
