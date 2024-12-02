import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SessionDateModal from "modals/sessions/SessionDateModal";
// Soft UI Dashboard React examples
import DashboardNavbar from "layouts/sessions/components/Navbar";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import session from "assets/images/session.png";
import curved0 from "assets/images/curved-images/curved0.jpg";
import { sessionService } from "services/sessions/sessionService"; 

import SoftButton from "components/SoftButton";

// Modal Component


function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
 
 

  useEffect(() => {
    const fetchSessionCount = async () => {
      try {
        const count = await sessionService.getCountSessions();
        setSessionCount(count);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de sessions :", error);
      }
    };

    fetchSessionCount();

    // Existing tab orientation logic
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  
  

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" width="100%" pl={4}> {/* Added pl={4} for padding-left */}
            <Grid item xs={8} display="flex" alignItems="center">
              <SoftAvatar
                src={session}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
              />
              <SoftBox height="100%" mt={0.5} lineHeight={1} ml={2}>
                <SoftTypography variant="h5" fontWeight="medium">
                   Manage Your Sessions
                </SoftTypography>
                
              </SoftBox>
            </Grid>
           
           
          </SoftBox>
        </Grid>
      </Card>
    </SoftBox>
  );
}
Header.propTypes = {
  onOpenModal: PropTypes.func.isRequired, // Validation de la prop
};
export default Header;