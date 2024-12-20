// ModuleDeleteModal.jsx
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { ModuleService } from 'services/modules/ModuleService';

function ModuleDeleteModal({
  show,
  onClose,
  onConfirmDelete,
  moduleToDelete
}) {
  const handleConfirmDelete = () => {
    if (moduleToDelete) {
      onConfirmDelete(moduleToDelete.id);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmer la Suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer le module {moduleToDelete?.nom} ?
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

ModuleDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  moduleToDelete: PropTypes.object
};

export default ModuleDeleteModal;