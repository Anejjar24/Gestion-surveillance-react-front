import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { ModuleService } from 'services/modules/ModuleService';

function ModuleImportModal({ show, onClose, onImportSuccess, optionId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError("Please select a CSV file.");
      return;
    }
  
    try {
      setIsLoading(true);
      setError(null);
      // Make sure optionId is valid before making the request
      if (!optionId) {
        throw new Error("Option ID is required");
      }
      await ModuleService.importModulesFromCSV(optionId, selectedFile);
      onImportSuccess();
      onClose();
    } catch (err) {
      setError("An error occurred while importing the file. Please check the file format.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={show} onClose={onClose}>
      <SoftBox
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 5,
        }}
      >
        <Card>
          <SoftBox p={3}>
            <SoftTypography variant="h6" fontWeight="medium">
              Import Modules
            </SoftTypography>
            
            <SoftBox mt={3}>
              <SoftTypography variant="body2" mb={2}>
                CSV file format: nom
              </SoftTypography>
              
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                style={{ marginBottom: '1rem' }}
              />
              
              {error && (
                <SoftTypography color="error" fontSize="0.875rem">
                  {error}
                </SoftTypography>
              )}

              <SoftBox display="flex" justifyContent="space-between" mt={3}>
                <SoftButton
                  variant="gradient"
                  color="light"
                  onClick={onClose}
                >
                  Cancel
                </SoftButton>
                <SoftButton
                  variant="gradient"
                  color="info"
                  onClick={handleImport}
                  disabled={!selectedFile || isLoading}
                >
                  {isLoading ? 'Importing...' : 'Import'}
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </SoftBox>
    </Modal>
  );
}

ModuleImportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onImportSuccess: PropTypes.func.isRequired,
  optionId: PropTypes.number.isRequired,
};

export default ModuleImportModal;
