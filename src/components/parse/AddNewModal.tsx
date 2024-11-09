import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, useFormik } from "formik";
import * as yup from "yup";
import { ParseNewSensor } from "../../service";
import { PayloadResponse } from "./PayloadResponse";
import { v4 as uuid } from "uuid";
import theme from "../../theme/main-theme";
import Switch from "@mui/material/Switch";
import { Backdrop, CircularProgress, FormControlLabel, Grid, Typography } from "@mui/material";

interface AddNewModalProps {
  state: boolean;
  setModalState: (state: boolean) => void;
  onSuccess: (object: PayloadResponse) => void;
}
export default function AddNewModal(props: AddNewModalProps) {
  const [useDynamicReorderingKey, setUseDynamicReorderingKey] = React.useState(false);
  const [useBruteForce, setUseBruteForce] = React.useState(false);
  const [showLoading, setLoading] = React.useState(false);

  const validationSchema = yup.object({
    identifier: yup.string().required("Identifier is required"),
    payload: yup.string().required("Payload is required"),
  });
  const formik = useFormik({
    initialValues: {
      identifier: "",
      payload: "",
      dynamicReorderingKey: "",
      bruteStartNumber: 10000,
      bruteEndNumber: Number.MAX_SAFE_INTEGER,
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      if (useBruteForce) {
        setLoading(true);
      }

      ParseNewSensor(
        values.payload,
        true,
        useDynamicReorderingKey,
        values.dynamicReorderingKey,
        useBruteForce,
        values.bruteStartNumber,
        values.bruteEndNumber,
        onSuccess,
        onError
      );
    },
  });

  const onSuccess = (parsedSensor: any) => {
    props.onSuccess({
      id: uuid(),
      identifier: formik.values.identifier,
      encodingKey: parsedSensor.encodingKey,
      parsed: parsedSensor.sensor,
      date: new Date(),
      version: parsedSensor.version,
    });
    setLoading(false);
    handleClose();
  };

  const onError = () => {
    setLoading(false);
    formik.setErrors({ payload: "Payload is invalid" });
  };

  const handleClose = () => {
    formik.resetForm();
    setUseBruteForce(false);
    setUseDynamicReorderingKey(false);
    props.setModalState(false);
  };

  return (
    <>
      <Backdrop sx={() => ({ color: "#fff", zIndex: 999999999999999,background:"rgba(0, 0, 0, 1)" , display:"flex", flexDirection:"column"})} open={showLoading}>
        <Typography variant="h1">Please wait while brute Force is running</Typography>
        <CircularProgress style={{marginTop:10}} color="inherit" />
      </Backdrop>
      <Dialog
        open={props.state}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: theme.palette.background.default } }}
      >
        <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit as any}>
          <Form>
            <DialogTitle>Decode Payload</DialogTitle>

            <DialogContent>
              <TextField
                placeholder="Give it an Identifier ex: payload 1"
                margin="dense"
                name="identifier"
                label="Identifier"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.identifier}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                helperText={formik.touched.identifier && formik.errors.identifier}
              />

              <TextField
                margin="dense"
                name="payload"
                label="Payload"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.payload}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.payload && Boolean(formik.errors.payload)}
                helperText={formik.touched.payload && formik.errors.payload}
              />

              <FormControlLabel
                labelPlacement="start"
                name="useDynamicReorderingKey"
                style={{ justifyContent: "space-between", display: "flex", margin: 0 }}
                slotProps={{ typography: { variant: "body2" } }}
                control={
                  <Switch
                    checked={useDynamicReorderingKey}
                    onChange={(e, val) => {
                      setUseDynamicReorderingKey(val);
                      if (useBruteForce) {
                        setUseBruteForce(false);
                      }
                    }}
                  />
                }
                label="Use Dynamic Reordering Key"
              />
              {useDynamicReorderingKey && (
                <TextField
                  margin="dense"
                  name="dynamicReorderingKey"
                  label="Dynamic Reordering Key"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={formik.values.dynamicReorderingKey}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              )}

              <FormControlLabel
                labelPlacement="start"
                name="bruteForce"
                style={{ justifyContent: "space-between", display: "flex", margin: 0 }}
                slotProps={{ typography: { variant: "body2" } }}
                control={
                  <Switch
                    checked={useBruteForce}
                    onChange={(e, val) => {
                      setUseBruteForce(val);
                      if (useDynamicReorderingKey) {
                        setUseDynamicReorderingKey(false);
                      }
                    }}
                  />
                }
                label="Brute Force"
              />
              {useBruteForce && (
                <Grid top={10}>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      fullWidth
                      name="bruteStartNumber"
                      label="Start Number"
                      type="number"
                      variant="standard"
                      value={formik.values.bruteStartNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      fullWidth
                      name="bruteEndNumber"
                      label="End Number"
                      type="number"
                      variant="standard"
                      value={formik.values.bruteEndNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions aria-hidden={false}>
              <Button onClick={handleClose} type="reset">
                Close
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  if (useBruteForce) {
                    setLoading(true);
                  }
                }}
              >
                Parse
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
}
