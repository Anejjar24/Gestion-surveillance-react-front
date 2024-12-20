/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftButton from "components/SoftButton";
import { BsBoxArrowInDownLeft } from "react-icons/bs";

import Icon from "@mui/material/Icon";
const optionsTableData = (
  options,
  onDeleteOptionClick,
  onEditOption,
  onNavigateToModules
) => {
  return {
    columns: [
      {
        name: "name",
        align: "center",
        customRender: (name, option) => (
          <span
            onClick={() => onNavigateToModules(option)}
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
    rows: options.map(option => ({
      id: option.id,
      name: option.nom,
      action: (
        <SoftBox display="flex" justifyContent="center" alignItems="center">
          <SoftButton
            variant="text"
            color="dark"
            onClick={() => onEditOption(option)}
          >
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
          <SoftButton
            variant="text"
            color="error"
            onClick={() => onDeleteOptionClick(option)}
          >
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
          <SoftButton
            variant="text"
            color="info"
            onClick={() => onNavigateToModules(option)}
            style={{ marginLeft: '8px' }}
          >
            <BsBoxArrowInDownLeft style={{ marginRight: '4px' }} />
            Modules
          </SoftButton>
        </SoftBox>
      ),
    }))
  };
};

export default optionsTableData;

