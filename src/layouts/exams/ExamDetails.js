// // import { useParams } from "react-router-dom";
// // import Grid from "@mui/material/Grid";
// // import Card from "@mui/material/Card";
// // import Icon from "@mui/material/Icon";
// // import SoftButton from "components/SoftButton";
// // import SoftBox from "components/SoftBox";
// // import SoftTypography from "components/SoftTypography";
// // import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// // import Header from "layouts/exams/components/Header";
// // import React, { useState, useEffect } from 'react';


// // import { useParams } from "react-router-dom";
// // import Grid from "@mui/material/Grid";
// // import Card from "@mui/material/Card";
// // import Icon from "@mui/material/Icon";
// // import SoftButton from "components/SoftButton";
// // import SoftBox from "components/SoftBox";
// // import SoftTypography from "components/SoftTypography";
// // import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// // import Header from "layouts/exams/components/Header";
// // import React, { useState, useEffect } from 'react';
// // import ExamAddModal from "./components/ExamAddModal";
// // import { sessionService } from 'services/sessions/sessionService';

// // function ExamDetails() {
// //   const { sessionId, date, slot } = useParams();
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [timeSlots, setTimeSlots] = useState([]);

// //   useEffect(() => {
// //     const loadExamDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const sessionData = await sessionService.getSessionSchedule(sessionId);
// //         setTimeSlots(sessionData.timeSlots);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     loadExamDetails();
// //   }, [sessionId]);

// //   const handleExamAdded = (newExam) => {
// //     // Rafraîchir les données après l'ajout d'un examen
// //     console.log('Nouvel examen ajouté:', newExam);
// //     // Vous pouvez ajouter ici la logique pour rafraîchir les données
// //   };

// //   return (
// //     <DashboardLayout>
// //       <Header />
// //       <SoftBox mt={5} mb={3}>
// //         {loading && <SoftTypography>Chargement des Exam Details...</SoftTypography>}
// //         {error && <SoftTypography color="error">Erreur de chargement: {error}</SoftTypography>}
// //       </SoftBox>
// //       <SoftBox py={3}>
// //         <SoftBox mb={3}>
// //           <Card>
// //             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
// //               <SoftBox mb={0.5} display="flex" alignItems="center">
// //                 <SoftTypography variant="h3" fontWeight="medium">
// //                   Exam Details
// //                 </SoftTypography>
// //               </SoftBox>
// //               <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
// //                 <SoftButton 
// //                   variant="gradient" 
// //                   color="info" 
// //                   sx={{ fontSize: '1rem' }}
// //                   onClick={() => setShowAddModal(true)}
// //                 >
// //                   <Icon sx={{ fontWeight: "bold" }}>add</Icon>
// //                   &nbsp;add new Exam
// //                 </SoftButton>
// //               </SoftBox>
// //             </SoftBox>

// //             <SoftBox p={3}>
// //               <Grid container spacing={3}>
// //                 <Grid item xs={12} md={6}>
// //                   <SoftTypography variant="h6">Session ID: {sessionId}</SoftTypography>
// //                   <SoftTypography variant="h6">Date: {date}</SoftTypography>
// //                   <SoftTypography variant="h6">Slot: {slot}</SoftTypography>
// //                 </Grid>
// //               </Grid>
// //             </SoftBox>
// //           </Card>
// //         </SoftBox>
// //       </SoftBox>

// //       <ExamAddModal
// //         show={showAddModal}
// //         onClose={() => setShowAddModal(false)}
// //         onExamAdded={handleExamAdded}
// //         sessionId={sessionId}
// //         date={date}
// //         slot={slot}
// //         timeSlots={timeSlots}
// //       />
// //     </DashboardLayout>
// //   );
// // }

// // export default ExamDetails;
// import { useParams } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
// import SoftButton from "components/SoftButton";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Header from "layouts/exams/components/Header";
// import React, { useState, useEffect } from 'react';
// import ExamAddModal from "modals/exams/ExamAddModal";
// import { sessionService } from 'services/sessions/sessionService';

// function ExamDetails() {
//   const { sessionId, date, slot, startTime, endTime } = useParams(); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [timeSlots, setTimeSlots] = useState([]);

//   useEffect(() => {
//     const loadExamDetails = async () => {
//       try {
//         setLoading(true);
//         const sessionData = await sessionService.getSessionSchedule(sessionId);
//         setTimeSlots(sessionData.timeSlots);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     loadExamDetails();
//   }, [sessionId]);

//   const handleExamAdded = (newExam) => {
//     // Rafraîchir les données après l'ajout d'un examen
//     console.log('Nouvel examen ajouté:', newExam);
//     // Vous pouvez ajouter ici la logique pour rafraîchir les données
//   };

//   return (
//     <DashboardLayout>
//       <Header />
//       <SoftBox mt={5} mb={3}>
//         {loading && <SoftTypography>Chargement des Exam Details...</SoftTypography>}
//         {error && <SoftTypography color="error">Erreur de chargement: {error}</SoftTypography>}
//       </SoftBox>
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card>
//             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//               <SoftBox mb={0.5} display="flex" alignItems="center">
//                 <SoftTypography variant="h3" fontWeight="medium">
//                   Exam Details
//                 </SoftTypography>
//               </SoftBox>
//               <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
//                 <SoftButton 
//                   variant="gradient" 
//                   color="info" 
//                   sx={{ fontSize: '1rem' }}
//                   onClick={() => setShowAddModal(true)}
//                 >
//                   <Icon sx={{ fontWeight: "bold" }}>add</Icon>
//                   &nbsp;add new Exam
//                 </SoftButton>
//               </SoftBox>
//             </SoftBox>

//             <SoftBox p={3}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <SoftTypography variant="h6">Session ID: {sessionId}</SoftTypography>
//                   <SoftTypography variant="h6">Date: {date}</SoftTypography>
//                   <SoftTypography variant="h6">Slot: {slot}</SoftTypography>
//                   <SoftTypography variant="h6">Start Time: {startTime}</SoftTypography>
//                   <SoftTypography variant="h6">End Time: {endTime}</SoftTypography>
//                 </Grid>
//               </Grid>
//             </SoftBox>
//           </Card>
//         </SoftBox>
//       </SoftBox>

//       <ExamAddModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onExamAdded={handleExamAdded}
//         sessionId={sessionId}
//         date={date}
//         slot={slot}
//         startTime={startTime}
//         endTime={endTime} 
//         timeSlots={timeSlots}
//       />
//     </DashboardLayout>
//   );
// }

// export default ExamDetails;



import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/exams/components/Header";
import React, { useState, useEffect } from 'react';
import ExamAddModal from "modals/exams/ExamAddModal";
import { sessionService } from 'services/sessions/sessionService';
import { examService } from 'services/exam/ExamService';
import { EnseignantService } from 'services/professors/enseignantService';
import { DepartmentService } from 'services/dapartments/departmentService';
import { ModuleService } from 'services/modules/ModuleService';
import { OptionService } from 'services/options/OptionService';
import { localService } from 'services/locaux/localService';




function ExamDetails() {
  const { sessionId, date, slot, startTime, endTime } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [moduleDetails, setModuleDetails] = useState(null);
  const [departmentDetails, setDepartmentDetails] = useState(null);
  const [optionDetails, setOptionDetails] = useState(null);
  const [locauxDetails, setLocauxDetails] = useState([]);

  // Fonction pour charger les examens de la session, date, et heure
  const loadExams = async () => {
    try {
      setLoading(true);
      const response = await examService.getExamsByDateAndTime(date, startTime, endTime, sessionId);
      setExams(response);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Chargement des détails de la session
  useEffect(() => {
    const loadExamDetails = async () => {
      try {
        setLoading(true);
        const sessionData = await sessionService.getSessionSchedule(sessionId);
        setTimeSlots(sessionData.timeSlots);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadExamDetails();
    loadExams();  // Charger les examens à chaque changement de sessionId, date, startTime ou endTime
  }, [sessionId, date, startTime, endTime]);

  // Fonction pour gérer l'ajout d'un examen
  const handleExamAdded = (newExam) => {
    console.log('Nouvel examen ajouté:', newExam);
    // Après l'ajout, on recharge les examens
    loadExams();
  };
  useEffect(() => {
    const loadModuleDepartmentOptionLocaux = async () => {
      try {
        // Récupérer les IDs du module, du département, de l'option depuis les examens ou session
        if (exams.length > 0) {
          const exam = exams[0];
          // Correct ID access based on your JSON structure
          const moduleId = exam.module.id;
          const departmentId = exam.departement.id;
          const optionId = exam.option.id;
          const locauxIds = exam.locaux.map(local => local.id);
  
          // Rest of the code remains the same
          const moduleData = await ModuleService.getModuleById(moduleId);
          const departmentData = await DepartmentService.getDepartmentById(departmentId);
          const optionData = await OptionService.getOptionById(optionId);
          
          // Map through the locauxIds and fetch data for each local
          const locauxDataPromises = locauxIds.map(id => localService.getLocalById(id));
          const locauxData = await Promise.all(locauxDataPromises);
  
          setModuleDetails(moduleData);
          setDepartmentDetails(departmentData);
          setOptionDetails(optionData);
          setLocauxDetails(locauxData);
        }
      } catch (err) {
        setError(err.message);
      }
    };
  
    loadModuleDepartmentOptionLocaux();
  }, [exams]); // Dépendance sur les examens pour charger les informations liées
  

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
       
      </SoftBox>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftBox mb={0.5} display="flex" alignItems="center">
                <SoftTypography variant="h3" fontWeight="medium">
                  Exam Details
                </SoftTypography>
              </SoftBox>
              <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
                <SoftButton 
                  variant="gradient" 
                  color="info" 
                  sx={{ fontSize: '1rem' }}
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new Exam
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      {/* Affichage des examens */}
      <SoftBox>
        {exams.length > 0 ? (
          exams.map((exam) => (
            <Card key={exam.id}>
              <SoftBox p={3}>
                <SoftTypography variant="h6">Exam ID: {exam.id}</SoftTypography>
                <SoftTypography variant="body1">Date: {exam.date}</SoftTypography>
                <SoftTypography variant="body1">Start Time: {exam.startTime}</SoftTypography>
                <SoftTypography variant="body1">End Time: {exam.endTime}</SoftTypography>

                {/* Affichage des détails du module, département, option et locaux */}
                {moduleDetails && (
                  <SoftTypography variant="h6">Module: {moduleDetails.nom}</SoftTypography>
                )}
                {departmentDetails && (
                  <SoftTypography variant="h6">Department: {departmentDetails.nom}</SoftTypography>
                )}
                {optionDetails && (
                  <SoftTypography variant="h6">Option: {optionDetails.nom}</SoftTypography>
                )}
                {locauxDetails.length > 0 && (
                  <SoftTypography variant="h6">
                    Locaux: {locauxDetails.map(local => local.nom).join(', ')}
                  </SoftTypography>
                )}
              </SoftBox>
            </Card>
          ))
        ) : (
          <SoftTypography>Aucun examen trouvé pour cette session.</SoftTypography>
        )}
      </SoftBox>

      {/* Modal d'ajout d'examen */}
      <ExamAddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onExamAdded={handleExamAdded}
        sessionId={sessionId}
        date={date}
        slot={slot}
        startTime={startTime}
        endTime={endTime} 
        timeSlots={timeSlots}
      />
    </DashboardLayout>
  );
}

export default ExamDetails;

// function ExamDetails() {
//   const { sessionId, date, slot, startTime, endTime } = useParams(); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [exams, setExams] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [moduleDetails, setModuleDetails] = useState(null);
//   const [departmentDetails, setDepartmentDetails] = useState(null);
//   const [optionDetails, setOptionDetails] = useState(null);
//   const [locauxDetails, setLocauxDetails] = useState([]);
//   // Fonction pour charger les examens de la session, date, et heure
//   const loadExams = async () => {
//     try {
//       setLoading(true);
//       const response = await examService.getExamsByDateAndTime(date, startTime, endTime, sessionId);
//       setExams(response);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Chargement des détails de la session
//   useEffect(() => {
//     const loadExamDetails = async () => {
//       try {
//         setLoading(true);
//         const sessionData = await sessionService.getSessionSchedule(sessionId);
//         setTimeSlots(sessionData.timeSlots);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     loadExamDetails();
//     loadExams();  // Charger les examens à chaque changement de sessionId, date, startTime ou endTime
//   }, [sessionId, date, startTime, endTime]);  // Déclenche le useEffect quand ces paramètres changent

//   // Fonction pour gérer l'ajout d'un examen
//   const handleExamAdded = (newExam) => {
//     console.log('Nouvel examen ajouté:', newExam);
//     // Après l'ajout, on recharge les examens
//     loadExams();
//   };

//   useEffect(() => {
//     const loadModuleDepartmentOptionLocaux = async () => {
//       try {
//         // Récupérer les informations du module, département, option et locaux
//         const moduleData = await ModuleService.getModuleById(sessionId); // Assurez-vous que l'ID du module est correct
//         const departmentData = await DepartmentService.getDepartmentById(sessionId); // Assurez-vous que l'ID du département est correct
//         const optionData = await OptionService.getOptionById(sessionId); // Assurez-vous que l'ID de l'option est correct
//         const locauxData = await localService.getLocalById(exams.map(exam => exam.locaux.map(local => local.id))); // Récupère les locaux liés aux examens

//         setModuleDetails(moduleData);
//         setDepartmentDetails(departmentData);
//         setOptionDetails(optionData);
//         setLocauxDetails(locauxData);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     loadModuleDepartmentOptionLocaux();
//   }, [sessionId, exams]);

//   return (
//     <DashboardLayout>
//       <Header />
//       <SoftBox mt={5} mb={3}>
//         {loading && <SoftTypography>Chargement des Exam Details...</SoftTypography>}
//         {error && <SoftTypography color="error">Erreur de chargement: {error}</SoftTypography>}
//       </SoftBox>
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card>
//             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//               <SoftBox mb={0.5} display="flex" alignItems="center">
//                 <SoftTypography variant="h3" fontWeight="medium">
//                   Exam Details
//                 </SoftTypography>
//               </SoftBox>
//               <SoftBox display="flex" justifyContent="flex-end" alignItems="center">
//                 <SoftButton 
//                   variant="gradient" 
//                   color="info" 
//                   sx={{ fontSize: '1rem' }}
//                   onClick={() => setShowAddModal(true)}
//                 >
//                   <Icon sx={{ fontWeight: "bold" }}>add</Icon>
//                   &nbsp;add new Exam
//                 </SoftButton>
//               </SoftBox>
//             </SoftBox>

           
//           </Card>
//         </SoftBox>
//       </SoftBox>

//       {/* Affichage des examens */}
//       <SoftBox>
//         {exams.length > 0 ? (
//           exams.map((exam) => (
//             <Card key={exam.id}>
//               <SoftBox p={3}>
//                 <SoftTypography variant="h6">Exam ID: {exam.id}</SoftTypography>
//                 <SoftTypography variant="body1">Date: {exam.date}</SoftTypography>
//                 <SoftTypography variant="body1">Start Time: {exam.startTime}</SoftTypography>
//                 <SoftTypography variant="body1">End Time: {exam.endTime}</SoftTypography>

//                  {/* Affichage des détails du module, département, option et locaux */}
//                  {moduleDetails && (
//                     <SoftTypography variant="h6">Module: {moduleDetails.name}</SoftTypography>
//                   )}
//                   {departmentDetails && (
//                     <SoftTypography variant="h6">Department: {departmentDetails.name}</SoftTypography>
//                   )}
//                   {optionDetails && (
//                     <SoftTypography variant="h6">Option: {optionDetails.name}</SoftTypography>
//                   )}
//                   {locauxDetails.length > 0 && (
//                     <SoftTypography variant="h6">
//                       Locaux: {locauxDetails.map(local => local.name).join(', ')}
//                     </SoftTypography>
//                   )}
                
//               </SoftBox>
//             </Card>
//           ))
//         ) : (
//           <SoftTypography>Aucun examen trouvé pour cette session.</SoftTypography>
//         )}
//       </SoftBox>

//       {/* Modal d'ajout d'examen */}
//       <ExamAddModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onExamAdded={handleExamAdded}
//         sessionId={sessionId}
//         date={date}
//         slot={slot}
//         startTime={startTime}
//         endTime={endTime} 
//         timeSlots={timeSlots}
//       />
//     </DashboardLayout>
//   );
// }

// export default ExamDetails;
