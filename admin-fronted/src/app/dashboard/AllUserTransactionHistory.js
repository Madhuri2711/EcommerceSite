import React, { useEffect, useState } from 'react'
import { BASE_URL, TOKEN } from '../../lib/constant';
import axios from "axios";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../dashboard/listbasic-ui/useTable';
import Controls from '../dashboard/listbasic-ui/Controls';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from '../dashboard/listbasic-ui/Notification';
import ConfirmDialog from '../dashboard/listbasic-ui/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import '../dashboard/listbasic-ui/icon.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LoadingSpinner from './listbasic-ui/LoadingSpinner';
import Box from '@mui/material/Box';
import MaUTable from '@material-ui/core/Table';
const moment = require('moment');
const useStyles = makeStyles(theme => ({
    pageContent: {
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '75%',
        position: 'absolute',
        left: '0px'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    // { id: 'id', label: 'Id' },
    // { id: 'image', label: 'Image' },
    { id: 'amount', label: 'Amount' },
    { id: 'amount-type', label: 'Amount Type' },
    // { id: 'is_offer_active', label: 'Active Status' },
    { id: 'created_date', label: 'Created Date' },
]
const AllUserTransactionHistory = ({ transHistory, loading, Message }) => {

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(transHistory, headCells, filterFn);
    // console.log(recordsAfterPagingAndSorting())
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.amount.toLowerCase().includes(target.value))
            }
        })
    }
    return (
        <>
            <MaUTable>
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search amount"
                            className={classes.searchInput}
                            id="standard-size-small"
                            size="small"
                            variant="standard"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                    </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                loading ?
                                    <LoadingSpinner />
                                :
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item._id}>

                                        <TableCell style={{ textTransform: 'capitalize' }}>{item?.amount}</TableCell>
                                        <TableCell style={{ textTransform: 'capitalize' }}>{item?.amount_type}</TableCell>

                                        <TableCell>
                                            {
                                                moment(item?.created_date).format("DD-MM-YYYY")
                                            }
                                        </TableCell>

                                    </TableRow>)
                                    )
                            }
                        </TableBody>
                    </TblContainer>
                    {(transHistory.length == 0 && !loading) ? <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        {'No Data Found.'}
                    </div> : ''}
                    <TblPagination />
                </Paper>
            </MaUTable >
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default AllUserTransactionHistory