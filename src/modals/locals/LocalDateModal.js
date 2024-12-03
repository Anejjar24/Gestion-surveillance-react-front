import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { localService } from 'services/lacaux/localService';

function LocalDateModal({ show, onClose, onLocalAdded }) {
  const [newLocal, setNewLocal] = useState({
    nom: '',
    type: '',
    taille: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLocal(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await localService.addLocal(newLocal);
      onLocalAdded(newLocal);
      onClose();
    } catch (error) {
      console.error('Error adding local:', error);
    }
  };

  return (
    <Modal isOpen={show} toggle={onClose}>
      <ModalHeader toggle={onClose}>Ajouter un Local</ModalHeader>
      <ModalBody>
        <SoftInput
          type="text"
          placeholder="Nom du Local"
          name="nom"
          value={newLocal.nom}
          onChange={handleChange}
        />
        <SoftInput
          type="text"
          placeholder="Type de Local"
          name="type"
          value={newLocal.type}
          onChange={handleChange}
        />
        <SoftInput
          type="number"
          placeholder="Taille"
          name="taille"
          value={newLocal.taille}
          onChange={handleChange}
        />
      </ModalBody>
      <ModalFooter>
        <SoftButton color="secondary" onClick={onClose}>
          Annuler
        </SoftButton>
        <SoftButton color="primary" onClick={handleSubmit}>
          Ajouter Local
        </SoftButton>
      </ModalFooter>
    </Modal>
  );
}

export default LocalDateModal;