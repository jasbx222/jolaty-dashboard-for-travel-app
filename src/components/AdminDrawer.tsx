import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  MenuIcon,
  MapPin,
  Users,
  ImageIcon,

  X,

  LucideHome,
  NotebookPen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useOptions } from "./feature/useOptions";

export default function AdminDrawer({
  onToggle,
}: {
  onToggle: (v: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const { option1 } = useOptions();

  // فتح/إغلاق السايد بار
  const toggleDrawer =
    (state: boolean) =>
    ( ) => {
      setOpen(state);
      onToggle(state);
    };

  const drawerItems = [
    { text: "الرئيسية", icon: <LucideHome />, href: "/home" },
    { text: "الوجهات", icon: <MapPin />, href: "/destination" },
    { text: "الدول", icon: <MapPin />, href: "/countries" },
    { text: "المستخدمين", icon: <Users />, href: "/users" },
    { text: "الاعلانات", icon: <ImageIcon />, href: "/ads" },
  
  ];

  const drawerContent = (
    <Box
      sx={{
        width: 320,
        height: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* العنوان + زر الإغلاق */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700}}>
          لوحة التحكم
        </Typography>

        <IconButton
          onClick={() => {
            setOpen(false);
            onToggle(false);
          }}
         
        >
          <X />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* القائمة الرئيسية */}
      <List sx={{ flexGrow: 1 }}>
        {drawerItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.href}
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": { bgcolor: "#", color: "" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

  
            <ListItemButton
              component={Link}
              to={`/terms_and_conditions`}
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": { bgcolor: "#", color: "" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}><NotebookPen/></ListItemIcon>
              <ListItemText  >الشروط والاحكام</ListItemText>
            </ListItemButton>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* زر فتح السايد بار */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          color: "white",
          transition: "all 0.3s ease",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* السايد بار */}
      <Drawer
        anchor={option1 ? "right" : "top"}
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderRadius: option1 ? "0 0 0 20px" : "0 0 20px 20px",
            overflow: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
