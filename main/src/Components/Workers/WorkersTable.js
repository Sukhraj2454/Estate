import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {
      field:'workassigned',
      headerName:'Work Assigned',
      sortable: false,
      width:300

  },
 
  {
       field:'workstatus',
       headerName:'Work Status',
       sortable: false,
       width:130,
  },
  {
       field:'nooftasks',
       headerName:'Tasks Completed',
       width:'140',
       textAlign:'center',
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,typeofwork:'plumber',workassigned:'At main Building' ,workstatus:'in progress',nooftasks:'2' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,typeofwork:'electrician',workassigned:'At main Building' ,workstatus:'in progress',nooftasks:'4' },
  { id: 3, lastName: 'Lawrence', firstName: 'Jhonny', age: 35,typeofwork:'plumber',workassigned:'At main Building' ,workstatus:'in progress',nooftasks:'6' },
  { id: 4, lastName: 'Vinici', firstName: 'Dom', age: 42,typeofwork:'electrician',workassigned:'At main Building' ,workstatus:'in progress',nooftasks:'5' },
  { id: 5, lastName: 'Snow', firstName: 'Satpal', age: 35,typeofwork:'plumber',workassigned:'At main Building' ,workstatus:'in progress',nooftasks:'3' },
  
];

export default function WorkersTable() {
  return (
    <>
    <h2 style={{ textAlign:'center'}}>Workers Information</h2>
    <div className='grid' style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        
      />
    </div>
    </>
  );
}