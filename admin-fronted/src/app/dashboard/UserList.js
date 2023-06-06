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
import { Badge } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import Popup from "../dashboard/listbasic-ui/Popup";
import EmailSetting from '../shared/EmailSetting';
import Checkbox from "@mui/material/Checkbox";

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
    { id: 'username', label: 'Username' },
    { id: 'fullname', label: 'FullName' },
    // { id: 'image', label: 'Image' },
    { id: 'email', label: 'Email' },
    { id: 'status', label: 'IsActive' },
    { id: 'deleted', label: 'IsDelete' },
    // { id: 'otherImage', label: 'OtherImage' },
    { id: 'created_date', label: 'Created Date' },
    { id: 'actions', label: 'Details', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

const UserList = () => {
    const classes = useStyles();
    const [users, setusers] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const [loading, setloading] = useState(false);
    const [Message, setMessage] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const GET_ALL_USER = `${BASE_URL}user`

    useEffect(() => {
        fetchAllUser();
    }, []);

    const fetchAllUser = async () => {
        try {
            const { data } = await axios.get(GET_ALL_USER, {
                headers: { "Authorization": `${TOKEN}` }
            })
            setusers(data?.data)
            setloading(true);
        }
        catch (e) {
            console.log(e);
        }
    }
    const deleteUser = async (id, deleted) => {
        //console.log(deleted)
        try {
            const postData = {
                is_delete: !deleted
            }
            const { data } = await axios.put(`${GET_ALL_USER}/isdelete/${id}`, postData, {
                headers: { "Authorization": `${TOKEN}` }
            })
            setConfirmDialog(false)
            // setusers(data?.data)
            fetchAllUser()

            // setNotify({
            //     isOpen: true,
            //     message: 'Deleted Successfully',
            //     type: 'success'
            // })

        }
        catch (e) {
            console.log(e);
        }
    }

    const isActiveUser = async (id, isActive) => {
        try {
            const postData = {
                isActive: !isActive
            }
            const { data } = await axios.put(`${GET_ALL_USER}/${id}`, postData, {
                headers: { "Authorization": `${TOKEN}` }
            })
            // setusers(data?.data)
            fetchAllUser();
            setConfirmDialog(false)
            // setloading(true);

        }
        catch (e) {
            console.log(e);
        }
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(users, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.userName.toLowerCase().includes(target.value))
            }
        })
    }

    const listforSendEmail = () =>{
        setOpenPopup(false);
        setNotify({
            isOpen: true,
            message: 'Email Sent Successfully',
            type: 'success'
        })
    }

    return (
        <>
            <div className='heading'>
                <h2>UserList</h2>
            </div>
            <MaUTable>
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Input
                            label="Search UserName"
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
                        <Controls.Button
                            text="Send"
                            variant="outlined"
                            color="newbtn"
                            startIcon={<SendIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true); }}
                            />
                    </Toolbar>
                    <TblContainer>
                        <TblHead />                                               
                        {
                            <Box sx={{ position: 'relative', display: 'inline-flex', left: '50%' }}>
                                {Message}
                            </Box>
                        }
                        <TableBody>
                            {
                                loading ?
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item._id}>
                                        {/* <TableCell>{item?.indexNewNumber}</TableCell> */}
                                        
                                        <TableCell style={{ textTransform: 'capitalize' }}>{item?.userName}</TableCell>
                                        <TableCell style={{ textTransform: 'capitalize', width: '150px' }}>{item?.firstName + " " + item?.lastName} </TableCell>
                                        {/* <TableCell>
                                            <img width={100} src={item?.image} />
                                        </TableCell> */}
                                        <TableCell style={{ textTransform: 'capitalize' }}>{item?.email}</TableCell>
                                        <TableCell>
                                            {item?.isActive === true ?
                                                <h4>
                                                    <Badge bg="success">Yes</Badge>
                                                </h4>
                                                : <h4> <Badge bg="danger">No</Badge> </h4>
                                            }
                                            {/* {item?.isActive === true ?
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { isActiveUser(item?._id, item?.isActive) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span> :
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { isActiveUser(item?._id, item?.isActive) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>InActive</span>}
                                                 */}
                                        </TableCell>
                                        {/* <TableCell>{item?.otherImage}</TableCell> */}
                                        < TableCell >
                                            {item?.is_delete === true ?
                                                <h4>
                                                    <Badge bg="success">Yes</Badge>
                                                </h4>
                                                : <h4> <Badge bg="danger">No</Badge> </h4>
                                            }
                                            {/* {item?.is_delete === true ?
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span>
                                                :
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>Deleted</span>}
                                                 */}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                moment(item?.created_date).format("DD-MM-YYYY")
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/user/${item._id}`}>
                                                View Details
                                                {/* <Controls.ActionButton
                                                    color="primary">
                                                    <EditOutlinedIcon fontSize="small" className='iconcolor' />
                                                </Controls.ActionButton> */}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { deleteUser(item?._id, item?.is_delete) }
                                                    })
                                                }}>
                                                <DeleteIcon fontSize="small" className='iconcolor' />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>)
                                    ) : <LoadingSpinner />
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Paper>
                <Popup
                    title="Email Setting"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                <EmailSetting
                    listforSendEmail={listforSendEmail}
                />
                </Popup>
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

export default UserList