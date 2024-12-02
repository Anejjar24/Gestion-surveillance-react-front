import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

function SessionDeleteModal({ 
  show, 
  onClose, 
  onConfirmDelete, 
  sessionToDelete 
}) {
  const handleConfirmDelete = () => {
    if (sessionToDelete) {
      onConfirmDelete(sessionToDelete.session_id);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this session?</p>
        {sessionToDelete && (
          <div>
            <p><strong>Type:</strong> {sessionToDelete.type}</p>
            <p><strong>Start Date:</strong> {sessionToDelete.startDate}</p>
            <p><strong>End Date:</strong> {sessionToDelete.endDate}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

SessionDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  sessionToDelete: PropTypes.shape({
    session_id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
  })
};

SessionDeleteModal.defaultProps = {
  sessionToDelete: null
};

export default SessionDeleteModal;