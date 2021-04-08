import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { api } from '../config';
import { SnackBar } from '../components'

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignIn() {
    const history = useHistory()
    const login = useSelector(({ user }) => user.login)

    const [snackErrTxt, setSnackErrTxt] = useState('')

    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        event.target.name === 'email' && event.target.value.length < 2 ? setEmailErr(true) : setEmailErr(false)
        event.target.name === 'password' && event.target.value.length < 8 ? setPassErr(true) : setPassErr(false)
    }

    const authHandler = async () => {
        try {
            setSnackErrTxt('')
            await api.post('auth/login', { ...form })
                .then((response) => login(response.data.token, response.data.userId, response.data.name, response.data.surname, response.data.isAdmin, 0))
            history.push('/faq')
        } catch (err) {
            setSnackErrTxt(err.response.data.message)

            setTimeout(() => {
                setSnackErrTxt('')
            }, 3500);
        }

    }

    const classes = useStyles();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            authHandler()
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Войти в аккаунт Resolver
        </Typography>
                {snackErrTxt && <SnackBar messageErr={snackErrTxt} />}
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email адрес"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={changeHandler}
                        error={emailErr}
                        helperText={emailErr && 'минимальная длнна 2 символа!'}
                        onKeyPress={handleKeyPress}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={authHandler}
                    >
                        Войти</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/" variant="body2">
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Ещё нет аккаунта? Зарегистрируйтесь"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={4}>
                <Copyright />
            </Box>
        </Container>
    );
}