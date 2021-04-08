import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function InputFindField({ width, onChange, value, onKeyPress }) {
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
        <div className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Введите текст запроса" onChange={onChange} value={value} onKeyPress={onKeyPress} />
        </div>
    );
}


export default InputFindField