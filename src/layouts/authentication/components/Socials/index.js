import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";

function Socials() {
  return (
    <SoftBox display="flex" justifyContent="center">
      <SoftButton variant="outlined" color="light" style={{ padding: "10px" }}>
        <img 
          src="/assets/images/mail.png"  // Adjust the image path if needed
          alt="Mail Icon"
          style={{
            width: "24px",   // Adjust width as needed
            height: "24px",  // Adjust height as needed
            objectFit: "contain"
          }}
        />
      </SoftButton>
    </SoftBox>
  );
}

export default Socials;






