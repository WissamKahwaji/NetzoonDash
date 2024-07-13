import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
