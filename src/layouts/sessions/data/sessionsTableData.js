
import SoftBox from "components/SoftBox";

import SoftButton from "components/SoftButton";

import Icon from "@mui/material/Icon";

import { RxOpenInNewWindow } from "react-icons/rx";


import { useNavigate } from "react-router-dom";
import newWindowIcon from "assets/images/new-window.png";

const sessionsTableData = (sessions, onDeleteSessionClick, onEditSession) => {
  const navigate = useNavigate();

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

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
        <SoftBox display="flex" justifyContent="center" alignItems="center">
          <SoftButton
            variant="text"
            color="info"
            onClick={handleOpenDashboard}
            sx={{ 
              minWidth: 'auto', 
              padding: '4px', 
              '& img': { width: '34px', height: '34px' } 
            }}
          >
                        <RxOpenInNewWindow style={{ marginRight: '4px',fontSize: '50px !important' }} />

          </SoftButton>
          
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