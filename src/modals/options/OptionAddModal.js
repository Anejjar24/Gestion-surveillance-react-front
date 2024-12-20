import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { DepartmentService } from 'services/dapartments/departmentService';

import 'bootstrap/dist/css/bootstrap.min.css';
import { OptionService } from 'services/options/OptionService';

// Modal to Add Option
function OptionAddModal({ show, onClose, onOptionAdded }) {
  const [optionName, setOptionName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await DepartmentService.getAllDepartments();
        console.log('Réponse de l\'API:', data); // Vérification de la réponse
        setDepartments(data);
        if (data.length > 0) {
          setSelectedDepartment(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError('Failed to load departments');
      }
    };

    if (show) {
      fetchDepartments();
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!optionName.trim()) {
        setError('Option name cannot be empty');
        return;
      }
  
      const newOption = {
        nom: optionName,
        department: { id: selectedDepartment }
      };
  
      // Ajout direct de l'option sans vérification préalable
      const addedOption = await OptionService.addOption(newOption);
  
      // Une fois l'option ajoutée, on met à jour l'état
      onOptionAdded(addedOption);
      setOptionName(''); // Réinitialisation du champ
      setError(null); // Réinitialisation de l'erreur
      onClose(); // Fermeture du modal
    } catch (error) {
      console.error('Error adding option:', error);
      setError('Failed to add option');
    }
  };
  

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Option</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              required
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.nom || 'No name available'} {/* Affichage de nom */}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Option Name</Form.Label>
            <Form.Control
              type="text"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
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

export default OptionAddModal;

// Modal to Add Option
// function OptionAddModal({ show, onClose, onOptionAdded }) {
//   const [optionName, setOptionName] = useState('');

//   const handleChange = (e) => {
//     setOptionName(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newOption = { nom: optionName };
//       const addedOption = await OptionService.addOption(newOption);
//       onOptionAdded(addedOption);
//       setOptionName('');
//       onClose();
//     } catch (error) {
//       console.error('Error adding option:', error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Option</Modal.Title>
//       </Modal.Header>
//       <Form onSubmit={handleSubmit}>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Option Name</Form.Label>
//             <Form.Control 
//               type="text"
//               name="nom"
//               value={optionName}
//               onChange={handleChange}
//               placeholder="Enter option name"
//               required
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>Cancel</Button>
//           <Button variant="primary" type="submit">Add Option</Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// }

// OptionAddModal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onOptionAdded: PropTypes.func.isRequired
// };
//export { OptionAddModal, OptionDeleteModal, OptionEditModal };
