import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OptionService } from 'services/options/OptionService';
// Modal to Edit Option
function OptionEditModal({ show, onClose, onOptionUpdated, initialOption }) {
    const [option, setOption] = useState({ id: null, nom: '' });
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (initialOption) {
        setOption({ id: initialOption.id, nom: initialOption.nom });
      }
    }, [initialOption]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setOption(prevOption => ({ ...prevOption, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (!option.nom.trim()) {
          setError('Option name cannot be empty');
          return;
        }
  
        await OptionService.updateOption(option);
        setError(null);
        onOptionUpdated();
        onClose();
      } catch (error) {
        console.error('Error updating option:', error);
        setError('Failed to update option');
      }
    };
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Option</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Option Name</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={option.nom}
                onChange={handleChange}
                placeholder="Enter option name"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit">Update Option</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
  
  OptionEditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOptionUpdated: PropTypes.func.isRequired,
    initialOption: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired
    })
  };
  
  OptionEditModal.defaultProps = {
    initialOption: null
  };
  //export { OptionAddModal, OptionDeleteModal, OptionEditModal };
  export default OptionEditModal;