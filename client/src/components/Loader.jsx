import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    circ: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '660px',
        height: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexFlow: 'column wrap',
        cursor: 'auto'
    },

    txt: {
        cursor: 'auto'
    }
}));

export default function Loader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.circ}>
                <h1 className={classes.txt}>Идёт загрузка, пожалуйста подождите!</h1>
                <CircularProgress />
            </div>
        </div>
    );
}
