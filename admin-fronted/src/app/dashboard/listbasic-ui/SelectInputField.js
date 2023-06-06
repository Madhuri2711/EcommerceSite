import React from 'react';
import { TextField, makeStyles, MenuItem, Select } from '@material-ui/core';
// import './SelectInput.styles.css';
import { ErrorMessage } from 'formik'

const useStyles = makeStyles(theme => ({
    errorBorder: {
        border: '1px solid red',
        borderRadius: "4px",
        color: 'red',
        '& label': {
            color: "red",
        }
    },
    authformemail: {
        // background: "#131619",
        marginBottom: '8px',
        '& input': {
            // color: "#F3F3F3",
            // border: "1px solid #999C9F",
            fontFamily: "Konnect",
            // background: "#131619",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            borderRadius: "4px",
            marginBottom: '8px',
            width: "100%",
            "&:-webkit-autofill": {
                WebkitBoxShadow: '0 0 0 50px #131619 inset',
                WebkitTextFillColor: '#F3F3F3',
            }
        },
        '& .MuiFilledInput-root': {
            background: 'white'
        },
        '& label': {
            color: "black",
            // fontFamily: "Konnect",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "11px",
            textTransform: 'uppercase',
            lineHeight: "16px"
        },
        '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
            transform: "translate(20px, 20px)"
        },
        "& .MuiOutlinedInput-input": {
            // color: "#F3F3F3"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            // color: "#F3F3F3"
        },
        "& .MuiSelect-filled": {
            border: '1px solid #999C9F',
            borderRadius: '4px',
            paddingBottom: '7px',
            // color: '#F3F3F3',
        },
        "& svg": {
            // color: '#F3F3F3'
        },
    },
    '& . form-control': {
        width: '20%',
    },
    customMenu: {
        fontFamily: "Konnect",
        fontStyle: "normal",
        fontWeight: "normal",
        color: 'black',

    }
}));

const SelectInputField = (props) => {

    const classes = useStyles();
    const { label, id, default_label, name, onChange, error, options, ...rest } = props;
    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event);
    };

    return (
        <>
            <TextField
                name={name}
                id={id}
                label={label}
                className={classes.authformemail + (error ? classes.errorBorder : classes.authformemail)}
                InputLabelProps={{ shrink: true }}
                select
                value={value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                {...rest}
                InputProps={{ disableUnderline: true }}>
                {/* {default_label ? <>
                    <MenuItem className={classes.customMenu} >{default_label} </MenuItem>
                    {options?.map((option) => (
                        <MenuItem className={classes.customMenu} value={option._id}>{option.name}</MenuItem>
                    ))}</>  :*/}
                {options?.map((option) => (
                    <MenuItem className={classes.customMenu} value={option._id}>{option.name}</MenuItem>
                ))
                }
            </TextField>
            <ErrorMessage component="div" name={name} style={{ color: 'red', fontSize: '12px' }} />
        </>
    )
}

export default SelectInputField