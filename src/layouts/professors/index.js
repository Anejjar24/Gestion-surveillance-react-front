import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/professors/components/Header";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Table from "examples/Tables/Table";
 // Adjust import path
 import { EnseignantService } from 'services/professors/enseignantService';

import hourglass from "assets/images/hourglass.png"; // Adjust import path

import EnseignantAddModal from "modals/enseignants/EnseignantAddModal";
import EnseignantDeleteModal from "modals/enseignants/EnseignantDeleteModal";
import EnseignantEditModal from "modals/enseignants/EnseignantEditModal";
import professorsTableData from 'layouts/professors/data/professorsTableData';


function Professors() {
  const location = useLocation();
  const navigate = useNavigate();

  // State for professors
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal control states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [professorsCount, setProfessorsCount] = useState(0);

  // Department context
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentName, setDepartmentName] = useState(null);

  // Fetch professors function
  const fetchProfessors = async () => {
    try {
      setLoading(true);
      let fetchedProfessors;
      
      if (departmentId) {
        // Fetch professors for specific department
        fetchedProfessors = await EnseignantService.findByDepartmentId(departmentId);
      } else {
        // Fetch all professors
        fetchedProfessors = await EnseignantService.getAllEnseignants();
      }
      
      setProfessors(fetchedProfessors);
      setLoading(false);
    } catch (err) {
      console.error('', err);
      setError(err);
      setLoading(false);
    }
  };

  // Fetch professors count
  const fetchProfessorsCount = async () => {
    try {
      let count;
      if (departmentId) {
        // Get count of professors in specific department
        count = await EnseignantService.getCountEnseignantsByDepartment(departmentId);
      } else {
        // Get total professors count
        count = await EnseignantService.getCountEnseignants();
      }
      setProfessorsCount(count);
    } catch (error) {
      console.error("Error retrieving professors count:", error);
    }
  };

  // Initial fetch and department context setup
  useEffect(() => {
    // Check if a department ID was passed during navigation
    if (location.state && location.state.departmentId) {
      setDepartmentId(location.state.departmentId);
      setDepartmentName(location.state.departmentName);
    }

    fetchProfessors();
    fetchProfessorsCount();
  }, [departmentId]);

  // Handle adding a new professor
  const handleProfessorAdded = async (newProfessor) => {
    setShowAddModal(false);
    await fetchProfessors();
    await fetchProfessorsCount();
  };

  // Handle updating a professor
  const handleProfessorUpdated = async () => {
    setShowEditModal(false);
    await fetchProfessors();
    await fetchProfessorsCount();
  };

  // Handle deleting a professor
  const handleDeleteProfessor = async (id) => {
    try {
      await EnseignantService.deleteEnseignant(id);
      setShowDeleteModal(false);
      await fetchProfessors();
      await fetchProfessorsCount();
    } catch (error) {
      console.error('Error deleting professor:', error);
    }
  };

  // Handle delete professor click
  const handleDeleteProfessorClick = (professor) => {
    setSelectedProfessor(professor);
    setShowDeleteModal(true);
  };

  // Handle edit professor click
  const handleEditProfessorClick = (professor) => {
    setSelectedProfessor(professor);
    setShowEditModal(true);
  };

  // Navigate back to departments if needed
  const handleBackToDepartments = () => {
    navigate('/departments');
  };

  // Generate table data
  const { columns, rows } = professorsTableData(
    professors, 
    handleDeleteProfessorClick, 
    handleEditProfessorClick
  );

  return (
    <DashboardLayout>
      <Header />
      
      {/* Loading and Error Handling */}
      <SoftBox mt={5} mb={3}>
        {loading && <SoftTypography>Loading professors...</SoftTypography>}
        {error && <SoftTypography color="error"></SoftTypography>}
      </SoftBox>
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            {/* Header Section */}
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
                <img 
                  src={hourglass} 
                  alt="professors icon" 
                  style={{ width: "45px", height: "45px", marginRight: "12px" }} 
                />
                <SoftTypography variant="h3" fontWeight="medium">
                  {departmentName 
                    ? `Professors in ${departmentName}` 
                    : 'All Professors'}
                </SoftTypography>
                
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                  &nbsp;  &nbsp;  &nbsp;
                  ( {professorsCount} )
                </SoftTypography>
              </SoftBox>

              {/* Action Buttons */}
              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                {departmentId && (
                  <SoftButton 
                    variant="gradient" 
                    color="secondary" 
                    sx={{ fontSize: '1rem', marginRight: '10px' }}
                    onClick={handleBackToDepartments}
                  >
                    Back to Departments
                  </SoftButton>
                )}
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Add New Professor
                </SoftButton>
              </SoftBox>
            </SoftBox>

            {/* Professors Table */}
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      {/* Modals */}
      {/* Modals */}
<EnseignantAddModal 
  show={showAddModal} 
  onClose={() => setShowAddModal(false)}
  onEnseignantAdded={handleProfessorAdded}
  departmentId={departmentId}
/>

<EnseignantEditModal 
  show={showEditModal} 
  onClose={() => setShowEditModal(false)}
  onEnseignantUpdated={handleProfessorUpdated}
  initialEnseignant={selectedProfessor}
/>

<EnseignantDeleteModal 
  show={showDeleteModal} 
  onClose={() => setShowDeleteModal(false)}
  onConfirmDelete={handleDeleteProfessor}
  enseignantToDelete={selectedProfessor}
/>
    </DashboardLayout>
  );
}

export default Professors;