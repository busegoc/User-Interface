import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import api from '../services/api';
import './style.css';

const ITEMS_PER_PAGE = 3;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getUsers(currentPage);
        const totalUsers = response.data.data;
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIdx = startIdx + ITEMS_PER_PAGE;
        const usersToShow = totalUsers.slice(startIdx, endIdx);

        setUsers(usersToShow);
        setTotalPages(Math.ceil(totalUsers.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <div className='header'>
        <h2 className='user-list'>User List</h2>
      </div>

      <Row className='justify-content-center text-center'>
        {users.map((user) => (
          <Col key={user.id} xs={6} sm={4} md={4} lg={2} className='mb-4'>
            <Card>
              <Card.Img variant='top' src={user.avatar} />
              <Card.Body>
                <Card.Title>
                  {user.first_name} {user.last_name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className='mt-3'>
        <Col className='d-flex justify-content-center'>
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
