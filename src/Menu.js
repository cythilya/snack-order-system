import React from 'react';
const Menu = ({ category, selectMenu }) => {
  return (
    <label>
      <input
        checked={category === 'ice'}
        name="veg-checkbox"
        type="checkbox"
        value={category}
        onChange={selectMenu}
      />
      {/* Ice Only */}
      冰品 Only
    </label>
  );
};

export default Menu;
