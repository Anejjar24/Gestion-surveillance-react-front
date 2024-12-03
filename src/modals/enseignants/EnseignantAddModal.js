import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { EnseignantService } from 'services/professors/enseignantService';

function EnseignantAddModal({ 
  show, 
  onClose, 
  onEnseignantAdded, 
  departmentId 
}) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dispense, setDispense] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEnseignant = {
        nom,
        prenom,
        dispense,
        department: { id: departmentId }
      };

      const addedEnseignant = await EnseignantService.addEnseignant(newEnseignant);
      onEnseignantAdded(addedEnseignant);
      
      // Réinitialiser le formulaire
      setNom('');
      setPrenom('');
      setDispense(false);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l ajout de l enseignant:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Enseignant</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez le nom"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entrez le prénom"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Dispensé"
              checked={dispense}
              onChange={(e) => setDispense(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

EnseignantAddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEnseignantAdded: PropTypes.func.isRequired,
  departmentId: PropTypes.number.isRequired
};

export default EnseignantAddModal;