import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
function OptionDeleteModal({ show, onClose, onConfirmDelete, optionToDelete }) {
    const handleConfirmDelete = () => {
      if (optionToDelete) {
        onConfirmDelete(optionToDelete.id);
        onClose();
      }
    };
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this option?</p>
          {optionToDelete && (
            <div>
              <p><strong>Name:</strong> {optionToDelete.nom}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Confirm Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  OptionDeleteModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirmDelete: PropTypes.func.isRequired,
    optionToDelete: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired
    })
  };
  
  OptionDeleteModal.defaultProps = {
    optionToDelete: null
  };
  export default OptionDeleteModal ;