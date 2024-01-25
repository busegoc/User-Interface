import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import api from '../services/api';
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', job: '' });
  const [formResponse, setFormResponse] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    api.createUser(formData)
      .then(response => {
        setFormResponse(response.data);
        toast.success("User Created!");
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        toast.error("An error occurred while creating the user.");
      });
  };

  return (
    <Row className="mb-4">
      <Col className="d-flex justify-content-center">
        <Card style={{ width: '60rem' }}>
          <Card.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formJob">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your job"
                  value={formData.job}
                  onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                />
              </Form.Group>
              <div className='button'>
                <Button className='mt-3' variant="primary" type="submit">Submit</Button>
              </div>
            </Form>
          </Card.Body>
          {formResponse && (
            <Card.Footer>
              <p>ID: {formResponse.id}</p>
              <p>Name: {formResponse.name}</p>
              <p>Job: {formResponse.job}</p>
              <p>Created At: {formatDate(formResponse.createdAt)}</p>
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default UserForm;
