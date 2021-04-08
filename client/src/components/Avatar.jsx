import React from 'react'

import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    ava: {
        width: 40,
        height: 40,
        border: `2px solid #ccc`,
        borderRadius: '50%',
        background: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pAva: {
        fontSize: '21px',
        color: '#fff'
    }
}))

function Ava({ userName }) {
    const classes = useStyles()

    const StyledBadge = withStyles((theme) => ({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))(Badge)


    return (
        <div className={classes.root}>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <div className={classes.ava} >
                    <p className={classes.pAva} >{!!userName ? userName : null}</p>
                </div>
            </StyledBadge>
        </div>
    )
}

export default Ava
