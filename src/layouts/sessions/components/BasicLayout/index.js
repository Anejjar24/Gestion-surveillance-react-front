import React from "react";
import PropTypes from "prop-types";
// @mui material components
import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import PageLayout from "examples/LayoutContainers/PageLayout";
// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

function BasicLayout({ title, description, image, children }) {
  return (
    <PageLayout>
      <SoftBox
        sx={{
          margin: "0 auto", // Centrer le contenu horizontalement
          padding: "0 16px", // Ajouter une marge intérieure pour les petits écrans
          maxWidth: "1200px", // Limiter la largeur pour éviter de prendre toute la page
          boxSizing: "border-box", // Assurer que la largeur inclut les paddings
        }}
      >
        {image && (
          <SoftBox
            sx={{
              background: `
                linear-gradient(
                  rgba(gradients.dark.main, 0.6),
                  rgba(gradients.dark.state, 0.6)
                ), 
                url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              margin: "16px 0", // Ajouter une marge verticale autour du background
            }}
          >
            <SoftBox textAlign="center" py={3}>
              <SoftTypography variant="h4" fontWeight="bold" color="white">
                {title}
              </SoftTypography>
              <SoftTypography variant="body1" color="white">
                {description}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        )}
        <SoftBox mt={3}>{children}</SoftBox>
      </SoftBox>
      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
