import { useEffect, useState } from "react";
import {
  CreateUser,
  DeleteUser,
  EditUser,
  GetAllUsers,
  SearchUser,
} from "../services/users.controllers";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddModal, DeleteModal, EditModal } from "./Modal";
import { User } from "../interfaces/user.interfaces";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchStr, setSearchStr] = useState<String>("");
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const [user, setUser] = useState<User>({
    userId: 0,
    nombre: "",
    email: "",
  });
  const [addOpen, setAddOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const FetchData = () => {
    GetAllUsers().then((json) => {
      setUsers(json.response);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
    if (searchStr !== "") {
      setIsSearching(true);
      SearchUser(searchStr)
        .then((json) => {
          setUsers(json.response);
        })
        .catch((err) => console.log(err));
    }
  };

  const cleanSearch = () => {
    FetchData();
    setSearchStr("");
  };

  const handleCreateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    CreateUser(user)
      .then((json) => {
        handleCloseAddConfirm();
        Swal.fire({
          position: "center",
          icon: "success",
          title: json.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    EditUser(user)
      .then((json) => {
        handleClose();
        Swal.fire({
          position: "center",
          icon: "success",
          title: json.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!isSearching) {
      FetchData();
    }
  }, [users]);

  const handleCloseAddConfirm = () => {
    setAddOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  const handleEdit = (user: User) => {
    setUser(user);
    setOpen(true);
  };

  const openConfirm = (user: User) => {
    setUser(user);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    DeleteUser(user.userId)
      .then((json) => {
        handleCloseConfirm();
        Swal.fire({
          position: "center",
          icon: "success",
          title: json.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Button
        variant="contained"
        color="success"
        sx={{ width: 125, m: "auto" }}
        onClick={() => {
          setUser({
            userId: 0,
            nombre: "",
            email: "",
          });
          setAddOpen(true);
        }}
        endIcon={<AddIcon />}
      >
        Add New
      </Button>
      <Box
        sx={{
          display: "flex",
          m: "auto",
          alignItems: "center",
          gap: 3,
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" textAlign="center">
          Search User
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            sx={{ m: "auto" }}
            id="outlined-basic"
            label="Type the name"
            variant="outlined"
            value={searchStr}
            onChange={handleSearch}
          />
          <Button
          sx={{height:35, mt:1}}
            variant="contained"
            color="error"
            onClick={cleanSearch}
            endIcon={<DeleteIcon />}
          >
            Delete Search
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ width: 450, m: "auto" }}>
        <Table sx={{ minWidth: 120 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {user.nombre}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <IconButton>
                      <EditIcon
                        color="primary"
                        onClick={() => handleEdit(user)}
                      />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon
                        color="error"
                        onClick={() => openConfirm(user)}
                      />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddModal
          user={user}
          open={addOpen}
          close={handleCloseAddConfirm}
          change={handleChange}
          submit={handleCreateUser}
        />
        <EditModal
          user={user}
          open={open}
          close={handleClose}
          change={handleChange}
          submit={handleSubmit}
        />
        <DeleteModal
          open={confirmOpen}
          close={handleCloseConfirm}
          script={() => handleDelete()}
        />
      </TableContainer>
    </Box>
  );
};
