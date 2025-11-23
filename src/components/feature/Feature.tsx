import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import { ArrowLeft, ArrowLeftIcon, ArrowUpIcon, MenuIcon, Settings, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useOptions } from "./useOptions";
import { useNavigate } from "react-router-dom";

export default function FloatingMenu() {
  const { option1, option3, setOption1, setOption3 } = useOptions();
  const [showSubOptions, setShowSubOptions] = useState(false);
  const navigate = useNavigate();

  const handleDirectionClick = () => setShowSubOptions(!showSubOptions);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openWhatsApp = () => {
 
    navigate('/whats_app')
  };

  const subOptions = [
    {
      name: "الضهور من اليمين",
      onClick: setOption1,
      value: option1,
      icon: <ArrowLeft />,
    },
    {
      name: "الضهور من فوق",
      onClick: setOption3,
      value: option3,
      icon: <ArrowUpIcon />,
    },
  ];

  return (
    <Box sx={{ position: "fixed", bottom: 20, left: 20, zIndex: 40 }}>
      <SpeedDial ariaLabel="خيارات" icon={<Settings />} direction="up">

        <SpeedDialAction
          icon={<MenuIcon />}
          tooltipTitle="اتجاه القائمة"
          onClick={handleDirectionClick}
        />

        <SpeedDialAction
          icon={<ArrowLeftIcon />}
          tooltipTitle="رجوع للخلف"
          onClick={handleBackClick}
        />

        {/*  زر واتساب */}
        <SpeedDialAction
          icon={<MessageCircle color="green" />}
          tooltipTitle="اضافة رقم الدعم"
          onClick={openWhatsApp}
        />

        {showSubOptions &&
          subOptions.map((sub) => (
            <SpeedDialAction
              key={sub.name}
              icon={sub.icon}
              tooltipTitle={`${sub.name} (${sub.value ? "مفعل" : "غير مفعل"})`}
              onClick={sub.onClick}
            />
          ))}
      </SpeedDial>
    </Box>
  );
}
