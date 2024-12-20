// ModuleAddModal.jsx
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { ModuleService } from 'services/modules/ModuleService';

function ModuleAddModal({
  show,
  onClose,
  onModuleAdded,
  optionId
}) {
  const [nom, setNom] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newModule = {
        nom,
        option: { id: optionId }
      };

      const addedModule = await ModuleService.addModule(newModule);
      onModuleAdded(addedModule);
      
      // Reset form
      setNom('');
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout du module:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Module</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nom du Module</Form.Label>
            <Form.Control
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez le nom du module"
              required
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

ModuleAddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onModuleAdded: PropTypes.func.isRequired,
  optionId: PropTypes.number.isRequired
};

export default ModuleAddModal;



