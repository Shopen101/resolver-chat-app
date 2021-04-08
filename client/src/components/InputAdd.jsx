import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function InputAdd({ width, label, name, helperText, error, onChange, value }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: width,
            },
        },
    }))

    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                value={value}
                variant="outlined"
                required
                id="standard-basic"
                label={label}
                name={name}
                helperText={helperText}
                error={error}
                onChange={onChange}
            />
        </form>
    );
}


export default InputAdd