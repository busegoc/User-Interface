import React, { useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import api from '../services/api';

const SingleUser = () => {
  const [singleUser, setSingleUser] = useState(null);

  const fetchSingleUser = () => {
    api.getSingleUser(2)
      .then(response => setSingleUser(response.data.data))
      .catch(error => console.error('Error fetching single user:', error));
  };

  return (
    <Row className="mb-4">
      <Col className="d-flex justify-content-center">
        {singleUser && (
          <Card style={{ width: '18rem', marginTop: '1rem' }}>
            <Card.Img variant="top" src={singleUser.avatar} />
            <Card.Body>
              <Card.Title>{singleUser.first_name} {singleUser.last_name}</Card.Title>
            </Card.Body>
          </Card>
        )}
       
      </Col>
      <div className="mt-3 button">
          <Button variant="primary" onClick={fetchSingleUser}>Search Single User</Button>
        </div>
    </Row>
  );
};

export default SingleUser;
