import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { localService } from 'services/lacaux/localService';

function LocalEditModal({ show, onClose, onLocalUpdated, initialLocal }) {
  const [local, setLocal] = useState({
    id: null,
    nom: '',
    type: '',
    taille: 0
  });

  useEffect(() => {
    if (initialLocal) {
      setLocal(initialLocal);
    }
  }, [initialLocal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await localService.updateLocal(local);
      onLocalUpdated(local);
      onClose();
    } catch (error) {
      console.error('Error updating local:', error);
    }
  };

  return (
    <Modal isOpen={show} toggle={onClose}>
      <ModalHeader toggle={onClose}>Modifier le Local</ModalHeader>
      <ModalBody>
        <SoftInput
          type="text"
          placeholder="Nom du Local"
          name="nom"
          value={local.nom}
          onChange={handleChange}
        />
        <SoftInput
          type="text"
          placeholder="Type de Local"
          name="type"
          value={local.type}
          onChange={handleChange}
        />
        <SoftInput
          type="number"
          placeholder="Taille"
          name="taille"
          value={local.taille}
          onChange={handleChange}
        />
      </ModalBody>
      <ModalFooter>
        <SoftButton color="secondary" onClick={onClose}>
          Annuler
        </SoftButton>
        <SoftButton color="primary" onClick={handleSubmit}>
          Mettre à jour
        </SoftButton>
      </ModalFooter>
    </Modal>
  );
}

export default LocalEditModal;