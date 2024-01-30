import React, { useEffect, useState } from 'react';
const Menu = ({ category, selectMenu }) => {
  return (
    <label>
      <input
        type="checkbox"
        name="veg-checkbox"
        value={category}
        checked={category === 'ice'}
        onChange={selectMenu}
      />
      {/* Ice Only */}
      冰品 Only
    </label>
  );
};

export default Menu;
