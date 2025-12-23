import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';

import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";

const SignUpPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    let passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      let result = await context.register(userName, password);
      setRegistered(result);
    }
  };

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={4} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Create an account to save favourites and reviews.
          </Typography>

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Min 8 chars, 1 number & 1 symbol"
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={register}
          >
            Register
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUpPage;