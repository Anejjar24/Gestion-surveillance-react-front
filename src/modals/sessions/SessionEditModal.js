import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sessionService } from 'services/sessions/sessionService';

function SessionEditModal({ show, onClose, onSessionUpdated, initialSession }) {
    const [session, setSession] = useState({
        session_id: '',
        type: '',
        startDate: null,
        endDate: null,
        debutMatin1: '08:30',
        finMatin1: '10:15',
        debutMatin2: '10:30',
        finMatin2: '12:15',
        debutSoir1: '13:30',
        finSoir1: '15:15',
        debutSoir2: '15:30',
        finSoir2: '17:15'
    });

    useEffect(() => {
        if (initialSession) {
            setSession({
                ...initialSession,
                // Convert string dates to Date objects for DatePicker
                startDate: initialSession.startDate ? new Date(initialSession.startDate) : null,
                endDate: initialSession.endDate ? new Date(initialSession.endDate) : null
            });
        }
    }, [initialSession]);

    const handleSessionChange = (e) => {
        setSession(prev => ({
            ...prev,
            type: e.target.value
        }));
    };

    const handleStartDateChange = (date) => {
        setSession(prev => ({
            ...prev,
            startDate: date
        }));
    };

    const handleEndDateChange = (date) => {
        setSession(prev => ({
            ...prev,
            endDate: date
        }));
    };

    const handleTimeChange = (field, value) => {
        setSession(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Prepare the session data for update
            const updatedSession = {
                ...session,
                // Ensure session_id is included and matches the backend expectation
                session_id: session.session_id,
                // Format dates as strings in YYYY-MM-DD format
                startDate: session.startDate ? 
                    `${session.startDate.getFullYear()}-${String(session.startDate.getMonth() + 1).padStart(2, '0')}-${String(session.startDate.getDate()).padStart(2, '0')}` : 
                    null,
                endDate: session.endDate ? 
                    `${session.endDate.getFullYear()}-${String(session.endDate.getMonth() + 1).padStart(2, '0')}-${String(session.endDate.getDate()).padStart(2, '0')}` : 
                    null
            };

            // Call the service with the complete session object
            await sessionService.updateSession({
                ...updatedSession,
                id: updatedSession.session_id // Ensure id is included for the API endpoint
            });
            
            onSessionUpdated();
            onClose();
        } catch (error) {
            console.error('Error updating session:', error);
            // Add user-friendly error handling
            alert('Failed to update session. Please try again.');
        }
    };

    // Rest of the component remains the same...
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Session selection */}
                <div className="mb-3">
                    <label htmlFor="session" className="form-label">Session type</label>
                    <select 
                        id="session" 
                        className="form-control" 
                        value={session.type} 
                        onChange={handleSessionChange}
                    >
                        <option value="">Select a session</option>
                        <option value="Winter regular">Winter regular</option>
                        <option value="Spring regular">Spring regular</option>
                        <option value="Winter makeup">Winter makeup</option>
                        <option value="Spring makeup">Spring makeup</option>
                    </select>
                </div>

                {/* Date selection */}
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date range</label>
                    <div className="d-flex gap-3">
                        <div className="flex-fill">
                            <DatePicker
                                selected={session.startDate}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                placeholderText="Start date"
                                showPopperArrow={false}
                            />
                        </div>
                        <div className="flex-fill">
                            <DatePicker
                                selected={session.endDate}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                placeholderText="End date"
                                showPopperArrow={false}
                            />
                        </div>
                    </div>
                </div>

                {/* Morning times */}
                <div className="mb-3">
                    <label htmlFor="morningTimes" className="form-label">Morning Session Times</label>
                    <div className="d-flex gap-3">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.debutMatin1}
                            onChange={(e) => handleTimeChange('debutMatin1', e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.finMatin1}
                            onChange={(e) => handleTimeChange('finMatin1', e.target.value)}
                        />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.debutMatin2}
                            onChange={(e) => handleTimeChange('debutMatin2', e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.finMatin2}
                            onChange={(e) => handleTimeChange('finMatin2', e.target.value)}
                        />
                    </div>
                </div>

                {/* Evening times */}
                <div className="mb-3">
                    <label htmlFor="eveningTimes" className="form-label">Evening Session Times</label>
                    <div className="d-flex gap-3">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.debutSoir1}
                            onChange={(e) => handleTimeChange('debutSoir1', e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.finSoir1}
                            onChange={(e) => handleTimeChange('finSoir1', e.target.value)}
                        />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.debutSoir2}
                            onChange={(e) => handleTimeChange('debutSoir2', e.target.value)}
                        />
                        <input
                            type="time"
                            className="form-control form-control-sm"
                            value={session.finSoir2}
                            onChange={(e) => handleTimeChange('finSoir2', e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
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
        endDate: PropTypes.string,
        debutMatin1: PropTypes.string,
        finMatin1: PropTypes.string,
        debutMatin2: PropTypes.string,
        finMatin2: PropTypes.string,
        debutSoir1: PropTypes.string,
        finSoir1: PropTypes.string,
        debutSoir2: PropTypes.string,
        finSoir2: PropTypes.string
    })
};

export default SessionEditModal;