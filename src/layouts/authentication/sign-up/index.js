import { useState } from "react";
import { useAuth } from 'services/authentification/AuthProvider';

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
import AuthService from "services/authentification/authService";
function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setMessage("Veuillez remplir tous les champs");
      return false;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return false;
    }

    if (password.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Veuillez entrer une adresse email valide");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(email, password);
      setMessage("Inscription réussie !");
      setTimeout(() => {
        navigate("/authentication/sign-in");
      }, 1500);
    } catch (error) {
      if (error.response?.status === 400) {
        setMessage("Email déjà utilisé");
      } else {
        setMessage("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasicLayout title="Créer un compte" description="Entrez vos informations pour vous inscrire" image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Inscription avec votre email
          </SoftTypography>
        </SoftBox>

        <SoftBox display="flex" justifyContent="center" mb={2}>
          <img
            src={mail}
            alt="Mail Icon"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain"
            }}
          />
        </SoftBox>

        <Separator />

        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Mot de passe
              </SoftTypography>
              <SoftInput
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Confirmer le mot de passe
              </SoftTypography>
              <SoftInput
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSignUp}
                disabled={isLoading}
              >
                <SoftTypography variant="h6" color="white">
                  {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </SoftTypography>
              </SoftButton>
            </SoftBox>

            {message && (
              <SoftBox mt={2} textAlign="center">
                <SoftTypography
                  variant="button"
                  color={message === "Inscription réussie !" ? "success" : "error"}
                >
                  {message}
                </SoftTypography>
              </SoftBox>
            )}

            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text">
                Déjà inscrit ?{" "}
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                >
                  Se connecter
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;