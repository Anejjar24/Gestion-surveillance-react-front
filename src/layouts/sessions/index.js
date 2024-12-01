/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import SessionDateModal from "modals/sessions/SessionDateModal";
// Overview page components
import Header from "layouts/sessions/components/Header";
import PlatformSettings from "layouts/sessions/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "examples/Tables/Table";

/// Service and Data
import { sessionService } from 'services/sessions/sessionService';
import sessionsTableData from 'layouts/sessions/data/sessionsTableData';

import verified from 'assets/images/verified.png';

//import SoftButton from "components/SoftButton";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
 
  // Fetch sessions function
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const fetchedSessions = await sessionService.getAllSessions();
      setSessions(fetchedSessions);
      setLoading(false);
    } catch (err) {
      console.error('Erreur de chargement des sessions:', err);
      setError(err);
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSessions();
  }, []);
 
  // Handle opening the modal
  const handleAddSessionClick = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle session added - refreshes the session list
  const handleSessionAdded = async (newSession) => {
    // Close the modal
    setShowModal(false);
    
    // Refresh the entire sessions list from the backend
    await fetchSessions();
  };

  const { columns, rows } = sessionsTableData(sessions);

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        {loading && <SoftTypography>Chargement des sessions...</SoftTypography>}
        {error && <SoftTypography color="error">Erreur de chargement</SoftTypography>}
      </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
                <img 
                  src={verified} 
                  alt="my custom icon" 
                  style={{ width: "35px", height: "35px", marginRight: "8px" }} 
                />
                <SoftTypography variant="h5" fontWeight="medium">
                  Manage Your Sessions
                </SoftTypography>
              </SoftBox>

              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                  onClick={handleAddSessionClick}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new Session
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

      {/* Session Date Modal */}
      <SessionDateModal 
        show={showModal} 
        onClose={handleCloseModal}
        onSessionAdded={handleSessionAdded}
      />
    </DashboardLayout>
  );
}

export default Sessions;