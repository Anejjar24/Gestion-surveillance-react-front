import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";

const localsTableData = (locals, onDeleteLocalClick, onEditLocal) => {
  return {
    columns: [
      { name: "nom", align: "center" },
      { name: "type", align: "center" },
      { name: "taille", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: locals.map(local => ({
      id: local.id,
      nom: local.nom,
      type: (
        <SoftBadge 
          variant="gradient" 
          color={
            local.type === 'Salle' ? 'secondary' :
            local.type === 'Amphi' ? 'dark' :
            
            'warning'
          }
        >
          {local.type}
        </SoftBadge>
      ),
      taille: `${local.taille}`,
      action: (
        <SoftBox display="flex" alignItems="center" justifyContent="center">
          <SoftButton 
            variant="text" 
            color="info" 
            onClick={() => onEditLocal(local)}
          >
            <Icon>edit</Icon>
          </SoftButton>
          <SoftButton 
            variant="text" 
            color="error" 
            onClick={() => onDeleteLocalClick(local)}
          >
            <Icon>delete</Icon>
          </SoftButton>
        </SoftBox>
      ),
    }))
  };
};

export default localsTableData;