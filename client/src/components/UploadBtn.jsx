import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },

    btnWidth: {
        width: '140px'
    },
}));

export default function UploadButtons({ onClick }) {
    const classes = useStyles()

    return (
        <div>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button
                    className={classes.btnWidth}
                    variant="contained"
                    color="default"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    onClick={onClick}>
                    Файл
                </Button>
            </label>
        </div>
    );
}
