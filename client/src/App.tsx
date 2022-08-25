import { UserList } from "./components/view/UserList";
import { Typography, Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" textAlign="center">
        USERS INTERFACE
      </Typography>
      <UserList />
    </Box>
  );
}

export default App;
