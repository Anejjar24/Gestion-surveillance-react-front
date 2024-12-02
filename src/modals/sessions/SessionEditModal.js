import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { sessionService } from 'services/sessions/sessionService';

function SessionEditModal({ 
  show, 
  onClose, 
  onSessionUpdated, 
  initialSession 
}) {
  const [session, setSession] = useState({
    session_id: null,
    type: '',
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    if (initialSession) {
      setSession({
        ...initialSession,
        startDate: initialSession.startDate ? new Date(initialSession.startDate) : null,
        endDate: initialSession.endDate ? new Date(initialSession.endDate) : null
      });
    }
  }, [initialSession]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSession(prevSession => ({
      ...prevSession,
      [name]: value
    }));
  };

  const handleStartDateChange = (date) => {
    setSession(prevSession => ({
      ...prevSession,
      startDate: date
    }));
  };

  const handleEndDateChange = (date) => {
    setSession(prevSession => ({
      ...prevSession,
      endDate: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format dates to match backend expectation
      const formattedSession = {
        ...session,
        startDate: session.startDate ? session.startDate.toISOString().split('T')[0] : null,
        endDate: session.endDate ? session.endDate.toISOString().split('T')[0] : null
      };

      await sessionService.updateSession(formattedSession);
      onSessionUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating session:', error);
      // TODO: Add user-friendly error handling
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Session</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Session Type</Form.Label>
            <Form.Select 
              name="type"
              value={session.type}
              onChange={handleChange}
              required
            >
              <option value="">Select a session type</option>
              <option value="Winter regular">Winter regular</option>
              <option value="Spring regular">Spring regular</option>
              <option value="Winter makeup">Winter makeup</option>
              <option value="Spring makeup">Spring makeup</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <div>
              <DatePicker
                selected={session.startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Start date"
                showPopperArrow={false}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <div>
              <DatePicker
                selected={session.endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="End date"
                showPopperArrow={false}
              />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

SessionEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSessionUpdated: PropTypes.func.isRequired,
  initialSession: PropTypes.shape({
    session_id: PropTypes.number,
    type: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })
};

SessionEditModal.defaultProps = {
  initialSession: null
};

export default SessionEditModal;