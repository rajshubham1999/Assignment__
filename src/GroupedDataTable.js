




// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const GroupedDataTable = ({ groupedData, groupByColumnHeader }) => {
//   return (
//     <TableContainer component={Paper} sx={{ mt: 3 }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>{groupByColumnHeader}</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>Subcategory</TableCell>
//             <TableCell>Created At</TableCell>
//             <TableCell>Updated At</TableCell>
//             <TableCell>Price</TableCell>
//             <TableCell>Sale Price</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {groupedData.map((group) => (
//             <React.Fragment key={group[groupByColumnHeader]}>
//               <TableRow>
//                 <TableCell colSpan={8}>{group[groupByColumnHeader]}</TableCell>
//               </TableRow>
//               {group.items.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell></TableCell>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{item.category}</TableCell>
//                   <TableCell>{item.subcategory}</TableCell>
//                   <TableCell>{item.createdAt}</TableCell>
//                   <TableCell>{item.updatedAt}</TableCell>
//                   <TableCell>{item.price}</TableCell>
//                   <TableCell>{item.sale_price}</TableCell>
//                 </TableRow>
//               ))}
//             </React.Fragment>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default GroupedDataTable;


import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const GroupedDataTable = ({ groupedData, groupByColumnHeader }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{groupByColumnHeader}</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Subcategory</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Sale Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedData.map((group) => (
            <React.Fragment key={group[groupByColumnHeader]}>
              <TableRow>
                <TableCell colSpan={8}>{group[groupByColumnHeader]}</TableCell>
              </TableRow>
              {group.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell></TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.subcategory}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.sale_price}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupedDataTable;
