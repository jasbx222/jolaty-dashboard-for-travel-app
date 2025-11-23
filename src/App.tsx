// App.tsx
import { Box } from "@mui/material";
import "./App.css";
import AdminDrawer from "./components/AdminDrawer";
import MainContent from "./MainContent";
import Header from "./components/Header";
import FloatingMenu from "./components/feature/Feature";
import { OptionsProvider } from "./components/feature/useOptions";
import { useState } from "react";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <OptionsProvider>
    
       <Box
        dir="rtl"
        sx={{
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* الشريط الجانبي */}
        <Header  />
        <Box
          sx={{
            zIndex: 80,
            position:"relative",
            top:"-10px"
          }}
        >
        <AdminDrawer onToggle={setDrawerOpen} />

        </Box>

        {/* المحتوى الرئيسي */}
        <Box
          sx={{
            flex: 1,
            zIndex: "30",
            position: "relative",
            top: 50,
            display: "flex",
            flexDirection: "column",
            marginRight: drawerOpen ? "250px" : "0px",
            overflow: "auto",

          }}
        >
          {" "}
          <main
            style={{
              flex: 1,
              width: "100%",

              padding: "1rem",
             
            }}
          >
            <MainContent />
          </main>
        </Box>

        <FloatingMenu />

     
      </Box>

    </OptionsProvider>
  );
}

export default App;
