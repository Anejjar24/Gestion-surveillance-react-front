import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Table from "examples/Tables/Table";

// Custom components
import Header from "layouts/departments/components/Header";
import DepartmentAddModal from "modals/departements/DepartmentAddModal";
import DepartmentEditModal from "modals/departements/DepartmentEditModal";
import DepartmentDeleteModal from "modals/departements/DepartmentDeleteModal";

// Services
import { DepartmentService } from 'services/dapartments/departmentService';

// Data generator
import departmentsTableData from 'layouts/departments/data/departmentsTableData';

// Images
import department1 from 'assets/images/department1.png';
import { useNavigate } from 'react-router-dom';
function Departments() {
  // State for departments
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal control states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentCount, setDepartmentCount] = useState(0);


  const navigate = useNavigate();


  // Fetch departments function
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const fetchedDepartments = await DepartmentService.getAllDepartments();
      setDepartments(fetchedDepartments);
      setLoading(false);
    } catch (err) {
      console.error('', err);
      setError(err);
      setLoading(false);
    }
  };

  // Fetch department count
  const fetchDepartmentCount = async () => {
    try {
      const count = await DepartmentService.getCountDepartment();
      setDepartmentCount(count);
    } catch (error) {
      console.error("Error retrieving department count:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDepartments();
    fetchDepartmentCount();
  }, []);

  // Handle department added
  const handleDepartmentAdded = async (newDepartment) => {
    setShowAddModal(false);
    await fetchDepartments();
    await fetchDepartmentCount();
  };

  // Handle department update
  const handleDepartmentUpdated = async () => {
    setShowEditModal(false);
    await fetchDepartments();
    await fetchDepartmentCount();
  };

  // Handle department delete
  const handleDeleteDepartment = async (id) => {
    try {
      await DepartmentService.deleteDepartment(id);
      setShowDeleteModal(false);
      await fetchDepartments();
      await fetchDepartmentCount();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  // Handle delete department click
  const handleDeleteDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setShowDeleteModal(true);
  };

  // Handle edit department click
  const handleEditDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setShowEditModal(true);
  };


  // Add navigation handler
  const handleNavigateToProfessors = (department) => {
    // Navigate to the Professors page with the department ID
    navigate(`/professors/${department.id}`, { 
      state: { 
        departmentId: department.id, 
        departmentName: department.nom 
      } 
    });
  };


  // Update the table data generation to include navigation handler
  const { columns, rows } = departmentsTableData(
    departments, 
    handleDeleteDepartmentClick, 
    handleEditDepartmentClick,
    handleNavigateToProfessors // Add this new handler
  );

  return (
    <DashboardLayout>
      <Header />
      
      {/* Loading and Error Handling */}
      <SoftBox mt={5} mb={3}>
        {loading && <SoftTypography>Loading departments...</SoftTypography>}
        {error && <SoftTypography color="error">Error loading departments</SoftTypography>}
      </SoftBox>
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            {/* Header Section */}
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
                
                <SoftTypography variant="h3" fontWeight="medium">
                  Departments
                </SoftTypography>
                
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                  &nbsp;  &nbsp;  &nbsp;
                  ( {departmentCount} )
                </SoftTypography>
              </SoftBox>

              {/* Add Department Button */}
              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Add New Department
                </SoftButton>
              </SoftBox>
            </SoftBox>

            {/* Departments Table */}
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

      {/* Department Modals */}
      <DepartmentAddModal 
        show={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onDepartmentAdded={handleDepartmentAdded}
      />

      <DepartmentEditModal 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)}
        onDepartmentUpdated={handleDepartmentUpdated}
        initialDepartment={selectedDepartment}
      />

      <DepartmentDeleteModal 
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteDepartment}
        departmentToDelete={selectedDepartment}
      />
    </DashboardLayout>
  );
}

export default Departments;