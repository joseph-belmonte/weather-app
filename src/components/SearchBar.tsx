import React from 'react';

interface SearchBarProps {
  location: string;
  setLocation: (location: string) => void;
}

const SearchBar = ({ location, setLocation }: SearchBarProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setLocation(event.currentTarget.value);
    }
  };

  return (
    <div>
      <div className='input-bar'>
        <label htmlFor="location"> Update Location: </label>
        <input
          type="search"
          name="location"
          id="location"
          placeholder="New York, NY"
          onKeyDownCapture={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SearchBar;
