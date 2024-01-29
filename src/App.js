import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from './redux';
import SnackList from './SnackList';
import Message from './Message';
import Payment from './Payment';
import Menu from './Menu';
import { loadSnackData } from './utils';

export default function App() {
  const category = useSelector((state) => state.category);
  const orderStatus = useSelector((state) => state.orderStatus);
  const dispatch = useDispatch();

  const stateAPIStatus = useLoadSnackData();
  const snackList = useSelector(selectorMenu, shallowEqual);

  useEffect(() => {
    console.log('SERVER_EVENT: snack list changed');
  }, [snackList]);

  function selectMenu() {
    dispatch({
      type: ACTIONS.CHANGE_SNACKS,
    });
  }

  return (
    <div className="snack-app">
      <header>
        <h1>夏天有點甜 點餐系統</h1>
        <Menu category={category} selectMenu={selectMenu} />
      </header>
      {
        orderStatus === 'done' && <div>
          點餐成功！
        </div>
      }
      {
        orderStatus === 'idle' && <>
          <Message status={stateAPIStatus} />
          {stateAPIStatus === 'success' && (
            <>
              <SnackList list={snackList} />
              <Payment />
            </>
          )}
        </>
      }
    </div>
  );
}

function useLoadSnackData() {
  const [stateAPIStatus, setAPIStatus] = useState('idle');
  const dispatch = useDispatch();

  useEffect(() => {
    setAPIStatus('loading');
    loadSnackData()
      .then((data) => {
        dispatch({
          type: ACTIONS.LOAD_SNACKS,
          payload: {
            menu: data,
          },
        });
        setAPIStatus('success');
      })
      .catch((error) => {
        setAPIStatus('error');
      });
  }, [dispatch]);

  return stateAPIStatus;
}

function selectorMenu(state) {
  const { category, menuIdList, menuById } = state;

  const menuId = menuIdList[category];
  const list = [];

  menuId.forEach((id) => {
    list.push(menuById[id]);
  });

  return list;
}
