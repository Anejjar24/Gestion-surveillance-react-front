import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

function LocalDeleteModal({    
  show,    
  onClose,    
  onConfirmDelete,    
  localToDelete  
}) {
  const handleConfirmDelete = () => {
    if (localToDelete) {
      onConfirmDelete(localToDelete.id);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmer la suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer ce local ?
        {localToDelete && (
          <div className="mt-3">
            <strong>Nom:</strong> {localToDelete.nom}<br />
            <strong>Type:</strong> {localToDelete.type}<br />
            <strong>Taille:</strong> {localToDelete.taille} 
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirmer la suppression
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

LocalDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  localToDelete: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    taille: PropTypes.number.isRequired
  })
};

LocalDeleteModal.defaultProps = {
  localToDelete: null
};

export default LocalDeleteModal;