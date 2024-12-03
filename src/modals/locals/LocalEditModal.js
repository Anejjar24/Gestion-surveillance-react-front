import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { localService } from 'services/locaux/localService';

function LocalEditModal({ 
  show, 
  onClose, 
  onLocalUpdated, 
  initialLocal 
}) {
  const [local, setLocal] = useState({
    id: null,
    nom: '',
    taille: '',
    type: ''
  });

  useEffect(() => {
    if (initialLocal) {
      setLocal({
        ...initialLocal,
        // S'assurer que la taille est converties en chaîne pour l'affichage
        taille: initialLocal.taille.toString()
      });
    }
  }, [initialLocal]);

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
      const localToUpdate = {
        ...local,
        taille: parseInt(local.taille, 10)
      };

      await localService.updateLocal(localToUpdate);
      onLocalUpdated();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du local:', error);
      // TODO: Ajouter une gestion d'erreur conviviale pour l'utilisateur
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier un Local</Modal.Title>
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
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

LocalEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLocalUpdated: PropTypes.func.isRequired,
  initialLocal: PropTypes.shape({
    id: PropTypes.number,
    nom: PropTypes.string,
    taille: PropTypes.number,
    type: PropTypes.string
  })
};

LocalEditModal.defaultProps = {
  initialLocal: null
};

export default LocalEditModal;