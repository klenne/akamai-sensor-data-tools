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
import { v4 as uuidv4 } from "uuid";
import theme from "../../theme/main-theme";

interface AddNewModalProps {
  state: boolean;
  setModalState: (state: boolean) => void;
  onSuccess: (object: PayloadResponse) => void;
}
export default function AddNewModal(props: AddNewModalProps) {
  const validationSchema = yup.object({
    identifier: yup.string().required("Identifier is required"),
    payload: yup.string().required("Payload is required"),
  });
  const formik = useFormik({
    initialValues: {
      identifier: "",
      payload: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      try {
       let parsedSensor =  ParseNewSensor(values.payload, true)
        props.onSuccess({
          id: uuidv4(),
          identifier: values.identifier,
          encodingKey: parsedSensor.encodingKey,
          parsed: parsedSensor.sensor,
        });
        handleClose();
      } catch {
        formik.setErrors({ payload: "Payload is invalid" });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    props.setModalState(false);
  };

  return (
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="reset">
              Close
            </Button>
            <Button type="submit">Parse</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
}
