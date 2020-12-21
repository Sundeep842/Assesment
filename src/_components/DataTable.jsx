import { TableContainer,Table,TableHead,TableBody,TableRow,TablePagination,TableCell } from  "@material-ui/core";
import React from 'react';
import {useState} from 'react';

import { TableSortLabel } from '@material-ui/core';
import { stableSort,getComparator } from '@material-ui/core/TableSortLabel';



function DataTable(data) {
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState(5);
    const [searchItem,setSearchItem]=useState()
    function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
    const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'id' },
        { id: 'role', numeric: false, disablePadding: false, label: 'role' },
        { id: 'createdDate', numeric: true, disablePadding: false, label: 'createdDate' },
        { id: 'firstName', numeric: false, disablePadding: false, label: 'firstName' },
        { id: 'lastName', numeric: false, disablePadding: false, label: 'lastName' },
      ];
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
      };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    const handleSearch = (event)=>{
        setSearchItem(event.target.value)
      }
    const handledSearch=(data)=>{
        if(searchItem){
        const x =data.filter(item=>item.firstName===searchItem)
          console.log(x)  
        return x==null? data:x
       }
       else {return data}
     }
    return (
        <React.Fragment>
              Search first name:
            <input type="text" name="Search first name" onChange={handleSearch}/>
            <TableContainer>     
                <Table>
                    <TableHead>
                          {headCells.map((headCell) => (
                          <TableCell   key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}>
                           <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : 'asc'}
                               onClick={createSortHandler(headCell.id)} >
                              <h4>{headCell.label}</h4>{orderBy === headCell.id ? (
                                <span>
                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                 </span>
                                   ) : null}
                             </TableSortLabel>
                   </TableCell>))}
                </TableHead>
                    <TableBody>
                                {stableSort(handledSearch(data.data.items), getComparator(order, orderBy))

                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, index) =>
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.role}</TableCell>
                         <TableCell>{user.createdDate}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                         <TableCell>{user.lastName}</TableCell>
                   </TableRow>
        )}
        </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[0,5,10]} count={100}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            component="div"
                page={page}/> 
                <TableSortLabel/>
    </TableContainer>
        </React.Fragment>
    )
}

export default DataTable