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
  const [showModal, setShowModal] = useState(false); // État pour le modal
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const fetchedSessions = await sessionService.getAllSessions();
        setSessions(fetchedSessions);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement des sessions:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);
 // Optional: Method to add a new session to the list
 const handleSessionAdded = (newSession) => {
  setSessions(prevSessions => [...prevSessions, newSession]);
};
  const { columns, rows } = sessionsTableData(sessions);
  return (
    <DashboardLayout>
      <Header 
       onOpenModal={() => setShowModal(true)} 
       onSessionAdded={handleSessionAdded} 
      />
      <SoftBox mt={5} mb={3}>
        
      </SoftBox>
      <SoftBox py={3}>
     
      <SoftBox mb={3}>
        <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox mb={0.5} display="flex" alignItems="center">
  <img src={verified} alt="my custom icon" style={{ width: "35px", height: "35px", marginRight: "8px" }} />
  <SoftTypography variant="h5" fontWeight="medium">
    Manage Your Sessions
  </SoftTypography>
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
 
 <SessionDateModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSessionAdded={handleSessionAdded}
      />
      
    </DashboardLayout>
  );
}

export default Sessions;
