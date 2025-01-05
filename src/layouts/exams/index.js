import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/exams/components/Header";
import PlatformSettings from "layouts/sessions/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "examples/Tables/Table";

/// Service and Data
import { sessionService } from 'services/sessions/sessionService';
import SessionSchedule from 'layouts/exams/data/SessionSchedule';
// Adaptez le chemin selon votre structure

import hourglass from 'assets/images/exam1.png';

//import SoftButton from "components/SoftButton";
import { useParams } from "react-router-dom";
function Exams() {

  const [sessionId, setSessionId] = useState(null);

  // Récupérer l'ID de la session à partir du localStorage
  useEffect(() => {
    const id = localStorage.getItem("selectedSessionId");
    setSessionId(id);
  }, []);

  if (!sessionId) {
    return <div>Loading session...</div>;
  }
 


  //const { columns, rows } = sessionsTableData(sessions);

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
      
      </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
               
                <SoftTypography variant="h3" fontWeight="medium">
                Exams for  Session {sessionId}
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
                <SoftBox p={3}>
                <SessionSchedule sessionId={sessionId} />
              </SoftBox>
               
            
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

     

    </DashboardLayout>
  );
}

export default Exams;