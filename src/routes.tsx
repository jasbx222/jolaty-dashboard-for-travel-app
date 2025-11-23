
import Destinations from "./pages/destination/Destination";
import HomePage from "./pages/home/HomePage";
import Profile from "./pages/profile/Profile";

import Ads from "./pages/ads/Ads";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import UsersManagement from "./pages/users/Users";
import Countries from "./pages/country/Country";
import WhatsApp from "./pages/WhatsApp/WhatsApp";
// ======================  ROUTES ======================
export const routes = [
  {
    id: 1,
    element: <HomePage />,
    href: "/home",
  },
  {
    id:2,
    element:<Destinations/>,
    href:"/destination"
  },
  {
    id:3,
    element:<UsersManagement/>,
    href:"/users"
  },
  {
    id:4,
    element:<Ads/>,
    href:"/ads"
  },
  
  {
    id:5,
    element:<Profile/>,
    href:"/profile"
  },
  
  {
    id:6,
    element:<TermsAndConditions/>,
    href:"/terms_and_conditions"
  },
  {
    id:7,
    element:<Countries/>,
    href:"/countries"
  },
  {
    id:8,
    element:<WhatsApp/>,
    href:"/whats_app"
  },
  
];
