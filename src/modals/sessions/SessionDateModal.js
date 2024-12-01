import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';  // Importation de react-datepicker
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer Bootstrap CSS
import { sessionService } from 'services/sessions/sessionService';
function SessionDateModal({ show, onClose, onSessionAdded }) {
    const [selectedSession, setSelectedSession] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const handleSessionChange = (e) => {
      setSelectedSession(e.target.value);
    };
  
    const handleStartDateChange = (date) => setStartDate(date);
    const handleEndDateChange = (date) => setEndDate(date);
  
    const handleSave = async () => {
      try {
        // Format dates to match backend expectation (assuming ISO format)
        const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
  
        // Create session object
        const newSession = {
          type: selectedSession,
          startDate: formattedStartDate,
          endDate: formattedEndDate
        };
  
        // Call service to add session
        const addedSession = await sessionService.addSession(newSession);
  
        // Notify parent component
        onSessionAdded(addedSession);
  
        // Close modal
        onClose();
  
        // Reset form
        setSelectedSession('');
        setStartDate(null);
        setEndDate(null);
      } catch (error) {
        console.error('Error adding session:', error);
        // TODO: Add user-friendly error handling
      }
    };
  
    return (
 
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Session selection */}
        <div className="mb-3">
          <label htmlFor="session" className="form-label">Select session type</label>
          <select id="session" className="form-control" value={selectedSession} onChange={handleSessionChange}>
            <option value="">Select a session</option>
            <option value="Winter regular">Winter regular</option>
            <option value="Spring regular">Spring regular</option>
            <option value="Winter makeup">Winter makeup</option>
            <option value="Spring makeup">Spring makeup</option>
          </select>
        </div>

        {/* Date selection */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Select date range</label>
          <div className="d-flex gap-3">
            <div className="flex-fill">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Start date"
                showPopperArrow={false}
              />
            </div>
            <div className="flex-fill">
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="End date"
                showPopperArrow={false}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
SessionDateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSessionAdded: PropTypes.func.isRequired,
};

SessionDateModal.defaultProps = {
  show: false,
};

export default SessionDateModal;