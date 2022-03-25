import { useLandlordRoomIds, useStudentRoomIds } from '@hooks';
import { loading } from '@icons';
import React, { FunctionComponent } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { HouseCardLandLord, HouseCardStudent } from './HouseCard';
import styles from './HouseCardList.module.scss';

export type PostingType = 'landlord' | 'student';
interface BrowsingListProps {
  numListingsShown?: number;
}

export type displayType = 'layout' | 'all';
interface HouseCardListUIProps {
  roomIds: number[];
  postType: PostingType;
}

const HouseCardListUI: FunctionComponent<HouseCardListUIProps> = ({
  roomIds,
  postType,
}) => {
  const HouseCard =
    postType === 'student' ? HouseCardStudent : HouseCardLandLord;
  return (
    <Container fluid className="px-md-0">
      <Row className={styles.cardRow}>
        {roomIds.map((roomId) => (

          <Col xs={12} lg={6} className={styles.cardColumn}>

            <HouseCard roomId={roomId} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export const BrowsingLandlordList: FunctionComponent<BrowsingListProps> = ({
  numListingsShown,
}) => {
  const { data: roomIds, error } = useLandlordRoomIds();
  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return (
    <HouseCardListUI
      roomIds={numListingsShown ? roomIds.slice(0, numListingsShown) : roomIds}
      postType="landlord"
    />
  );
};

export const BrowsingStudentList: FunctionComponent<BrowsingListProps> = ({
  numListingsShown,
}) => {
  const { data: roomIds, error } = useStudentRoomIds();
  if (error) {
    return <div>Error occurred. Please reload the page.</div>; // TODO use a popup instead...
  }

  if (!roomIds) {
    return <img className="w-100 h-100" src={loading} alt="loading..." />;
  }

  return (
    <HouseCardListUI
      roomIds={numListingsShown ? roomIds.slice(0, numListingsShown) : roomIds}
      postType="student"
    />
  );
};


const BrowsingList: FunctionComponent<{


  postType: PostingType;
  numListingsShown?: number;
}> = ({ postType, numListingsShown }) => {
  return (
    <>
      {postType === 'student' ? (
        <BrowsingStudentList numListingsShown={numListingsShown} />
      ) : (
        <BrowsingLandlordList numListingsShown={numListingsShown} />
      )}
    </>
  );
};

export default BrowsingList;
