import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { ModuleService } from 'services/modules/ModuleService';

function ModuleEditModal({
  show,
  onClose,
  onModuleUpdated,
  initialModule
}) {
  const [nom, setNom] = useState('');
  const [option, setOption] = useState(null);

  useEffect(() => {
    if (initialModule) {
      setNom(initialModule.nom);
      setOption(initialModule.option); // Préserver l'option
    }
  }, [initialModule]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Créer l'objet de mise à jour en préservant l'option
      const updatedModule = {
        id: initialModule.id,
        nom: nom,
        option: option || initialModule.option // Utiliser l'option existante ou celle de initialModule
      };

      console.log('Updating module with data:', updatedModule);
      
      const result = await ModuleService.updateModule(initialModule.id, updatedModule);
      if (result) {
        onModuleUpdated(result);
        onClose();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du module:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier le Module</Modal.Title>
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
            Mettre à Jour
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

ModuleEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onModuleUpdated: PropTypes.func.isRequired,
  initialModule: PropTypes.object
};

export default ModuleEditModal;