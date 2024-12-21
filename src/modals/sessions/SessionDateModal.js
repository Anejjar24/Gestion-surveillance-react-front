import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported
import { sessionService } from 'services/sessions/sessionService';

function SessionDateModal({ show, onClose, onSessionAdded }) {
    const [selectedSession, setSelectedSession] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Time fields for morning and evening sessions
    const [debutMatin1, setDebutMatin1] = useState('08:30');
    const [finMatin1, setFinMatin1] = useState('10:15');
    const [debutMatin2, setDebutMatin2] = useState('10:30');
    const [finMatin2, setFinMatin2] = useState('12:15');
    const [debutSoir1, setDebutSoir1] = useState('13:30');
    const [finSoir1, setFinSoir1] = useState('15:15');
    const [debutSoir2, setDebutSoir2] = useState('15:30');
    const [finSoir2, setFinSoir2] = useState('17:15');

    const handleSessionChange = (e) => {
        setSelectedSession(e.target.value);
    };

    const handleStartDateChange = (date) => setStartDate(date);
    const handleEndDateChange = (date) => setEndDate(date);

    const handleSave = async () => {
        try {
            // Create session object
            const newSession = {
                type: selectedSession,
                startDate: startDate ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` : null,
                endDate: endDate ? `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}` : null,
                debutMatin1, finMatin1, debutMatin2, finMatin2,
                debutSoir1, finSoir1, debutSoir2, finSoir2
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

                {/* Time selection for morning and evening */}
                <div className="mb-3">
                    <label htmlFor="morningTimes" className="form-label">Morning Session Times</label>
                    <div className="d-flex gap-3">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={debutMatin1}
                            onChange={(e) => setDebutMatin1(e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={finMatin1}
                            onChange={(e) => setFinMatin1(e.target.value)}
                        />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={debutMatin2}
                            onChange={(e) => setDebutMatin2(e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={finMatin2}
                            onChange={(e) => setFinMatin2(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="eveningTimes" className="form-label">Evening Session Times</label>
                    <div className="d-flex gap-3">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={debutSoir1}
                            onChange={(e) => setDebutSoir1(e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={finSoir1}
                            onChange={(e) => setFinSoir1(e.target.value)}
                        />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={debutSoir2}
                            onChange={(e) => setDebutSoir2(e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={finSoir2}
                            onChange={(e) => setFinSoir2(e.target.value)}
                        />
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
