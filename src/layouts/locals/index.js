import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Table from "examples/Tables/Table";

import { localService } from 'services/localService';
import localsTableData from 'layouts/locals/data/localsTableData';
import LocalDateModal from 'modals/locals/LocalDateModal';
import LocalEditModal from 'modals/locals/LocalEditModal';
import LocalDeleteModal from 'modals/locals/LocalDeleteModal';

function Locals() {
  const [locals, setLocals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localCount, setLocalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState(null);

  const fetchLocals = async () => {
    try {
      const fetchedLocals = await localService.getAllLocals();
      setLocals(fetchedLocals);
      setLoading(false);
    } catch (error) {
      console.error('Erreur de chargement des locaux:', error);
      setLoading(false);
    }
  };

  const fetchLocalCount = async () => {
    try {
      const count = await localService.getCountLocals();
      setLocalCount(count);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de locaux :", error);
    }
  };

  useEffect(() => {
    fetchLocals();
    fetchLocalCount();
  }, []);

  const handleAddLocalClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLocalAdded = async () => {
    await fetchLocals();
    await fetchLocalCount();
    setShowModal(false);
  };

  const handleEditLocalClick = (local) => {
    setSelectedLocal(local);
    setShowEditModal(true);
  };

  const handleDeleteLocalClick = (local) => {
    setSelectedLocal(local);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await localService.deleteLocal(id);
      await fetchLocals();
      await fetchLocalCount();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du local:', error);
    }
  };

  const { columns, rows } = localsTableData(
    locals, 
    handleDeleteLocalClick, 
    handleEditLocalClick
  );

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h3">
                Locaux ({localCount})
              </SoftTypography>
              <SoftButton 
                variant="gradient" 
                color="info" 
                onClick={handleAddLocalClick}
              >
                <Icon>add</Icon>&nbsp;Ajouter un Local
              </SoftButton>
            </SoftBox>

            <Table columns={columns} rows={rows} />
          </Card>
        </SoftBox>
      </SoftBox>

      <LocalDateModal 
        show={showModal} 
        onClose={handleCloseModal}
        onLocalAdded={handleLocalAdded}
      />

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