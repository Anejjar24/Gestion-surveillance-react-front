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
import BasicLayout from "layouts/sessions/components/BasicLayout";
// Overview page components
import Header from "layouts/sessions/components/Header";
import React, { useState, useEffect } from 'react';
import Table from "examples/Tables/Table";
/// Service and Data
import { sessionService } from 'services/sessions/sessionService';
import sessionsTableData from 'layouts/sessions/data/sessionsTableData';
import hourglass from 'assets/images/hourglass.png';
function Sessions() {
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
    <BasicLayout>
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
                Sessions
                </SoftTypography>
                
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                &nbsp;  &nbsp;  &nbsp;
                ( {sessionCount} ){/* Affichage du nombre de sessions */}
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
    </BasicLayout>
  );
}

export default Sessions;