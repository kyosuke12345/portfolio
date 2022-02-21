import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Fotter: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 4 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        何か記載してください
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Fotter;
