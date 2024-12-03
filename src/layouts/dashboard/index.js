import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";
// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

// Correct imports for services
import { DepartmentService } from 'services/dapartments/departmentService';
import { EnseignantService } from 'services/professors/enseignantService';
import { localService } from 'services/locaux/localService';
import { sessionService } from 'services/sessions/sessionService';

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const [departmentCount, setDepartmentCount] = useState(0);
  const [enseignantCount, setEnseignantCount] = useState(0);
  const [localCount, setLocalCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const departments = await DepartmentService.getCountDepartment();
        setDepartmentCount(departments);  // Ajoutez cette ligne
        
        const enseignants = await EnseignantService.getAllCountEnseignants();
        setEnseignantCount(enseignants);  // Ajoutez cette ligne
        
        const locals = await localService.getCountLocals();  // Correction du nom de méthode
        setLocalCount(locals);  // Ajoutez cette ligne
        
        const sessions = await sessionService.getCountSessions();
        setSessionCount(sessions);  // Ajoutez cette ligne
        
      } catch (error) {
        console.error("Détails complets de l'erreur:", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <DashboardLayout>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Nombre de Départements" }}
                count={` ${departmentCount} `}
                percentage={{ color: "success" }}
                icon={{ color: "info", component: "business" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Nombre d'Enseignants" }}
                count={` ${enseignantCount} `}
                percentage={{ color: "success" }}
                icon={{ color: "info", component: "school" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Nombre de Locaux" }}
                count={` ${localCount} `}
                percentage={{ color: "error" }}
                icon={{ color: "info", component: "home_work" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Nombre de Sessions" }}
                count={` ${sessionCount} `}
                percentage={{ color: "success" }}
                icon={{
                  color: "info",
                  component: "supervisor_account",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Site Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2024
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
