import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DepartmentService } from 'services/dapartments/departmentService';

function DepartmentDeleteModal({ 
  show, 
  onClose, 
  onConfirmDelete, 
  departmentToDelete 
}) {
  const handleConfirmDelete = () => {
    if (departmentToDelete) {
      onConfirmDelete(departmentToDelete.id);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this department?</p>
        {departmentToDelete && (
          <div>
            <p><strong>Name:</strong> {departmentToDelete.nom}</p>
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

DepartmentDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  departmentToDelete: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired
  })
};

DepartmentDeleteModal.defaultProps = {
  departmentToDelete: null
};

export default DepartmentDeleteModal;