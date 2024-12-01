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



const sessionsTableData = (sessions) => {
  return {
    columns: [
      //{ name: "session_id", align: "center", },
      { name: "type", align: "center" },
      { name: "startDate", align: "center" },
      { name: "endDate", align: "center" }
    ],
    rows: sessions.map(session => ({
      session_id: session.session_id,
      type: session.type,
      startDate: session.startDate,
      endDate: session.endDate
    }))
  };
};

export default sessionsTableData;
