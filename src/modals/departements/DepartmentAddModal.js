import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DepartmentService } from 'services/dapartments/departmentService';

function DepartmentAddModal({ 
  show, 
  onClose, 
  onDepartmentAdded 
}) {
  const [departmentName, setDepartmentName] = useState('');

  const handleChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDepartment = {
        nom: departmentName
      };

      const addedDepartment = await DepartmentService.addDepartment(newDepartment);
      onDepartmentAdded(addedDepartment);
      
      // Reset form
      setDepartmentName('');
      onClose();
    } catch (error) {
      console.error('Error adding department:', error);
      // TODO: Add user-friendly error handling
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Department</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Department Name</Form.Label>
            <Form.Control 
              type="text"
              name="nom"
              value={departmentName}
              onChange={handleChange}
              placeholder="Enter department name"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Department
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

DepartmentAddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDepartmentAdded: PropTypes.func.isRequired
};

export default DepartmentAddModal;