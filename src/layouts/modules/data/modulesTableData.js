import React from 'react';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
const modulesTableData = (modules, onDeleteModuleClick, onEditModuleClick) => {
  return {
    columns: [
      { name: "name", align: "center" },
      { name: "action", align: "center" },
    ],
    rows: modules.map((module) => ({
      id: module.id,
      name: module.nom,
      action: (
        <SoftBox display="flex" justifyContent="center">
          <SoftButton
            variant="text"
            color="dark"
            onClick={() => {
              // Add console.log to debug
              console.log('Module being edited:', module);
              onEditModuleClick(module);
            }}
          >
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
          <SoftButton
            variant="text"
            color="error"
            onClick={() => onDeleteModuleClick(module)}
          >
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
        </SoftBox>
      ),
    })),
  };
};



// const modulesTableData = (modules, onDeleteModuleClick, onEditModuleClick) => {
//   return {
//     columns: [
//       { name: "name", align: "center" },
//       { name: "action", align: "center" },
//     ],
//     rows: modules.map((module) => ({
//       id: module.id,
//       name: module.nom,
//       action: (
//         <SoftBox display="flex" justifyContent="center">
//           <SoftButton
//             variant="text"
//             color="dark"
//             onClick={() => onEditModuleClick(module)}
//           >
//             <Icon>edit</Icon>&nbsp;edit
//           </SoftButton>
//           <SoftButton
//             variant="text"
//             color="error"
//             onClick={() => onDeleteModuleClick(module)}
//           >
//             <Icon>delete</Icon>&nbsp;delete
//           </SoftButton>
//         </SoftBox>
//       ),
//     })),
//   };
// };

 export default modulesTableData;
