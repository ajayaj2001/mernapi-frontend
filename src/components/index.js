import { useEffect, useState } from "react";
import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";

import { getAllFields } from "../apis";
import DataTable from "./DataTable";
import FormModel from "./FormModel";

const MainComponent = () => {
  const [openModel, setOpenModel] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState({
    createCount: 0,
    updateCount: 0,
  });
  const [notification, setNotification] = useState({
    status: false,
    color: "success",
    message: "",
  });
  const [formInitialValue, setFormInitialValue] = useState({
    name: "",
    age: "",
    about: "",
    _id: "",
  });

  //fetch data in db and update table
  const updateFieldData = () => {
    getAllFields().then((response) => {
      setTableData(response.fields);
      setCount(response.count);
    });
  };

  useEffect(() => {
    updateFieldData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={6}
        alignItems="center"
        sx={{ marginBottom: "2rem" }}
      >
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              setModelTitle("Add Field");
              setOpenModel(true);
            }}
          >
            Add Field
          </Button>
        </Grid>
        <Grid item>
          <Typography sx={{ color: "#ff9100" }} variant="body1">
            No of Times Field Created : {count.createCount}
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ color: "#ff9100" }} variant="body1">
            No of Times Field Updated : {count.updateCount}
          </Typography>
        </Grid>
      </Grid>
      {/* Data Table */}
      <DataTable
        setOpenModel={setOpenModel}
        setModelTitle={setModelTitle}
        setFormInitialValue={setFormInitialValue}
        tableData={tableData}
      />
      {/* Model Form (open while model called)*/}
      <FormModel
        setNotification={setNotification}
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle={modelTitle}
        formInitialValue={formInitialValue}
        setFormInitialValue={setFormInitialValue}
        updateFieldData={updateFieldData}
      />
      {/* Shows Notification Alert (open while notification called)*/}
      <Snackbar
        open={notification.status}
        autoHideDuration={4000}
        onClose={() =>
          setNotification({ status: false, color: "success", message: "" })
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={notification.color}
          sx={{ width: "100%" }}
          onClose={() =>
            setNotification({ status: false, color: "success", message: "" })
          }
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainComponent;
