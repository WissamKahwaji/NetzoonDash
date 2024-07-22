import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface OrderLoginPageProps {
  onLogin: (t: boolean) => void;
}

const OrderLoginPage = ({ onLogin }: OrderLoginPageProps) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "NetAccountant" && password === "@!NetzoonAcc@") {
      localStorage.setItem("isOrderAuth", "true");
      onLogin(true);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        {t("login")}
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        fullWidth
        label={t("user_name")}
        value={username}
        onChange={e => setUsername(e.target.value)}
        sx={{ mb: 2, direction: "ltr" }}
      />
      <TextField
        fullWidth
        label={t("password")}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        sx={{ mb: 2, direction: "ltr" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        {t("login")}
      </Button>
    </Box>
  );
};

export default OrderLoginPage;
