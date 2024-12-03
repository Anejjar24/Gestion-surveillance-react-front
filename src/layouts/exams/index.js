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

import SessionDeleteModal from "modals/sessions/SessionDeleteModal";


import SessionEditModal from "modals/sessions/SessionEditModal";
// Overview page components
import Header from "layouts/exams/components/Header";
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

import hourglass from 'assets/images/exam1.png';

//import SoftButton from "components/SoftButton";

function Exams() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
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
  const fetchSessionCount = async () => {
    try {
      const count = await sessionService.getCountSessions();
      setSessionCount(count);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de sessions :", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSessions();
    fetchSessionCount();
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
    await fetchSessionCount();
  };



  
  // Nouvelle fonction pour supprimer une session
  const handleDeleteSession = async (id) => {
    try {
      await sessionService.deleteSession(id);
      // Rafraîchir la liste des sessions et le compte
      await fetchSessions();
      await fetchSessionCount();
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error);
    }
  };

  // Nouvelle fonction pour ouvrir le modal de suppression
  const handleDeleteSessionClick = (session) => {
    setSelectedSession(session);
    setShowDeleteModal(true);
  };
// Nouvelle fonction pour ouvrir le modal d'édition
const handleEditSessionClick = (session) => {
  setSelectedSession(session);
  setShowEditModal(true);
};
  // Fonction de suppression confirmée
  const handleConfirmDelete = async (id) => {
    try {
      await sessionService.deleteSession(id);
      // Rafraîchir la liste des sessions et le compte
      await fetchSessions();
      await fetchSessionCount();
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error);
    }
  };

  // Mise à jour de la fonction de création de tableau
  const { columns, rows } = sessionsTableData(
    sessions, 
    handleDeleteSessionClick, 
    handleEditSessionClick
  );




  //const { columns, rows } = sessionsTableData(sessions);

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
                  src={hourglass} 
                  alt="my custom icon" 
                  style={{ width: "45px", height: "45px", marginRight: "12px" }} 
                />
                <SoftTypography variant="h3" fontWeight="medium">
                Exams
                </SoftTypography>
                
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                &nbsp;  &nbsp;  &nbsp;
                (   ){/* Affichage du nombre de sessions */}
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
                  &nbsp;add new Exam
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

<SessionEditModal 
        show={showEditModal} 
        onClose={() => setShowEditModal(false)}
        onSessionUpdated={() => {
          fetchSessions();
          fetchSessionCount();
          setShowEditModal(false);
        }}
        initialSession={selectedSession}
      />

<SessionDeleteModal 
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleConfirmDelete}
        sessionToDelete={selectedSession}
      />
    </DashboardLayout>
  );
}

export default Exams;