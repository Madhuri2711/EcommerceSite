import React from 'react'
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: "#FF69B4",
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        },
        border: '1px solid #FF69B4'
    },
    primary: {
        backgroundColor: "#f46b45",
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        },
        border: '1px solid #f46b45'
    },
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </Button>
    )
}