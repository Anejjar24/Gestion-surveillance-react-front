
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

import Icon from "@mui/material/Icon";
const sessionsTableData = (sessions, onDeleteSessionClick, onEditSession) => {
  return {
    columns: [
      { name: "type", align: "center" },
      { name: "startDate", align: "center" },
      { name: "endDate", align: "center"},
      { name: "action", align: "center" },
    ],
    rows: sessions.map(session => ({
      session_id: session.session_id,
      type: session.type,
      startDate: session.startDate,
      endDate: session.endDate,
      action: (
        <SoftBox display="flex" justifyContent="center">
          
          <SoftButton 
            variant="text" 
            color="dark"
            onClick={() => onEditSession(session)}
          >
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
          <SoftButton 
            variant="text" 
            color="error"
            onClick={() => onDeleteSessionClick(session)}
          >
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
        </SoftBox>
      ),
    }))
  };
};

export default sessionsTableData;
