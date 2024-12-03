import React from 'react';
import SoftTypography from 'components/SoftTypography';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';

export default function localsTableData(
  locals, 
  handleDeleteLocalClick, 
  handleEditLocalClick
) {
  const columns = [
    { Header: 'Nom', accessor: 'nom', width: '25%' },
    { Header: 'Type', accessor: 'type', width: '25%' },
    { Header: 'Taille', accessor: 'taille', width: '20%' },
    { Header: 'Actions', accessor: 'actions', width: '30%', align: 'center' }
  ];

  const rows = locals.map((local) => ({
    nom: (
      <SoftTypography variant="caption" fontWeight="medium">
        {local.nom}
      </SoftTypography>
    ),
    type: (
      <SoftTypography variant="caption">
        {local.type}
      </SoftTypography>
    ),
    taille: (
      <SoftTypography variant="caption">
        {local.taille}
      </SoftTypography>
    ),
    actions: (
      <SoftBox display="flex" justifyContent="center" gap={2}>
        <SoftButton 
          color="info" 
          size="small" 
          onClick={() => handleEditLocalClick(local)}
        >
          Modifier
        </SoftButton>
        <SoftButton 
          color="danger" 
          size="small" 
          onClick={() => handleDeleteLocalClick(local)}
        >
          Supprimer
        </SoftButton>
      </SoftBox>
    )
  }));

  return { columns, rows };
}