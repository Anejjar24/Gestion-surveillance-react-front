
// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types"; // Import de prop-types
// import sessionService from "services/sessions/sessionService";
// import { useNavigate } from "react-router-dom"; // Pour la navigation
// // Fonction utilitaire pour générer toutes les dates entre deux dates
// const generateDates = (startDate, endDate) => {
//   const dates = [];
//   let currentDate = new Date(startDate);

//   while (currentDate <= new Date(endDate)) {
//     dates.push(new Date(currentDate).toISOString().split("T")[0]); // Format YYYY-MM-DD
//     currentDate.setDate(currentDate.getDate() + 1); // Ajoute 1 jour
//   }

//   return dates;
// };

// const SessionSchedule = ({ sessionId }) => {
//   const [schedule, setSchedule] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Hook pour la navigation

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       try {
//         const data = await sessionService.getSessionSchedule(sessionId);
//         setSchedule(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message); // Capture l'erreur
//         console.error("Error fetching schedule:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (sessionId) {
//       fetchSchedule();
//     }
//   }, [sessionId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching schedule: {error}</div>;
//   }

//   if (!schedule || !schedule.timeSlots || !schedule.startDate || !schedule.endDate) {
//     return <div>No schedule available for this session.</div>;
//   }

//   // Générer toutes les dates entre startDate et endDate
//   const dates = generateDates(schedule.startDate, schedule.endDate);
  

//   const handleCellClick = (date, slot) => {
   
//     const targetPage = `/exam/${sessionId}/${date}/${slot}`;
//     navigate(targetPage); // Redirige vers la page spécifique
//   };
  
// //   // Gestion du clic sur une cellule
// //   const handleCellClick = (date, slot) => {
// //     const targetPage = `/exam/${sessionId}/${date}/${slot}`;
// //     navigate(targetPage); // Redirige vers la page spécifique
// //   };
  

//   return (
//     <table style={{ borderCollapse: "collapse", width: "100%" }}>
//       <thead>
//         <tr>
//           <th style={{ border: "1px solid black", padding: "8px" ,textAlign: "center"}}>Date</th>
//           {schedule.timeSlots.map((slot, index) => (
//             <th
//               key={index}
//               style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}
//             >
//               {slot.time}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {dates.map((date, dateIndex) => (
//           <tr key={dateIndex}>
//             <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
//               {date}
//             </td>
//             {schedule.timeSlots.map((slot, slotIndex) => (
//               <td
//                 key={slotIndex}
//                 style={{
//                   border: "1px solid black",
//                   padding: "8px",
//                   textAlign: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => handleCellClick(date, slot.slot)} // Appelle handleCellClick avec la date et le slot
//               >
//                 {/* Cellule vide */}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// // Validation des props
// SessionSchedule.propTypes = {
//   sessionId: PropTypes.string.isRequired,
// };

// export default SessionSchedule;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sessionService from "services/sessions/sessionService";
import { useNavigate } from "react-router-dom";

const generateDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate).toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const SessionSchedule = ({ sessionId }) => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await sessionService.getSessionSchedule(sessionId);
        setSchedule(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSchedule();
    }
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching schedule: {error}</div>;
  }

  if (!schedule || !schedule.timeSlots || !schedule.startDate || !schedule.endDate) {
    return <div>No schedule available for this session.</div>;
  }

  const dates = generateDates(schedule.startDate, schedule.endDate);
  const handleCellClick = (date, slot, time) => {
    // Extraire startTime et endTime de time (format "HH:mm - HH:mm")
    const [startTime, endTime] = time.split(" - ");
    const targetPage = `/exam/${sessionId}/${date}/${slot}/${startTime}/${endTime}`;
    navigate(targetPage); // Redirige vers la page spécifique
  };
  

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Date</th>
          {schedule.timeSlots.map((slot, index) => (
            <th
              key={index}
              style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}
            >
              {slot.time}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dates.map((date, dateIndex) => (
          <tr key={dateIndex}>
            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
              {date}
            </td>
            {schedule.timeSlots.map((slot, slotIndex) => (
              <td
                key={slotIndex}
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCellClick(date, slot.slot, slot.time)}
              >
                {/* Cellule vide */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SessionSchedule.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export default SessionSchedule;