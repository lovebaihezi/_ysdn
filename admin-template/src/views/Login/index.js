import {
    Button,
    CircularProgress,
    Container,
    Grid,
    InputAdornment,
    Snackbar,
    TextField,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { AccountCircle } from '@material-ui/icons';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import SecurityIcon from '@material-ui/icons/Security';
import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router';
import { useAuth } from 'index';

const baseurl = 'http://localhost:5050';

const Login = () => {
    const [session, setSession] = useAuth();
    const History = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState(null);
    const [fetchError, setFetchError] = useState();
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const [Message, setMessage] = useState();
    const [open, setOpen] = useState(false);
    const login = async () => {
        if (/^\w{4,20}$/g.test(username) && /^\w{4,20}$/g.test(password)) {
            setDisable(true);
            setLoading(true);
            try {
                const result = await fetch(`${baseurl}/admin/login`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify({ username, password }),
                });
                console.log(result);
                setLoading(false);
                setRes(result);
            } catch (e) {
                setLoading(false);
                setDisable(false);
                setFetchError(e);
            }
        } else {
            setOpen(true);
            setMessage({ message: '无效输入', MessageType: 'warning' });
        }
    };
    if (session) {
        return <Redirect to="/admin" />;
    }
    useEffect(() => {
        if (res !== null && res.status === 200) {
            History.push('/admin');
            setSession('administrator');
        } else if ((res !== null && res?.status !== 200) || fetchError) {
            setDisable(false);
            setOpen(true);
            if (fetchError) {
                setMessage({
                    message: fetchError.message,
                    MessageType: 'error',
                });
            } else {
                setMessage({
                    message: '不正确的用户名或密码',
                    MessageType: 'error',
                });
            }
        }
    }, [res, fetchError]);
    return (
        <Container style={{ marginTop: 120 }}>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {Message ? (
                    <MuiAlert
                        severity={Message.MessageType}
                        elevation={6}
                        variant="filled"
                    >
                        {Message.message}
                    </MuiAlert>
                ) : undefined}
            </Snackbar>
            <form>
                <Grid container spacing={3} justify="center">
                    {/* <Grid item xs={6}>
                        <Card>
                            <CardMedia image="https://img.goldposter.com/wallpaper/2019/12/RoadTreeYellowAutumn915783773e87ac59bf0675f64b709d08_wallpaper_goldposter_com_.jpeg?x-oss-process=image/resize,m_fill,h_1024,w_819" />
                        </Card>
                    </Grid> */}
                    <Grid item xs={6}>
                        <Grid container spacing={8} justify="center">
                            <Grid item>
                                <SecurityIcon
                                    style={{ fontSize: 72, margin: '0 auto' }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    style={{ width: 480 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    label="管理员帐号"
                                    variant="outlined"
                                    onChange={({ currentTarget }) =>
                                        setUsername(currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    style={{ width: 480 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FingerprintIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    label="密码"
                                    variant="outlined"
                                    onChange={({ currentTarget }) =>
                                        setPassword(currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    disabled={disable}
                                    onClick={() => login()}
                                    variant="contained"
                                    color="primary"
                                >
                                    {loading ? (
                                        <CircularProgress color="primary" />
                                    ) : (
                                        '登录'
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
export default Login;
