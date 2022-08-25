import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Card,
  CardContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  DeleteProp,
  AddProp,
  UserProp,
  User,
} from "../interfaces/user.interfaces";

export const AddModal = (props: AddProp) => {
  const { user, open, close, change, submit } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          Add New User
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => submit(e)}>
            <Card sx={{ width: 400 }}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}
              >
                <TextField
                  id="outlined-multiline-flexible"
                  label="Nombre"
                  fullWidth
                  type="text"
                  name="nombre"
                  value={user.nombre}
                  onChange={(e) => change(e)}
                />
                <TextField
                  id="filled-multiline-static"
                  label="Email"
                  fullWidth
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => change(e)}
                />
                <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    endIcon={<SaveAsIcon />}
                  >
                    Create
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={() => close()}
                    endIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const EditModal = (props: UserProp) => {
  const { user, open, close, change, submit } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          Edit User
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => submit(e)}>
            <Card sx={{ width: 400 }}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}
              >
                <TextField
                  sx={{ display: "none" }}
                  id="outlined-multiline-flexible"
                  label="userId"
                  fullWidth
                  type="number"
                  name="userId"
                  value={user.userId}
                  onChange={(e) => change(e)}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Nombre"
                  fullWidth
                  type="text"
                  name="nombre"
                  value={user.nombre}
                  onChange={(e) => change(e)}
                />
                <TextField
                  id="filled-multiline-static"
                  label="Email"
                  fullWidth
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => change(e)}
                />
                <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    endIcon={<SaveIcon />}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={() => close()}
                    endIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const DeleteModal = (props: DeleteProp) => {
  const { open, close, script } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Want to delete this user ?
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description" textAlign="center">
            The user will be deleted :O !
          </DialogContentText>
        </DialogContent> */}
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => script()}
            autoFocus
            endIcon={<DeleteIcon />}
          >
            Delete it
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => close()}
            endIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
