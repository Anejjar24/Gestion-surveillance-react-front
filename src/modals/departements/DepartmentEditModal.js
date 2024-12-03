import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DepartmentService } from 'services/dapartments/departmentService';

function DepartmentEditModal({
  show,
  onClose,
  onDepartmentUpdated,
  initialDepartment
}) {
  const [department, setDepartment] = useState({
    id: null,
    nom: ''
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialDepartment) {
      setDepartment({
        id: initialDepartment.id,
        nom: initialDepartment.nom
      });
    }
  }, [initialDepartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment(prevDepartment => ({
      ...prevDepartment,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate input if needed
      if (!department.nom.trim()) {
        setError('Department name cannot be empty');
        return;
      }

      console.log('Updating department:', department);
      
      await DepartmentService.updateDepartment(department);
      
      // Reset error state
      setError(null);
      
      // Call callbacks
      onDepartmentUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating department:', error);
      
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data?.message || 'Failed to update department');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up the request');
      }
    }
};

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Department</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              name="nom"
              value={department.nom}
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
            Update Department
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
DepartmentEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDepartmentUpdated: PropTypes.func.isRequired,
  initialDepartment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired
  })
};

DepartmentEditModal.defaultProps = {
  initialDepartment: null
};

export default DepartmentEditModal;