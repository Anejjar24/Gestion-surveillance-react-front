import React from 'react';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import { BsBoxArrowInDownLeft } from "react-icons/bs";

const departmentsTableData = (
  departments, 
  onDeleteDepartmentClick, 
  onEditDepartment, 
  onNavigateToProfessors
) => {
  return {
    columns: [
      {
        name: "name",
        align: "center",
        customRender: (name, department) => (
          <span
            onClick={() => onNavigateToProfessors(department)}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'blue'
            }}
          >
            {name}
          </span>
        )
      },
      { name: "action", align: "center" },
    ],
    rows: departments.map(department => ({
      id: department.id,
      name: department.nom,
      action: (
        <SoftBox display="flex" justifyContent="center" alignItems="center">
          <SoftButton
            variant="text"
            color="dark"
            onClick={() => onEditDepartment(department)}
          >
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
          <SoftButton
            variant="text"
            color="error"
            onClick={() => onDeleteDepartmentClick(department)}
          >
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
          <SoftButton
            variant="text"
            color="info"
            onClick={() => onNavigateToProfessors(department)}
            style={{ marginLeft: '8px' }}
          >
            <BsBoxArrowInDownLeft style={{ marginRight: '4px' }} />
            Professors
          </SoftButton>
        </SoftBox>
      ),
    }))
  };
};

export default departmentsTableData;