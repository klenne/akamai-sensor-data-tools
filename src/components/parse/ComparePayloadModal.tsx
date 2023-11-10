/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PayloadResponse } from "./PayloadResponse";
import theme from "../../theme/main-theme";
import { v4 as uuidv4 } from "uuid";

import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SensorResponse } from "../../service";
import CompareCard from "./CompareCard";

interface ComparePayloadModalModalProps {
  state: boolean;
  payloads: PayloadResponse[];
  setModalState: (state: boolean) => void;
}
export default function ComparePayloadModal(props: ComparePayloadModalModalProps) {
  const [selectedPayload1, setSelectedPayload1] = useState({} as PayloadResponse | null);
  const [selectedPayload2, setSelectedPayload2] = useState({} as PayloadResponse | null);

  interface ObjectComparable {
    object1: SensorResponse;
    object2: SensorResponse;
    splited: boolean;
    id: string;
  }
  const [commonObjects, setCommonObjects] = useState([] as ObjectComparable[]);
  const [differentObjects, setDifferentObjects] = useState([] as ObjectComparable[]);
  const semiColonEmtries = [
    "bmak.mact",
    "bmak.dmact",
    "bmak.doact",
    "bmak.vcact",
    "bmak.fpcf.fpValStr",
    "bmak.kact",
    "bmak.pact",
  ];
  useEffect(() => {
    setSelectedPayload1(null);
    setSelectedPayload2(null);
    setCommonObjects([]);
    setDifferentObjects([]);
  }, [props.state]);

  useEffect(() => {
    if (selectedPayload1?.parsed && selectedPayload2?.parsed) {
      const getCommonObjects = (obj1: SensorResponse[], obj2: SensorResponse[]): any[] => {
        const commonObjects: any[] = [];

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        keys1.forEach((key: any) => {
          if (keys2.includes(key)) {
            if (obj1[key].value === obj2[key].value) {
              commonObjects.push({ object1: obj1[key], object2: obj2[key] } as ObjectComparable);
            }
          }
        });
        return commonObjects;
      };

      const getDiffInObjects = (obj1: SensorResponse[], obj2: SensorResponse[]): any[] => {
        const diffObj: any[] = [];

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        keys1.forEach((key: any) => {
          if (keys2.includes(key) && obj1[key].name === obj2[key].name) {
            if (obj1[key].value !== obj2[key].value) {
              if (!diffObj.find((x) => x.object1.id === obj1[key].id)) {
                diffObj.push({
                  object1: obj1[key],
                  object2: obj2[key],
                  id: uuidv4(),
                  splited: false,
                } as ObjectComparable);
              }
            }
          } else {
            diffObj.push({ object1: obj1[key], object2: {} } as ObjectComparable);
          }
        });

        keys2.forEach((key: any) => {
          if (!keys1.includes(key) || (keys1.includes(key) && obj1[key].name !== obj2[key].name)) {
            if (!diffObj.find((x) => x.object2.id === obj2[key].id)) {
              diffObj.push({ object1: {}, object2: obj2[key] } as ObjectComparable);
            }
          }
        });
        return diffObj;
      };
      setCommonObjects(getCommonObjects(selectedPayload1.parsed, selectedPayload2.parsed));
      setDifferentObjects(getDiffInObjects(selectedPayload1.parsed, selectedPayload2.parsed));
    }
  }, [selectedPayload1, selectedPayload2]);

  const handleClose = () => {
    props.setModalState(false);
  };

  const selector = (
    label: string,
    payload: PayloadResponse | null,
    setSelected: (payload: PayloadResponse) => void
  ) => {
    const defaultValue = payload?.id || "";
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          style={{
            color: theme.palette.text.primary,
          }}
          value={defaultValue}
          fullWidth
          onChange={(event) => {
            setSelected(
              props.payloads.find((x) => x.id === (event?.target?.value as any)) as PayloadResponse
            );
          }}
          label={label}
        >
          {props.payloads.map((item) => (
            <MenuItem
              style={{
                color: theme.palette.text.secondary,
              }}
              key={item.id}
              value={item.id}
            >
              {item.identifier}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const heading = (text: string) => (
    <Grid item xs={12} container direction="column" alignItems="flex-start">
      <Typography variant="h6" gutterBottom style={{ color: theme.palette.text.primary }}>
        {text}
      </Typography>
      <Divider style={{ width: "100%", backgroundColor: theme.palette.background.paper }} />
    </Grid>
  );

  const changeSplited = (item: ObjectComparable) => {
    const tempDifff = [...differentObjects];
    const findIndex = tempDifff.findIndex((obj) => {
      return item.id === obj.id;
    });

    tempDifff[findIndex].splited = !tempDifff[findIndex].splited;
    setDifferentObjects(tempDifff);
  };
  return (
    <Dialog
      fullScreen
      open={props.state}
      onClose={handleClose}
      PaperProps={{ style: { backgroundColor: theme.palette.background.default } }}
    >
      <DialogTitle color={theme.palette.text.primary}>Compare</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
          <Grid xs={6} item>
            {selector("Select first payload", selectedPayload1, setSelectedPayload1)}
          </Grid>
          <Grid xs={6} item>
            {selector("Select second payload", selectedPayload2, setSelectedPayload2)}
          </Grid>
          <Grid container spacing={1} style={{ marginTop: "1rem" }}>
            {selectedPayload1 &&
            selectedPayload2 &&
            selectedPayload1.encodingKey !== selectedPayload2.encodingKey ? (
              <>
                {heading("Encoding Key")}
                <Grid container spacing={1} item xs={12}>
                  <CompareCard encodingKey={selectedPayload1.encodingKey} />
                  <CompareCard encodingKey={selectedPayload2.encodingKey} />
                </Grid>
              </>
            ) : (
              <></>
            )}
            {differentObjects?.length > 0 && heading("Different values")}
            {differentObjects.map((item: ObjectComparable) => (
              <Grid key={uuidv4()} container spacing={1} item xs={12}>
                <CompareCard
                  obj={item.object1}
                  onClickSplitDesplit={() => {
                    changeSplited(item);
                  }}
                  splited={item.splited}
                  splitSymbol={semiColonEmtries.includes(item.object1.name) ? ";" : ","}
                />
                <CompareCard
                  obj={item.object2}
                  onClickSplitDesplit={() => {
                    changeSplited(item);
                  }}
                  splitSymbol={semiColonEmtries.includes(item.object2.name) ? ";" : ","}
                  splited={item.splited}
                />
              </Grid>
            ))}
            {commonObjects?.length > 0 && heading("Equal values")}
            {commonObjects.map((item: ObjectComparable) => (
              <Grid key={uuidv4()} container spacing={1} item xs={12}>
                <CompareCard disableSplit obj={item.object1} />
                <CompareCard disableSplit obj={item.object2} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} type="reset">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
