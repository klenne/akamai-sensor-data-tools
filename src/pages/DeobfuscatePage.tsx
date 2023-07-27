import React, { useEffect, useState } from "react";

import { Loading } from "../components/loading";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { SensorDataDeobfuscator } from "../service";
import { copyToClipboard } from "../util/copyToClipboard";

export const DeobfuscatePage = () => {
  const [script, setScript] = useState("");
  const [response, setResponse] = useState("In progress...");
  const [finalResult, setFinalResult] = useState("");
  const [state, setState] = useState("input");
  const [component, setComponent] = useState(<></>);

  const setFinalResponseWrapper = (result: any) => {
    setState("done");
    setFinalResult(result);
  };

  useEffect(() => {
    const getInputStep = () => {
      return (
        <Grid
          container
          style={{ marginTop: ".5rem", padding: ".1rem", paddingBottom: 10 }}
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={10} item>
            <TextField
              value={script}
              onChange={(event) => {
                setScript(event.target.value);
              }}
              rows={10}
              fullWidth
              multiline
              label="Input Script"
            />
          </Grid>
          <Grid
            container
            xs={10}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            item
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setState("executing");
                SensorDataDeobfuscator.deob(script, setResponse, setFinalResponseWrapper);
              }}
            >
              Deobfuscate Script
            </Button>
          </Grid>
        </Grid>
      );
    };
    const getOutputStep = () => {
      return (
        <Grid
          container
          style={{ marginTop: ".5rem", padding: ".1rem", paddingBottom: 10 }}
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={10} item>
            <TextField
              style={{ cursor: "pointer" }}
              value={finalResult}
              rows={10}
              fullWidth
              multiline
              label="Result"
              disabled
            />
          </Grid>
          <Grid
            container
            xs={10}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            item
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                copyToClipboard(finalResult);
                setState("input");
                setScript("");
                setResponse("In progress...");
                setFinalResult("");
              }}
            >
              Finish
            </Button>
          </Grid>
        </Grid>
      );
    };
    switch (state) {
      case "input":
        setComponent(getInputStep());
        break;
      case "executing":
        setComponent(<Loading message={response} />);
        break;

      case "done":
        setComponent(getOutputStep());
        break;

      default:
        setComponent(<></>);
        break;
    }
  }, [finalResult, response, script, state]);

  return component;
};
