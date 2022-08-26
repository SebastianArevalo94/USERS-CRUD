import { UserList } from "./components/view/UserList";
import { Box } from "@mui/material";
import {NavBar} from "./components/view/NavBar";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <NavBar/>
      <UserList />
    </Box>
  );
}

export default App;
