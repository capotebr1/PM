import React, { useEffect, useRef, useState } from 'react';

import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AssignmentInd, AutoAwesome, Google } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Register() {
    const navigate = useNavigate();
    const inputPassword1 = useRef();
    const inputName = useRef();
    const inputPassword2 = useRef();
    const inputEmail = useRef();
    const [ error , setError ] = useState();
    const [ errorMessage, setErrorMessage ] = useState();

    useEffect(() => {
        setError(false);
        setErrorMessage("");
    }, [])

    const handleRegister = e => {
        e.preventDefault();
        setError(false);

        if(inputPassword1.current.value === inputPassword2.current.value){

            const user = {
                name: inputName.current.value,
                email: inputEmail.current.value,
                password: inputPassword1.current.value
            }
            fetch("http://localhost:5000/users/add", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(user)
            })
            .then( response => response.json() )
            .then( data => {
                Cookies.set("id", data.insertId);
                Cookies.set("name", user.name);
                Cookies.set("email", user.email);
                navigate("/");
            });
        }
        else{
            setErrorMessage("Passwords must be the same");
            setError(true);
        }

    }

    return (
        <Container maxWidth="xs" sx={{
            textAlign: "center",
            p: 4,
            mt: 2,
            bgcolor: "#fff" ,
            boxShadow: "0px 15px 25px rgba(131, 56, 236, .25);" ,
            borderRadius: 5
        }}>
            <Typography variant='h3' fontWeight="bold" gutterBottom color="#3a86ff">
                <AutoAwesome fontSize='200px' color='secondary'/>
                <AssignmentIcon fontSize='200px'/>
                <AutoAwesome fontSize='200px' color='secondary'/>
                <br />
                Project Manager
            </Typography>
            <Typography variant='h4' fontWeight="bold" gutterBottom color="#333">
                Register
            </Typography>
            {
                error ? 
                <Alert severity="error" sx={{ mb: 2}}>{errorMessage}</Alert>
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
                    <TextField label="Name" required inputRef={inputName}/>
                    <TextField label="Email" type='email' required inputRef={inputEmail}/>
                    <TextField label="Password" type='password' required inputRef={inputPassword1}/>
                    <TextField label="Repeat Password" type='password' required inputRef={inputPassword2}/>
                </Box>
                <Box display={"flex"} gap={2} alignItems={"center"} justifyContent={"center"}>
                    <Button  variant='contained' color='primary' onClick={handleRegister} sx={{
                        alignSelf: "center"
                    }}>
                        Create account
                    </Button>
                    <Button  variant='contained' color='secondary' onClick={() => navigate(-1)} sx={{
                        alignSelf: "center"
                    }}>
                         <ArrowBackIcon/>  Go back
                    </Button>
                </Box>

            </form>
        </Container>
    );
}

export default Register;