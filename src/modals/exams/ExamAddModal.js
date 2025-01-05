import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { examService } from 'services/exam/ExamService';
import { EnseignantService } from 'services/professors/enseignantService';
import { DepartmentService } from 'services/dapartments/departmentService';
import { ModuleService } from 'services/modules/ModuleService';
import { OptionService } from 'services/options/OptionService';
import { localService } from 'services/locaux/localService';

function ExamAddModal({
  show,
  onClose,
  onExamAdded,
  sessionId,
  date,
  slot,
  startTime,
  endTime
}) {
  // États pour les champs du formulaire
  const [nbrEtudiants, setNbrEtudiants] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedEnseignant, setSelectedEnseignant] = useState('');
  const [selectedLocaux, setSelectedLocaux] = useState([]);

  // États pour les listes de données
  const [departments, setDepartments] = useState([]);
  const [options, setOptions] = useState([]);
  const [modules, setModules] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [locaux, setLocaux] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const deps = await DepartmentService.getAllDepartments();
        setDepartments(deps);
        const locs = await localService.getAllLocals();
        setLocaux(locs);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      OptionService.getOptionsByDepartmentId(selectedDepartment)
        .then(opts => setOptions(opts))
        .catch(error => console.error("Erreur lors du chargement des options:", error));
        
      EnseignantService.findByDepartmentId(selectedDepartment)
        .then(ens => setEnseignants(ens))
        .catch(error => console.error("Erreur lors du chargement des enseignants:", error));
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedOption) {
      ModuleService.getModulesByOptionId(selectedOption)
        .then(mods => setModules(mods))
        .catch(error => console.error("Erreur lors du chargement des modules:", error));
    }
  }, [selectedOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExam = {
        date: date,
        startTime: startTime,
        endTime: endTime,
        nbrEtudiants: parseInt(nbrEtudiants),
        session: { session_id: parseInt(sessionId) },
        departement: { id: parseInt(selectedDepartment) },
        option: { id: parseInt(selectedOption) },
        module: { id: parseInt(selectedModule) },
        enseignant: { id: parseInt(selectedEnseignant) },
        locaux: selectedLocaux.map(id => ({ id: parseInt(id) }))
      };

      const addedExam = await examService.createExam(newExam);
      onExamAdded(addedExam);
      
      // Réinitialiser le formulaire
      setNbrEtudiants('');
      setSelectedDepartment('');
      setSelectedOption('');
      setSelectedModule('');
      setSelectedEnseignant('');
      setSelectedLocaux([]);
      
      onClose();
    } catch (error) {
      console.error("Erreur lors de l ajout de l examen:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Examen</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" value={date} disabled />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Horaire</Form.Label>
            <Form.Control 
              type="text" 
              value={`${startTime} - ${endTime}`} 
              disabled 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre d étudiants</Form.Label>
            <Form.Control
              type="number"
              value={nbrEtudiants}
              onChange={(e) => setNbrEtudiants(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Département</Form.Label>
            <Form.Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              required
            >
              <option value="">Sélectionner un département</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.nom}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Option</Form.Label>
            <Form.Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
              disabled={!selectedDepartment}
            >
              <option value="">Sélectionner une option</option>
              {options.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.nom}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Module</Form.Label>
            <Form.Select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              required
              disabled={!selectedOption}
            >
              <option value="">Sélectionner un module</option>
              {modules.map(mod => (
                <option key={mod.id} value={mod.id}>{mod.nom}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enseignant</Form.Label>
            <Form.Select
              value={selectedEnseignant}
              onChange={(e) => setSelectedEnseignant(e.target.value)}
              required
              disabled={!selectedDepartment}
            >
              <option value="">Sélectionner un enseignant</option>
              {enseignants.map(ens => (
                <option key={ens.id} value={ens.id}>{`${ens.nom} ${ens.prenom}`}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Locaux</Form.Label>
            <Form.Select
              multiple
              value={selectedLocaux}
              onChange={(e) => setSelectedLocaux([...e.target.selectedOptions].map(option => option.value))}
              required
            >
              {locaux.map(local => (
                <option key={local.id} value={local.id}>{local.nom}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

ExamAddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExamAdded: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
};

export default ExamAddModal;