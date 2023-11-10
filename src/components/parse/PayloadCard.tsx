import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

import DeleteIcon from "@mui/icons-material/Delete";
import { PayloadResponse } from "./PayloadResponse";
import theme from "../../theme/main-theme";
import { copyToClipboard } from "../../util/copyToClipboard";
interface PayloadCardProps {
  payload: PayloadResponse;
  onDelete: (payload: PayloadResponse) => void;
  onSelect: (payload: PayloadResponse) => void;
}
export const PayloadCard = (props: PayloadCardProps) => {
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Card
      elevation={2}
      style={{ width: "100%", backgroundColor: theme.palette.background.default }}
    >
      <CardHeader
        color={theme.palette.text.secondary}
        title={
          <Grid container direction="column" justifyContent="flex-start" wrap="wrap">
            <Typography>{props.payload.identifier}</Typography>
            <Typography variant="body2" style={{ fontSize: ".5rem" }}>
              {`Parset at ${props.payload.date
                .toISOString()
                .slice(0, 19)
                .replace(/-/g, "/")
                .replace("T", " ")}`}
            </Typography>
          </Grid>
        }
        action={
          <>
            <IconButton
              size="small"
              onClick={() => {
                props.onSelect(props.payload);
              }}
            >
              <OpenInFullIcon
                style={{
                  color: theme.palette.secondary.main,
                  fontSize: isLgScreen ? "1.7rem" : "1rem",
                }}
                aria-label="view"
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                props.onDelete(props.payload);
              }}
            >
              <DeleteIcon
                style={{
                  color: theme.palette.primary.main,
                  fontSize: isLgScreen ? "1.7rem" : "1rem",
                }}
                aria-label="Delete"
              />
            </IconButton>
          </>
        }
      />
      <CardContent style={{ padding: 0, paddingBottom: 5 }}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, overflowX: "hidden", maxHeight: isLgScreen ? "500px" : "200px" }}
        >
          {props.payload.encodingKey ? (
            <TreeItem
              style={{ color: theme.palette.text.primary }}
              nodeId={props.payload.encodingKey}
              label="Encoding Key"
            >
              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  copyToClipboard(props.payload.encodingKey);
                }}
              >
                <Typography variant="body2" style={{ wordBreak: "break-all", cursor: "copy" }}>
                  {props.payload.encodingKey}
                </Typography>
              </div>
            </TreeItem>
          ) : (
            <></>
          )}
          {props.payload.parsed.map((parsed) => (
            <TreeItem
              key={parsed.id}
              style={{ color: theme.palette.text.primary }}
              nodeId={parsed.name}
              label={parsed.name}
            >
              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  copyToClipboard(parsed.value);
                }}
              >
                <Typography variant="body2" style={{ wordBreak: "break-all", cursor: "copy" }}>
                  {parsed.value.length > 0 ? parsed.value : "Empty"}
                </Typography>
              </div>
            </TreeItem>
          ))}
        </TreeView>
      </CardContent>
    </Card>
  );
};
