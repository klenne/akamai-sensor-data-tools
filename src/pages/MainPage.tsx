import React from "react";
import { Typography, Container, Box } from "@mui/material";

export const MainPage = () => {
  return (
    <Container>
      <Box mt={1}>
        <Typography variant="h6" gutterBottom>
          Akamai Anti-Bot
        </Typography>
        <Typography variant="body2" paragraph gutterBottom align="justify">
          Akamai is a global cloud service company that offers a wide range of solutions to improve
          content delivery and internet security. Its distributed server platform optimizes web
          performance and accelerates page loading for users worldwide. Additionally, Akamai
          provides security solutions, including protection against DDoS attacks and threat
          mitigation, to keep websites secure and available to users.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Sensor Data and _abck
        </Typography>
        <Typography variant="body2" align="justify" paragraph>
          _abck is a cookie set by Akamai Bot Manager that helps detect and mitigate malicious and
          automated bots on a website. The _abck cookie aids in identifying legitimate traffic from
          potentially malicious traffic. Sensor Data refers to information collected and analyzed by
          Akamai to understand visitor behavior. This data includes page load times, user behavior,
          browser specs,and site interaction. Akamai uses this data to prevent bad bot attacks.
        </Typography>
      </Box>
    </Container>
  );
};
