// professorsTableData.js
import React from 'react';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";

const professorsTableData = (professors, onDeleteProfessorClick, onEditProfessorClick) => {
  return {
    columns: [
      { name: "name", align: "left" },
      { name: "email", align: "left" },
      { name: "department", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: professors.map(professor => ({
      id: professor.id,
      name: professor.nom + ' ' + professor.prenom,
      email: professor.email,
      department: professor.departement ? professor.departement.nom : 'N/A',
      action: (
        <SoftBox display="flex" justifyContent="center">
          <SoftButton
            variant="text"
            color="dark"
            onClick={() => onEditProfessorClick(professor)}
          >
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
          <SoftButton
            variant="text"
            color="error"
            onClick={() => onDeleteProfessorClick(professor)}
          >
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
        </SoftBox>
      ),
    }))
  };
};

export default professorsTableData;