import React from 'react';
const Menu = ({ category, selectMenu }) => {
  return (
    <label>
      <input
        className='mr-1'
        checked={category === 'ice'}
        name="veg-checkbox"
        type="checkbox"
        value={category}
        onChange={selectMenu}
      />
      冰品 Only
    </label>
  );
};

export default Menu;
