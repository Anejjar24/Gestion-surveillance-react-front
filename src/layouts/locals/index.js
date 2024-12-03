import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/locals/components/Header";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "examples/Tables/Table";

/// Service and Data
import { localService } from 'services/lacaux/localService';

// Modals
import LocalAddModal from "modals/locals/LocalAddModal";
import LocalDeleteModal from "modals/locals/LocalDeleteModal";

import LocalEditModal from "modals/locals/LocalEditModal";


import localsTableData from 'layouts/locals/data/localsTableData';

import hourglass from 'assets/images/home.png';

import DepartmentAddModal from "modals/departements/DepartmentAddModal";


function Locals() {
  const [locals, setLocals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [localCount, setLocalCount] = useState(0);

  // Fetch locals function
  const fetchLocals = async () => {
    try {
      setLoading(true);
      const fetchedLocals = await localService.getAllLocals();
      setLocals(fetchedLocals);
      setLoading(false);
    } catch (err) {
      console.error('Erreur de chargement des locaux:', err);
      setError(err);
      setLoading(false);
    }
  };

  // Fetch local count function
  const fetchLocalCount = async () => {
    try {
      const count = await localService.getCountLocals();
      setLocalCount(count);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de locaux :", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLocals();
    fetchLocalCount();
  }, []);
 
  // Handle opening the modal
  const handleAddLocalClick = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle local added - refreshes the local list
  const handleLocalAdded = async (newLocal) => {
    // Close the modal
    setShowModal(false);
    
    // Refresh the entire locals list from the backend
    await fetchLocals();
    await fetchLocalCount();
  };

  // Function to delete a local
  const handleDeleteLocal = async (id) => {
    try {
      await localService.deleteLocal(id);
      // Refresh the local list and count
      await fetchLocals();
      await fetchLocalCount();
    } catch (error) {
      console.error('Erreur lors de la suppression du local:', error);
    }
  };

  // Function to open delete modal
  const handleDeleteLocalClick = (local) => {
    setSelectedLocal(local);
    setShowDeleteModal(true);
  };

  // Function to open edit modal
  const handleEditLocalClick = (local) => {
    setSelectedLocal(local);
    setShowEditModal(true);
  };

  // Function for confirmed deletion
  const handleConfirmDelete = async (id) => {
    try {
      await localService.deleteLocal(id);
      // Refresh the local list and count
      await fetchLocals();
      await fetchLocalCount();
      // Close the delete modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du local:', error);
    }
  };

  // Create table data
  const { columns, rows } = localsTableData(
    locals, 
    handleDeleteLocalClick, 
    handleEditLocalClick
  );

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        {loading && <SoftTypography>Chargement des locaux...</SoftTypography>}
        {error && <SoftTypography color="error">Erreur de chargement</SoftTypography>}
      </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
                <img 
                  src={hourglass} 
                  alt="my custom icon" 
                  style={{ width: "45px", height: "45px", marginRight: "12px" }} 
                />
                <SoftTypography variant="h3" fontWeight="medium">
                  Locaux
                </SoftTypography>
                
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                  &nbsp;  &nbsp;  &nbsp;
                  ( {localCount} )
                </SoftTypography>
              </SoftBox>

              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                  onClick={handleAddLocalClick}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Ajouter un Local
                </SoftButton>
              </SoftBox>
            </SoftBox>

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

      {/* Local Add Modal */}
      <LocalAddModal 
        show={showModal} 
        onClose={handleCloseModal}
        onLocalAdded={handleLocalAdded}
      />

      {/* Local Edit Modal */}
      <LocalEditModal 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)}
        onLocalUpdated={() => {
          fetchLocals();
          fetchLocalCount();
          setShowEditModal(false);
        }}
        initialLocal={selectedLocal}
      />

      {/* Local Delete Modal */}
      <LocalDeleteModal 
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleConfirmDelete}
        localToDelete={selectedLocal}
      />
    </DashboardLayout>
  );
}

export default Locals;