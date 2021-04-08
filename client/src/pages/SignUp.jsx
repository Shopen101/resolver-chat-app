import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { api } from '../config'

import { SnackBar } from '../components'
import { loginUser } from '../redux/action/index'
import { useDispatch } from 'react-redux';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()

    const [nameErr, setNameErr] = useState(false)
    const [surnameErr, setsurNameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)

    const [snackErrTxt, setSnackErrTxt] = useState('')

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        surname: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        event.target.name === 'name' && event.target.value.length < 2 ? setNameErr(true) : setNameErr(false)
        event.target.name === 'surname' && event.target.value.length < 2 ? setsurNameErr(true) : setsurNameErr(false)
        event.target.name === 'email' && event.target.value.length < 2 ? setEmailErr(true) : setEmailErr(false)
        event.target.name === 'password' && event.target.value.length < 8 ? setPassErr(true) : setPassErr(false)
    }

    const registerHandler = async () => {
        try {
            let userId = null
            let token = null

            let formToServer = {
                ...form,
                email: form.email.toLowerCase()
            }
            
            setSnackErrTxt('')
            await api.post('auth/register', { ...formToServer })
                .then(resp => {
                    token = resp.data.token
                    userId = resp.data.userId
                })
            dispatch(loginUser(token, userId, form.name, form.surname, false))
            history.push('/faq')
        } catch (err) {
            setSnackErrTxt(err.response.data.message)

            setTimeout(() => {
                setSnackErrTxt('')
            }, 3500);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            registerHandler()
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {snackErrTxt && <SnackBar messageErr={snackErrTxt} />}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Зарегистрироваться
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Имя"
                                autoFocus
                                onChange={changeHandler}
                                error={nameErr}
                                helperText={nameErr && 'минимальная длнна 2 символа!'}
                                onKeyPress={handleKeyPress}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Фамилия"
                                name="surname"
                                autoComplete="lname"
                                onChange={changeHandler}
                                error={surnameErr}
                                helperText={surnameErr && 'минимальная длнна 2 символа!'}
                                onKeyPress={handleKeyPress}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email адрес"
                                name="email"
                                autoComplete="email"
                                onChange={changeHandler}
                                error={emailErr}
                                helperText={emailErr && 'минимальная длнна 2 символа!'}
                                onKeyPress={handleKeyPress}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={changeHandler}
                                error={passErr}
                                helperText={passErr && 'минимальная длнна 8 символов!'}
                                onKeyPress={handleKeyPress}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={registerHandler}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/" variant="body2">Уже есть аккаунт? Войти</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={2}>
                <Copyright />
            </Box>
        </Container>
    );
}