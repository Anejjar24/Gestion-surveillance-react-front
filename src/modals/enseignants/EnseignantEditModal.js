import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { EnseignantService } from 'services/professors/enseignantService';

function EnseignantEditModal({ 
  show, 
  onClose, 
  onEnseignantUpdated, 
  initialEnseignant 
}) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dispense, setDispense] = useState(false);

  useEffect(() => {
    if (initialEnseignant) {
      setNom(initialEnseignant.nom);
      setPrenom(initialEnseignant.prenom);
      setDispense(initialEnseignant.dispense);
    }
  }, [initialEnseignant]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEnseignant = {
        id: initialEnseignant.id,
        nom,
        prenom,
        dispense,
        department: initialEnseignant.department
      };

      const result = await EnseignantService.updateEnseignant(updatedEnseignant);
      onEnseignantUpdated(result);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l enseignant:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier l Enseignant</Modal.Title>
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
            Mettre à Jour
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

EnseignantEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEnseignantUpdated: PropTypes.func.isRequired,
  initialEnseignant: PropTypes.object
};

export default EnseignantEditModal;