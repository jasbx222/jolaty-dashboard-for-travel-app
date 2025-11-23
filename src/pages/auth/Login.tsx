import { useState, type ChangeEvent, type FormEvent } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useLoginMutation } from "./services";
import { EyeClosed, EyeIcon } from "lucide-react";

interface User {
  email: string;
  password: string;
  fcm_token: string;
}

const Login = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    fcm_token: "1",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusField, setFocusField] = useState<"email" | "password" | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const mutation = useLoginMutation("auth/login");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  return (
    <Box
      dir="rtl"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
    >
      <Box
        maxWidth={400}
        width="100%"
        boxShadow="0 15px 35px rgba(0,0,0,0.2)"
        borderRadius={4}
        p={5}
      >
        <Typography align="center" variant="h4" gutterBottom fontWeight={600}>
          تسجيل الدخول
        </Typography>

        {/* الشخصية المتحركة */}
        <Box className={`avatar ${focusField === "email" ? "looking" : ""} ${focusField === "password" ? "blinking" : ""}`} />

        <Typography mt={1} align="center" variant="body2" color="text.primary">
          أهلاً بعودتك! يمكنك المتابعة باستخدام بريدك الإلكتروني
        </Typography>

        <Stack component="form" onSubmit={handleSubmit} spacing={3} mt={3}>
          <TextField
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="البريد الإلكتروني"
            autoComplete="email"
            fullWidth
            required
            autoFocus
            onFocus={() => setFocusField("email")}
            onBlur={() => setFocusField(null)}
          />

          <TextField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="كلمة المرور"
            autoComplete="current-password"
            fullWidth
            required
            onFocus={() => setFocusField("password")}
            onBlur={() => setFocusField(null)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ p: 0 }}
                  >
                    {showPassword ? (
                      <EyeClosed width={22} height={22}  />
                    ) : (
                      <EyeIcon width={22} height={22} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 5px 20px rgba(122,145,255,0.4)",
              "&:hover": { boxShadow: "0 7px 25px rgba(122,145,255,0.5)" },
            }}
          >
            {mutation.isPending ? "جاري التحميل" : "تسجيل الدخول"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
