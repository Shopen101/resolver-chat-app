import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function MemoProblem({ width, name, helperText, error, onChange, value }) {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: width,
            },
        },
        scroll: {
            // overflowY: 'auto'
        }
    }));

    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    value={value}
                    id="outlined-multiline-static"
                    label="Опишите коротко решение проблемы..."
                    multiline
                    rows="4"
                    variant="outlined"
                    name={name}
                    helperText={helperText}
                    error={error}
                    onChange={onChange}

                />
            </div>
        </form>
    );
}
