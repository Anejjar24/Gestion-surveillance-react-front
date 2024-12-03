import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';

function LocalDeleteModal({ show, onClose, onConfirmDelete, localToDelete }) {
  const handleDelete = () => {
    if (localToDelete) {
      onConfirmDelete(localToDelete.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={show} toggle={onClose}>
      <ModalHeader toggle={onClose}>Confirm Delete</ModalHeader>
      <ModalBody>
        <SoftTypography>
          Are you sure you want to delete the local "{localToDelete?.name}"?
        </SoftTypography>
      </ModalBody>
      <ModalFooter>
        <SoftButton color="secondary" onClick={onClose}>
          Cancel
        </SoftButton>
        <SoftButton color="danger" onClick={handleDelete}>
          Delete
        </SoftButton>
      </ModalFooter>
    </Modal>
  );
}

export default LocalDeleteModal;