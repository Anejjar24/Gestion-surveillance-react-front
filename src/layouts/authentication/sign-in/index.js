import { useState } from "react";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";

function SignIn() {
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
        setMessage("Successful"); // Message de succès
        console.log("Authenticated user:", response.data);
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
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
            Sign in
          </SoftButton>
        </SoftBox>
        {/* Affichage du message */}
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
    </CoverLayout>
  );
}

export default SignIn;
