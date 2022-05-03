import React, { FunctionComponent, useEffect, useState } from 'react';
import Header from './Header';
import { Head, ToggleSwitchBar } from '@basics';
import { HouseCardList } from '@components';
import {useShowPostType, setShowPostType} from '@redux/slices/post';
import { useDispatch } from 'react-redux';

const Housing: FunctionComponent = () => {
  const showPostType = useShowPostType();
  const dispatch = useDispatch();
  return (
    <>
      <Head title="Housing" />

      <div className="px-md-0 pb-3 px-3">
        <Header />
      </div>

      <div className="px-md-0 px-3 pb-3 d-flex justify-content-center justify-content-md-start">
        <ToggleSwitchBar
          leftText="Leasing Office"
          rightText="Subleases by Students"
          onSwitchLeft={() => {
            dispatch(setShowPostType('landlord'));
          }}
          onSwitchRight={() => {
            dispatch(setShowPostType('student'));
          }}
          defaultRight={showPostType === 'student'}
        />
      </div>

      <div>
        <HouseCardList postType={showPostType} />
      </div>
    </>
  );
};

export default Housing;
