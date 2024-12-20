import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/modules/components/Header";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Table from "examples/Tables/Table";

// Import des services
import { ModuleService } from "services/modules/ModuleService";

// Modals pour les modules
import ModuleAddModal from "modals/modules/ModuleAddModal";
import ModuleDeleteModal from "modals/modules/ModuleDeleteModal";
import ModuleEditModal from "modals/modules/ModuleEditModal";

// Données des modules
import modulesTableData from 'layouts/modules/data/modulesTableData';

function Modules() {
  const location = useLocation();
  const navigate = useNavigate();

  // state pour les modules
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modulesCount, setModulesCount] = useState(0);

  // Modal control states pour les modules
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Option Context 
  const [optionId, setOptionId] = useState(null);
  const [optionName, setOptionName] = useState(null);

  // Fetch des modules
  const fetchModules = async () => {
    try {
      let fetchedModules;
      if (optionId) {
        fetchedModules = await ModuleService.getModulesByOptionId(optionId);
      } else {
        fetchedModules = await ModuleService.getAllModules();
      }
      setModules(fetchedModules);
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  // Fetch du nombre de modules
  const fetchModulesCount = async () => {
    try {
      let count = await ModuleService.countModulesByOptionId(optionId);
      setModulesCount(count);
    } catch (error) {
      console.error("Error retrieving module count:", error);
    }
  };

  // useEffect(() => {
  //   if (location.state && location.state.optionId) {
  //     setOptionId(location.state.optionId);
  //     setOptionName(location.state.optionName);
  //   }
  //   fetchModules();
  //   fetchModulesCount();
  // }, [optionId]);
  useEffect(() => {
    if (location.state && location.state.optionId) {
      setOptionId(location.state.optionId);
      setOptionName(location.state.optionName);
    }
  }, [location.state]);  // Ce useEffect s'exécutera une seule fois lors de la réception de location.state
  
  useEffect(() => {
    if (optionId) { // S'assurer que optionId est défini avant d'effectuer l'appel API
      fetchModules();
      fetchModulesCount();
    }
  }, [optionId]);

  const handleModuleAdded = async () => {
    setShowAddModal(false);
    await fetchModules();
    await fetchModulesCount();
  };

  const handleModuleUpdated = async () => {
    try {
      setShowEditModal(false);
      await fetchModules();
      await fetchModulesCount();
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };
  
  const handleEditModuleClick = (module) => {
    console.log('Full module data being passed to edit modal:', module);
    // Si l'option n'est pas dans le module, récupérez-la du state
    const moduleWithOption = {
      ...module,
      option: module.option || { id: optionId }
    };
    setSelectedModule(moduleWithOption);
    setShowEditModal(true);
  };

  const handleDeleteModule = async (id) => {
    try {
      await ModuleService.deleteModule(id);
      setShowDeleteModal(false);
      await fetchModules();
      await fetchModulesCount();
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const handleDeleteModuleClick = (module) => {
    setSelectedModule(module);
    setShowDeleteModal(true);
  };

  

  const handleBackToOptions = () => {
    navigate("/options");
  };

  const { columns, rows } = modulesTableData(
    modules, 
    handleDeleteModuleClick, 
    handleEditModuleClick
  );

  return (
    <DashboardLayout>
      <Header />
      
      {/* Loading and Error Handling */}
      <SoftBox mt={5} mb={3}>
        {/* Affichage du texte de chargement et d'erreur */}
      </SoftBox>
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            {/* Header Section */}
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
                <SoftTypography variant="h3" fontWeight="medium">
                  {optionName ? `Modules for ${optionName}` : "All Modules"}
                </SoftTypography>
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                  &nbsp;  &nbsp;  &nbsp;
                  ( {modulesCount} )
                </SoftTypography>
              </SoftBox>

              {/* Action Buttons */}
              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                {optionId && (
                  <SoftButton 
                    variant="gradient" 
                    color="secondary" 
                    sx={{ fontSize: '1rem', marginRight: '10px' }}
                    onClick={handleBackToOptions}
                  >
                    Back to Options
                  </SoftButton>
                )}
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Add New Module
                </SoftButton>
              </SoftBox>
            </SoftBox>

            {/* Modules Table */}
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
      <ModuleAddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onModuleAdded={handleModuleAdded}
        optionId={optionId}
      />

      <ModuleEditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onModuleUpdated={handleModuleUpdated}
        initialModule={selectedModule}
      />

      <ModuleDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteModule}
        moduleToDelete={selectedModule}
      />
    </DashboardLayout>
  );
}

export default Modules;
