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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import axios from "axios";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import mail from "assets/images/mail.png";  // Assurez-vous que le chemin est correct
import { useNavigate } from "react-router-dom"; // Importez useNavigate
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher le message

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter your email and password");
      return;
    }

    try {
      const response = await axios.post("/ProjetWeb/users/login", { email, password });

      if (response.status === 200) {
        navigate("/Sessions");
        //setMessage("Successful"); // Message de succès
        //console.log("Authenticated user:", response.data);
        // Redirection ou traitement supplémentaire ici
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login");
    }
  };
  return (
    <BasicLayout
      title="Welcome Back"
      description="We're glad to see you again."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={0} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Sign In With Your Email
          </SoftTypography>
        </SoftBox>
          {/* Image Icon */}
          <SoftBox display="flex" justifyContent="center" mb={2}>
          <img 
            src={mail} 
            alt="Mail Icon"
            style={{
              width: "50px",   // Ajustez la taille de l'icône
              height: "50px",  // Ajustez la taille de l'icône
              objectFit: "contain"
            }}
          />
        </SoftBox>

        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
          <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email"  value={email}
            onChange={(e) => setEmail(e.target.value)} />
            </SoftBox>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password"   value={password}
            onChange={(e) => setPassword(e.target.value)} />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
             
             
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
              <SoftTypography  variant="h5" color="lignt" > Sign In</SoftTypography>
               
              </SoftButton>
            </SoftBox>
            {message && (
          <SoftBox mt={3} textAlign="center">
            <SoftTypography
              variant="subtitle1"
              color={message === "Successful" ? "success" : "error"}
            >
              {message}
            </SoftTypography>
          </SoftBox>
        )}
           
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
