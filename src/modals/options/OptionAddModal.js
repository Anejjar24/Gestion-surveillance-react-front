import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OptionService } from 'services/options/OptionService';

// Modal to Add Option
function OptionAddModal({ show, onClose, onOptionAdded }) {
  const [optionName, setOptionName] = useState('');

  const handleChange = (e) => {
    setOptionName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOption = { nom: optionName };
      const addedOption = await OptionService.addOption(newOption);
      onOptionAdded(addedOption);
      setOptionName('');
      onClose();
    } catch (error) {
      console.error('Error adding option:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Option</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Option Name</Form.Label>
            <Form.Control 
              type="text"
              name="nom"
              value={optionName}
              onChange={handleChange}
              placeholder="Enter option name"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add Option</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

OptionAddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOptionAdded: PropTypes.func.isRequired
};
//export { OptionAddModal, OptionDeleteModal, OptionEditModal };
export default OptionAddModal ;