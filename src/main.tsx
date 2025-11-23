import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/auth/Login.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";

// نستخدم الكونتكست الجديد
import { ThemeModeProvider } from "./context/useContextMode.tsx";

function Root() {
  const queryClient = new QueryClient();

  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeModeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
