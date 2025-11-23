import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LocationEditIcon, Map, Users } from "lucide-react";
import { useContextMode } from "../../context/useContextMode";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomePage = () => {
  const { mode } = useContextMode();

  // بيانات الكروت
  const stats = [
    {
      title: "الوجهات",
      count: 25,
      icon: <LocationEditIcon fontSize="large" />,
      link: "/destinations",
    },
    {
      title: "الدول",
      count: 10,
      icon: <Map fontSize="large" />,
      link: "/countries",
    },
    {
      title: "المستخدمين",
      count: 120,
      icon: <Users fontSize="large" />,
      link: "/users",
    },
   
  ];

  // بيانات الجارت
  const chartData = {
    labels: ["مصر", "الإمارات", "تركيا", "فرنسا"], 
    datasets: [
      {
        label: "عدد الوجهات",
        data: [5, 8, 6, 6],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "عدد المستخدمين",
        data: [30, 50, 20, 20],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "إحصائيات حسب الدولة" },
    },
  };

  return (
    <Box sx={{
       display:"flex",
              justifyContent:"center",
              alignItems:"center"
    }} >
      {/* 3 كروت */}
    <Box p={3}> 
    <Grid container spacing={5} sx={{ width: '100%' }}>
  {stats.map((stat) => (
    <Grid
      key={stat.title}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:"10px",
      }}
    >
      <Card
        sx={{
          cursor: "pointer",
          width: 250,
          borderRadius: 3,
          background: `${mode=== "light"? `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)` :""}`, 
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease", 
          "&:hover": {
            transform: "translateY(-5px) scale(1.05)", 
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          },
        }}
       
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              fontSize: 40,
              color: "#4a90e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "rgba(74, 144, 226, 0.1)",
            }}
          >
            {stat.icon}
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.secondary">
              {stat.count}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {stat.title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


      {/* الجارت البياني */}
      <Card>
        <CardContent>
          <Bar data={chartData} options={chartOptions} />
        </CardContent>
      </Card>
    </Box>
    </Box>
  );
};

export default HomePage;
