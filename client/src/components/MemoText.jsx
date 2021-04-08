import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function MemoText({ width, userTextValue, onChange, onKeyPress}) {

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
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Опишите вашу проблему..."
                    multiline
                    rows="4"
                    variant="outlined"
                    value={userTextValue}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            </div>
        </form>
    );
}
