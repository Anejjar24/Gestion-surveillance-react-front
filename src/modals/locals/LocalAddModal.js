import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { localService } from 'services/locaux/localService';

function LocalAddModal({ 
  show, 
  onClose, 
  onLocalAdded 
}) {
  const [local, setLocal] = useState({
    nom: '',
    taille: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal(prevLocal => ({
      ...prevLocal,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir taille en nombre
      const localToAdd = {
        ...local,
        taille: parseInt(local.taille, 10)
      };

      const addedLocal = await localService.addLocal(localToAdd);
      onLocalAdded(addedLocal);
      onClose();

      // Réinitialiser le formulaire
      setLocal({
        nom: '',
        taille: '',
        type: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du local:', error);
      // TODO: Ajouter une gestion d'erreur conviviale pour l'utilisateur
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Local</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nom du Local</Form.Label>
            <Form.Control 
              type="text"
              name="nom"
              value={local.nom}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Taille</Form.Label>
            <Form.Control 
              type="number"
              name="taille"
              value={local.taille}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type de Local</Form.Label>
            <Form.Select 
              name="type"
              value={local.type}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un type</option>
              <option value="Salle">Salle</option>
              <option value="Amphi">Amphi</option>
            </Form.Select>
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

LocalAddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLocalAdded: PropTypes.func.isRequired
};

export default LocalAddModal;
