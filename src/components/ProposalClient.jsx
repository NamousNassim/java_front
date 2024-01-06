import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';

const ProposalClient = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:9081/dukes-data/api/users/client/${clientId}`)
      .then(response => setClient(response.data))
      .catch(error => console.error(error));
  }, [clientId]);

  const handleSendClick = () => {
    if (message.trim() !== '') {
      setShowModal(true);
      setSubject('');
      setMessage('');
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
        
      <Row className="justify-content-md-center">
        <Col md="8">
          <h2 className="text-center">Contact {client && client.user.name}</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={client && client.user.email} disabled />
            </Form.Group>

            <Form.Group controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter subject" value={subject} onChange={e => setSubject(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter message" value={message} onChange={e => setMessage(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={handleSendClick}>
              Send
            </Button>
          </Form>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Email Sent</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your message has been sent!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default ProposalClient;