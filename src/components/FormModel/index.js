import * as React from "react";
import { Button, TextField, Grid, Modal, Box, Typography } from "@mui/material";

import { createField, updateField } from "../../apis";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const FormModel = ({
  openModel,
  setOpenModel,
  modelTitle,
  setFormInitialValue,
  formInitialValue,
  updateFieldData,
  setNotification,
}) => {
  React.useEffect(() => {
    setFormValues(formInitialValue);
  }, [formInitialValue]);
  const [formValues, setFormValues] = React.useState(formInitialValue);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //validation
    if (formValues.name && formValues.age && formValues.about) {
      if (modelTitle === "Add Field") {
        // add new field in db
        createField(formValues).then((data) => {
          if (data.status === "success") {
            setOpenModel(false);
            updateFieldData();
            setFormValues(formInitialValue);
            setNotification({
              status: true,
              color: "success",
              message: "New Field Added",
            });
          }
        });
      } else if (modelTitle === "Update Field") {
        // update particular field in db
        if (JSON.stringify(formValues) !== JSON.stringify(formInitialValue)) {
          updateField(formValues).then((data) => {
            if (data.status === "success") {
              setNotification({
                status: true,
                color: "info",
                message: "Field Updated Successfully",
              });
              setOpenModel(false);
              updateFieldData();
              setFormValues({ name: "", age: "", about: "", _id: "" });
              setFormInitialValue({ name: "", age: "", about: "", _id: "" });
            } else {
              console.log("failed");
              setNotification({
                status: true,
                color: "error",
                message: "Failed Update",
              });
            }
          });
        }
      } else {
        setNotification({
          status: true,
          color: "error",
          message: "Failed Task",
        });
      }
    }
  };
  return (
    <div>
      <Modal
        open={openModel}
        onClose={() => {
          setOpenModel(!openModel);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-about"
      >
        <Box sx={style}>
          {/* Model Form  */}
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <Typography sx={{ marginBottom: "1.5rem" }} variant="h4">
              {modelTitle}
            </Typography>
            <Typography
              sx={{ fontSize: 14, marginBottom: "2rem" }}
              color="text.secondary"
              gutterBottom
            >
              Fill the below form
            </Typography>
            <TextField
              value={formValues.name}
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              id="name"
              label="Name"
              type="search"
              variant="standard"
              required
              sx={{ marginRight: "5rem" }}
            />
            <TextField
              value={formValues.age}
              id="age"
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  age: parseInt(e.target.value) || "",
                }))
              }
              label="Age"
              type="number"
              variant="standard"
              required
            />
            <TextField
              value={formValues.about}
              margin="normal"
              fullWidth
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  about: e.target.value,
                }))
              }
              id="about"
              label="About"
              type="text"
              variant="standard"
              required
              sx={{ marginBottom: "2rem" }}
            />
            <Grid container justifyContent="flex-end" spacing={7}>
              <Grid item>
                <Button size="small" variant="contained" type="submit">
                  {modelTitle}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setFormValues({ name: "", age: "", about: "", _id: "" });
                    setOpenModel(false);
                  }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FormModel;
