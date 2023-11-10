/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import theme from "../../theme/main-theme";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SensorResponse } from "../../service";
import { copyToClipboard } from "../../util/copyToClipboard";

interface CompareCompareCardProps {
  obj?: SensorResponse;
  encodingKey?: string;
  splited?: boolean;
  disableSplit?: boolean;
  splitSymbol?: string;
  onClickSplitDesplit?: () => void;
}

export default function CompareCard(props: CompareCompareCardProps) {
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const getSplited = (value: string) => {
    return value.split(props.splitSymbol || "");
  };
  return (
    <Grid xs={6} item container>
      <Card
        onContextMenu={(e) => {
          e.preventDefault();
          copyToClipboard(props.encodingKey ? props.encodingKey : props.obj?.value || "");
        }}
        style={{ backgroundColor: theme.palette.background.default, flexGrow: 1 }}
      >
        <CardHeader
          title={props.encodingKey ? "Encoding Key" : props.obj?.name || ""}
          action={
            <>
              {!props.disableSplit &&
              (props.obj?.value?.includes(",") || props.obj?.value?.includes(";")) ? (
                <IconButton size="small" disableTouchRipple onClick={props.onClickSplitDesplit}>
                  {props.splited ? (
                    <HorizontalRuleIcon
                      style={{
                        color: theme.palette.secondary.main,
                        fontSize: isLgScreen ? "1.7rem" : "1rem",
                      }}
                    />
                  ) : (
                    <VerticalAlignBottomIcon
                      style={{
                        color: theme.palette.secondary.main,
                        fontSize: isLgScreen ? "1.7rem" : "1rem",
                      }}
                    />
                  )}
                </IconButton>
              ) : (
                <></>
              )}
            </>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            style={{
              wordWrap: "break-word",
              wordBreak: "break-all",
              cursor: "pointer",
            }}
          >
            {props.encodingKey
              ? props.encodingKey
              : props.splited
              ? getSplited(props.obj?.value || "").map((currentValue) => (
                  <>
                    {currentValue}
                    {"\n"}
                    <br />
                  </>
                ))
              : props.obj?.value || ""}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
