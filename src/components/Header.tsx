import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import CustomizedSwitches from "./feature/MaterialUISwitch";
import { useNavigate } from "react-router-dom";
import { LogOut, User2Icon } from "lucide-react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useContextMode } from "../context/useContextMode";
import type { User } from "../pages/profile/Profile";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  3;
  const { toggleMode } = useContextMode();

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
   const userInfoString = localStorage.getItem("user");
const userInfo: User | null = userInfoString ? JSON.parse(userInfoString) : null;
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AppBar
      sx={{
        zIndex: "50",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          {""}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
            <Avatar
              alt={userInfo?.name}
              src="https:/"
              sx={{ width: 36, height: 36 }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                minWidth: 180,
                borderRadius: 2,
                boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
              },
            }}
          >
            <MenuItem
              onClick={() => navigate("/profile")}
              sx={{ px: 2, py: 1.5 }}
            >
              <ListItemIcon>
                <User2Icon size={20} />
              </ListItemIcon>
              <ListItemText primary="البروفايل" />
            </MenuItem>

            {/* <MenuItem onClick={handleClose} sx={{ px: 2, py: 1.5 }}>
              <ListItemIcon>
                <Settings size={20} />
              </ListItemIcon>
              <ListItemText primary="الإعدادات" />
            </MenuItem> */}

            <MenuItem onClick={Logout} sx={{ px: 2, py: 1.5, color: "red" }}>
              <ListItemIcon>
                <LogOut size={20} color="red" />
              </ListItemIcon>
              <ListItemText primary="تسجيل خروج" />
            </MenuItem>
          </Menu>

          {/* زر تبديل الثيم */}
          <Box
            onClick={toggleMode}
            sx={{
              zIndex: 2000,
            }}
          >
            <CustomizedSwitches />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
