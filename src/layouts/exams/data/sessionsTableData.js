
// Mise à jour du fichier sessionsTableData.js
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import React from 'react';

import Card from "@mui/material/Card";


const SessionScheduleTable = ({ session }) => {
  // Fonction pour générer la liste des dates entre startDate et endDate
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dates = getDatesInRange(session.startDate, session.endDate);

  const slots = [
    {
      time: `${session.debutMatin1} - ${session.finMatin1}`,
      label: "Slot 1"
    },
    {
      time: `${session.debutMatin2} - ${session.finMatin2}`,
      label: "Slot 2"
    },
    {
      time: `${session.debutSoir1} - ${session.finSoir1}`,
      label: "Slot 3"
    },
    {
      time: `${session.debutSoir2} - ${session.finSoir2}`,
      label: "Slot 4"
    }
  ];

  return (
    <Card>
      <SoftBox p={3}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', border: '1px solid #ddd', background: '#f8f9fa', width: '200px' }}>
                <SoftTypography variant="subtitle2" fontWeight="medium">Jours</SoftTypography>
              </th>
              {slots.map((slot, index) => (
                <th key={index} style={{ padding: '12px', border: '1px solid #ddd', background: '#f8f9fa' }}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">{slot.label}</SoftTypography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date, idx) => (
              <tr key={idx}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <SoftTypography variant="body2">
                    {date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </SoftTypography>
                </td>
                {slots.map((slot, slotIdx) => (
                  <td key={slotIdx} style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                    <SoftTypography variant="body2">
                      {slot.time}
                    </SoftTypography>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </SoftBox>
    </Card>
  );
};

export default SessionScheduleTable;

// const SessionSlotTable = ({ session }) => {
//   const slots = [
//     {
//       time: `${session.debutMatin1} - ${session.finMatin1}`,
//       label: "Slot 1"
//     },
//     {
//       time: `${session.debutMatin2} - ${session.finMatin2}`,
//       label: "Slot 2"
//     },
//     {
//       time: `${session.debutSoir1} - ${session.finSoir1}`,
//       label: "Slot 3"
//     },
//     {
//       time: `${session.debutSoir2} - ${session.finSoir2}`,
//       label: "Slot 4"
//     }
//   ];

//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//       <thead>
//         <tr>
//           <th style={{ padding: '8px', border: '1px solid #ddd', background: '#f8f9fa' }}>Jours</th>
//           {slots.map((slot, index) => (
//             <th key={index} style={{ padding: '8px', border: '1px solid #ddd', background: '#f8f9fa' }}>
//               {slot.label}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td style={{ padding: '8px', border: '1px solid #ddd' }}>Jour début de la session</td>
//           {slots.map((slot, index) => (
//             <td key={index} style={{ padding: '8px', border: '1px solid #ddd' }}>
//               {slot.time}
//             </td>
//           ))}
//         </tr>
//         <tr>
//           <td style={{ padding: '8px', border: '1px solid #ddd' }}>2 ème jour</td>
//           {slots.map((slot, index) => (
//             <td key={index} style={{ padding: '8px', border: '1px solid #ddd' }}>
//               {slot.time}
//             </td>
//           ))}
//         </tr>
//         <tr>
//           <td style={{ padding: '8px', border: '1px solid #ddd' }}>3 ème jour</td>
//           {slots.map((slot, index) => (
//             <td key={index} style={{ padding: '8px', border: '1px solid #ddd' }}>
//               {slot.time}
//             </td>
//           ))}
//         </tr>
//         <tr>
//           <td style={{ padding: '8px', border: '1px solid #ddd' }}>Autres jours etc</td>
//           {slots.map((slot, index) => (
//             <td key={index} style={{ padding: '8px', border: '1px solid #ddd' }}>
//               {slot.time}
//             </td>
//           ))}
//         </tr>
//         <tr>
//           <td style={{ padding: '8px', border: '1px solid #ddd' }}>Dernière jour</td>
//           {slots.map((slot, index) => (
//             <td key={index} style={{ padding: '8px', border: '1px solid #ddd' }}>
//               {slot.time}
//             </td>
//           ))}
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// const sessionsTableData = (sessions, onDeleteSessionClick, onEditSession) => {
//   return {
//     columns: [
//       { name: "type", align: "center" },
//       { name: "startDate", align: "center" },
//       { name: "endDate", align: "center"},
//       { name: "slots", align: "center" },
//       { name: "action", align: "center" },
//     ],
//     rows: sessions.map(session => ({
//       type: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           {session.type}
//         </SoftTypography>
//       ),
//       startDate: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           {session.startDate}
//         </SoftTypography>
//       ),
//       endDate: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           {session.endDate}
//         </SoftTypography>
//       ),
//       slots: (
//         <SessionSlotTable session={session} />
//       ),
//       action: (
//         <SoftBox display="flex" justifyContent="center">
//           <SoftButton
//             variant="text"
//             color="dark"
//             onClick={() => onEditSession(session)}
//           >
//             <Icon>edit</Icon>&nbsp;edit
//           </SoftButton>
//           <SoftButton
//             variant="text"
//             color="error"
//             onClick={() => onDeleteSessionClick(session)}
//           >
//             <Icon>delete</Icon>&nbsp;delete
//           </SoftButton>
//         </SoftBox>
//       ),
//     }))
//   };
// };

// export default sessionsTableData;