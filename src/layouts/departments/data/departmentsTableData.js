import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";

const departmentsTableData = (departments, onDeleteDepartmentClick, onEditDepartment) => {
  return {
    columns: [
      { name: "name", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: departments.map(department => ({
      id: department.id,
      name: department.nom,
      action: (
        <SoftBox display="flex" justifyContent="center">
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
        </SoftBox>
      ),
    }))
  };
};

export default departmentsTableData;