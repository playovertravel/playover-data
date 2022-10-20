import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useUserAuth } from './UserAuthContext';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  let navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/playover-data/submit");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Box mt={5}>
        <Typography variant="h5" component="h2" color="white">
          Login
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          width: 700,
          padding: 5,
          margin: 5,
          color: 'black',
          borderRadius: 5,
          backgroundColor: 'white'
        }}
      >
        <TextField
          id="email" 
          name="email"
          label="Email" 
          margin="normal"
          variant="standard"
          color="primary"
          size="medium"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="password" 
          name="password"
          label="Password" 
          margin="normal"
          variant="standard"
          color="primary"
          type="password"
          size="medium"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <Button
            type="submit"
            variant="contained"
          >
            Login
          </Button>
      </Box>
    </form>
  )
}
