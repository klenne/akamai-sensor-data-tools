import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PayloadResponse } from "./PayloadResponse";
import theme from "../../theme/main-theme";
import { List, ListItem, ListItemText } from "@mui/material";
import { copyToClipboard } from "../../util/copyToClipboard";

interface PayloadExpandedModalProps {
  state: boolean;
  payload: PayloadResponse;
  setModalState: (state: boolean) => void;
}
export default function PayloadExpandedModal(props: PayloadExpandedModalProps) {
  const handleClose = () => {
    props.setModalState(false);
  };

  return (
    <Dialog
      fullScreen
      open={props.state}
      onClose={handleClose}
      PaperProps={{ style: { backgroundColor: theme.palette.background.default } }}
    >
      <DialogTitle color={theme.palette.text.primary}>{props.payload.identifier}</DialogTitle>
      <DialogContent>
        <List>
          {props.payload.encodingKey ? (
            <ListItem divider>
              <ListItemText
                inset
                style={{
                  wordBreak: "break-all",
                  color: theme.palette.text.primary,
                  cursor: "copy",
                }}
                primary="Encoding Key"
                secondaryTypographyProps={{ style: { color: theme.palette.text.primary } }}
                secondary={props.payload.encodingKey}
                onClick={() => {
                  copyToClipboard(props.payload.encodingKey);
                }}
              />
            </ListItem>
          ) : (
            <></>
          )}
          {props.payload?.parsed?.map((item) => (
            <ListItem divider key={item.id}>
              <ListItemText
                inset
                style={{
                  wordBreak: "break-all",
                  color: theme.palette.text.primary,
                  cursor: "copy",
                }}
                primary={item.name}
                secondaryTypographyProps={{ style: { color: theme.palette.text.primary } }}
                secondary={item.value}
                onClick={() => {
                  copyToClipboard(item.value);
                }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} type="reset">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
