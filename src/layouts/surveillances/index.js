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
import Header from "layouts/surveillances/components/Header";
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

import hourglass from 'assets/images/calendar.png';

//import SoftButton from "components/SoftButton";

function Surveillances() {
 

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
                Surveillances
                </SoftTypography>
                
                <SoftTypography variant="h4" color="primary" fontWeight="medium">
                &nbsp;  &nbsp;  &nbsp;
                (  ){/* Affichage du nombre de sessions */}
                </SoftTypography>
              </SoftBox>

              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                 
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new surveillence
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

     


    </DashboardLayout>
  );
}

export default Surveillances;