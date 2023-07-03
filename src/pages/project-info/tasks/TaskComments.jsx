import { Comment, PostAdd, Send } from '@mui/icons-material';
import { Avatar, Box, Button, Chip, CircularProgress, Divider, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { getComments, postComment } from '../../../services/TaskServices';

function TaskComments({ id }) {

    const [ comments, setComments ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const commentInput = useRef();
    const handleComment = () => {
        const comment = commentInput.current.value;
        const d = new Date();
        const date = d.toISOString().slice(0,10);
        const time = d.toString().slice(16, 24);
        const userID = Cookies.get("id");
        postComment(id, userID, comment, date, time)
        .then(data => {
            console.log(data);
            setComments([
                ...comments,
                {
                    id: data.insertID,
                    comment: comment,
                    date: date,
                    time: time,
                    name: Cookies.get("name"),
                    user_id: userID
                }
            ])
        })
    }

    useEffect(() => {
        getComments(id)
        .then(data => {
            console.log(data);
            setComments(data);
        })
        .finally(() => setLoading(false))
    }, []);

    return (
        <Box>
            <Typography variant='h6' fontWeight="bold" color="#666" >Comments </Typography>
            <Paper variant='outlined' sx={{ p: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-evenly" spacing={2}>
                    <Avatar  > {Cookies.get("name")[0].toUpperCase()} </Avatar>
                    <TextField inputRef={commentInput} sx={{width: 200}} required label="Comment" multiline placeholder="Add a comment"/>
                    <Button variant="contained" onClick={handleComment}> 
                        Send
                    </Button>
                </Stack>
            </Paper>
            <Divider sx={{my: 1}} />
            <Box sx={{overflowY: "scroll", height: 300, paddingLeft: 2}}>
                {
                    loading 
                    ? <CircularProgress/>
                    : comments.length > 0
                        ? comments.map(c => (
                            <Stack key={c.id} direction="row" alignItems="center" spacing={2} m={1} >
                                <Tooltip title={c.name}>
                                    <Avatar sx={{ width: 34, height: 34 }}> {c.name[0].toUpperCase()} </Avatar>
                                </Tooltip>
                                <Paper  variant='outlined' sx={{ p: 1, width: "100%" }}>
                                    <Chip label={`${c.name} - ${c.date.slice(0,10)} - ${c.time}`} color='primary' />
                                    <Stack mt={1} direction="row" alignItems="center" justifyContent="space-evenly" spacing={1}>
                                        <TextField InputProps={{
                                            readOnly: true,
                                        }} fullWidth multiline  defaultValue={c.comment} />
                                    </Stack>
                                </Paper>
                            </Stack>
                        ))
                        : <Typography color="#333">No comments...</Typography>
                }
            </Box>
        </Box>

    );
}

export default TaskComments;