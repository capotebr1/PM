import React, { useRef, useState } from 'react';
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AutoAwesome } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginUser } from '../../services/UserServices';

function LoginPage() {
    const navigate = useNavigate();
    const inputEmail = useRef();
    const inputPassword = useRef(); 
    const [ error , setError ] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        navigate("/register");
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(false);
        const useremail = inputEmail.current.value
        const userpassword = inputPassword.current.value
        try{
            const [ request ] = await loginUser(useremail, userpassword)
            const { id, name, email } = request;
    
            Cookies.set("id" , id, {expires : 10000});
            Cookies.set("name" , name, {expires : 10000});
            Cookies.set("email" , email, {expires : 10000});
            navigate("/"); 
        }
        catch(error){
            console.error(error);
            setError(true);
        }
    }

    return (
        <Container maxWidth="xs" sx={{
            textAlign: "center",
            p: 4,
            mt: 2,
            bgcolor: "#fff",
            boxShadow: "0px 15px 25px rgba(0, 0, 0, .15);" ,
            borderRadius: 1
        }}>
            <Typography variant='h3' fontWeight="bold" gutterBottom color="#3a86ff">
                <AutoAwesome fontSize='200px' color='secondary'/>
                <AssignmentIcon fontSize='200px'/>
                <AutoAwesome fontSize='200px' color='secondary'/>
                <br />
                Project Manager
            </Typography>
            <Typography variant='h4' fontWeight="bold" gutterBottom color="#333">
                Login
            </Typography>
            {
                error ? 
                <Alert severity="error" sx={{ mb: 2}}>Error, invalid User or Email logged!</Alert>
                :
                null
            }
            <form action="" style={{
                display: "flex",
                flexDirection: "column",
                gap: 20
            }}>
                 <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TextField label="Email" required inputRef={inputEmail}/>
                    <TextField label="Password" type='password' required inputRef={inputPassword}/>
                </Box>

                <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyItems="center"
                    flexDirection="column"
                >
                    <Button variant='contained' color='primary' type='submit' onClick={handleSignUp}>
                        Sign in
                    </Button>
                    <Box>
                        <Typography>Don't have an account?</Typography>
                        <Button variant='contained' color='secondary' type='submit' onClick={handleRegister}>
                            Create new one
                        </Button>
                    </Box>
                </Box>

            </form>
        </Container>
    );
}

export default LoginPage;