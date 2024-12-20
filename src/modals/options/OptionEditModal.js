import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OptionService } from 'services/options/OptionService';
import { DepartmentService } from 'services/dapartments/departmentService';

function OptionEditModal({ show, onClose, onOptionUpdated, initialOption }) {
  const [option, setOption] = useState({ id: null, nom: '', department: { id: '' } });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await DepartmentService.getAllDepartments();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError('Failed to load departments');
      }
    };

    if (show) {
      fetchDepartments();
    }
  }, [show]);

  useEffect(() => {
    if (initialOption) {
      setOption({
        id: initialOption.id,
        nom: initialOption.nom,
        department: { id: initialOption.department?.id || '' }
      });
    }
  }, [initialOption]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      setOption(prevOption => ({
        ...prevOption,
        department: { id: value }
      }));
    } else {
      setOption(prevOption => ({ ...prevOption, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!option.nom.trim()) {
        setError('Option name cannot be empty');
        return;
      }

      // Mise à jour de l'option directement, sans vérification préalable
      await OptionService.updateOption(option.id, option);

      setError(null); // Réinitialisation de l'erreur
      onOptionUpdated(); // Appel de la fonction après la mise à jour
      onClose(); // Fermeture du modal
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
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={option.department.id}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option> {/* Option vide par défaut */}
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.nom || 'No name available'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
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
    nom: PropTypes.string.isRequired,
    department: PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  })
};

export default OptionEditModal;


// OptionEditModal.defaultProps = {
//   initialOption: null
// };

//export { OptionAddModal, OptionEditModal };
























// import React, { useState, useEffect } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import PropTypes from 'prop-types';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { OptionService } from 'services/options/OptionService';

// function OptionEditModal({ show, onClose, onOptionUpdated, initialOption }) {
//     const [option, setOption] = useState({ 
//         id: null, 
//         nom: '',
//         departement: null  // Ajout du departement
//     });
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//         if (initialOption) {
//             setOption({ 
//                 id: initialOption.id, 
//                 nom: initialOption.nom,
//                 departement: initialOption.departement  // Préserver le departement
//             });
//         }
//     }, [initialOption]);
  
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setOption(prevOption => ({ 
//             ...prevOption, 
//             [name]: value 
//         }));
//     };
  
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (!option.nom.trim()) {
//                 setError('Option name cannot be empty');
//                 return;
//             }
  
//             // S'assurer que le departement est inclus dans la mise à jour
//             const updatedOption = {
//                 id: option.id,
//                 nom: option.nom,
//                 departement: option.departement || initialOption.departement // Utiliser le departement initial si non défini
//             };
  
//             console.log('Updating option with data:', updatedOption); // Debug log
//             await OptionService.updateOption(updatedOption);
//             setError(null);
//             onOptionUpdated();
//             onClose();
//         } catch (error) {
//             console.error('Error updating option:', error);
//             setError('Failed to update option');
//         }
//     };
  
//     return (
//         <Modal show={show} onHide={onClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Option</Modal.Title>
//             </Modal.Header>
//             <Form onSubmit={handleSubmit}>
//                 <Modal.Body>
//                     {error && (
//                         <div className="alert alert-danger">{error}</div>
//                     )}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Option Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="nom"
//                             value={option.nom}
//                             onChange={handleChange}
//                             placeholder="Enter option name"
//                             required
//                         />
//                     </Form.Group>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={onClose}>Cancel</Button>
//                     <Button variant="primary" type="submit">Update Option</Button>
//                 </Modal.Footer>
//             </Form>
//         </Modal>
//     );
// }
  
// OptionEditModal.propTypes = {
//     show: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onOptionUpdated: PropTypes.func.isRequired,
//     initialOption: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         nom: PropTypes.string.isRequired,
//         departement: PropTypes.object  // Ajout de la validation pour departement
//     })
// };
  
// OptionEditModal.defaultProps = {
//     initialOption: null
// };

// export default OptionEditModal;



// Vrai

// import React, { useState, useEffect } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import PropTypes from 'prop-types';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { OptionService } from 'services/options/OptionService';
// // Modal to Edit Option
// function OptionEditModal({ show, onClose, onOptionUpdated, initialOption }) {
//     const [option, setOption] = useState({ id: null, nom: '' });
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       if (initialOption) {
//         setOption({ id: initialOption.id, nom: initialOption.nom });
//       }
//     }, [initialOption]);
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setOption(prevOption => ({ ...prevOption, [name]: value }));
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         if (!option.nom.trim()) {
//           setError('Option name cannot be empty');
//           return;
//         }
  
//         await OptionService.updateOption(option);
//         setError(null);
//         onOptionUpdated();
//         onClose();
//       } catch (error) {
//         console.error('Error updating option:', error);
//         setError('Failed to update option');
//       }
//     };
  
//     return (
//       <Modal show={show} onHide={onClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Option</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             {error && (
//               <div className="alert alert-danger">{error}</div>
//             )}
//             <Form.Group className="mb-3">
//               <Form.Label>Option Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="nom"
//                 value={option.nom}
//                 onChange={handleChange}
//                 placeholder="Enter option name"
//                 required
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={onClose}>Cancel</Button>
//             <Button variant="primary" type="submit">Update Option</Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     );
//   }
  
//   OptionEditModal.propTypes = {
//     show: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onOptionUpdated: PropTypes.func.isRequired,
//     initialOption: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       nom: PropTypes.string.isRequired
//     })
//   };
  
//   OptionEditModal.defaultProps = {
//     initialOption: null
//   };
//   //export { OptionAddModal, OptionDeleteModal, OptionEditModal };
 //export default OptionEditModal;