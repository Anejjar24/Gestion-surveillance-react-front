import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { EnseignantService } from 'services/professors/enseignantService';

function EnseignantDeleteModal({ 
  show, 
  onClose, 
  onConfirmDelete, 
  enseignantToDelete 
}) {
  const handleConfirmDelete = () => {
    if (enseignantToDelete) {
      onConfirmDelete(enseignantToDelete.id);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmer la Suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer l enseignant {enseignantToDelete?.nom} {enseignantToDelete?.prenom} ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

EnseignantDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  enseignantToDelete: PropTypes.object
};

export default EnseignantDeleteModal;