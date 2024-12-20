import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import SessionDateModal from "modals/sessions/SessionDateModal";

import SessionDeleteModal from "modals/sessions/SessionDeleteModal";

import SessionEditModal from "modals/sessions/SessionEditModal";
// Overview page components
import Header from "layouts/options/components/Header";
import PlatformSettings from "layouts/sessions/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "examples/Tables/Table";

/// Service and Data
import  OptionAddModal  from 'modals/options/OptionAddModal';
import  OptionDeleteModal  from 'modals/options/OptionDeleteModal';

import  OptionEditModal  from 'modals/options/OptionEditModal';


import { OptionService } from 'services/options/OptionService';
import optionsTableData from 'layouts/options/data/optionsTableData';
function Options() {
  // State management
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [optionCount, setOptionCount] = useState(0);

  // Modal control states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch options function
  const fetchOptions = async () => {
    try {
      setLoading(true);
      const fetchedOptions = await OptionService.getAllOptions();
      setOptions(fetchedOptions);
      setLoading(false);
    } catch (err) {
      console.error('Error loading options:', err);
      setError(err);
      setLoading(false);
    }
  };

  // Fetch option count
  const fetchOptionCount = async () => {
    try {
      const count = await OptionService.countAllOptions();
      setOptionCount(count);
    } catch (error) {
      console.error("Error retrieving option count:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOptions();
    fetchOptionCount();
  }, []);

  // Handle option added
  const handleOptionAdded = async (newOption) => {
    setShowAddModal(false);
    await fetchOptions();
    await fetchOptionCount();
  };

  // Handle option update
  const handleOptionUpdated = async () => {
    setShowEditModal(false);
    await fetchOptions();
    await fetchOptionCount();
  };

  // Handle option delete
  const handleDeleteOption = async (id) => {
    try {
      await OptionService.deleteOption(id);
      setShowDeleteModal(false);
      await fetchOptions();
      await fetchOptionCount();
    } catch (error) {
      console.error('Error deleting option:', error);
    }
  };

  // Handle delete option click
  const handleDeleteOptionClick = (option) => {
    setSelectedOption(option);
    setShowDeleteModal(true);
  };

  // Handle edit option click
  const handleEditOptionClick = (option) => {
    setSelectedOption(option);
    setShowEditModal(true);
  };

  // Generate table data
  const { columns, rows } = optionsTableData(
    options, 
    handleDeleteOptionClick, 
    handleEditOptionClick
  );

  return (
    <DashboardLayout>
      <Header />
      
      {/* Loading and Error Handling */}
      <SoftBox mt={5} mb={3}>
        {loading && <SoftTypography>Loading options...</SoftTypography>}
        {error && <SoftTypography color="error">Error loading options</SoftTypography>}
      </SoftBox>
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            {/* Header Section */}
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
                <SoftTypography variant="h3" fontWeight="medium">
                  Options
                </SoftTypography>
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                  &nbsp; &nbsp; &nbsp;
                  ( {optionCount} )
                </SoftTypography>
              </SoftBox>

              {/* Add Option Button */}
              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Add New Option
                </SoftButton>
              </SoftBox>
            </SoftBox>

            {/* Options Table */}
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

      {/* Option Modals */}
      <OptionAddModal 
        show={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onOptionAdded={handleOptionAdded}
      />

      <OptionEditModal 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)}
        onOptionUpdated={handleOptionUpdated}
        initialOption={selectedOption}
      />

      <OptionDeleteModal 
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteOption}
        optionToDelete={selectedOption}
      />
    </DashboardLayout>
  );
}

export default Options;