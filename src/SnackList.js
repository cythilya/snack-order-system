import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import { ACTIONS } from './redux';

function PureSnackList(props) {
  console.log('SnackList Re-Render');
  const { list } = props;
  return (
    <ul className="menu-list">
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default React.memo(PureSnackList);

