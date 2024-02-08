import React from 'react';
import Item from './Item';

const PureSnackList = ({ list }) => {
  console.log('SnackList Re-Render');

  return (
    <ul className="menu-list">
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default React.memo(PureSnackList);
