import React, { useEffect, useState } from "react";
import { ParseHeader, PayloadCard } from "../components";
import AddNewModal from "../components/parse/AddNewModal";
import { PayloadResponse } from "../components/parse/PayloadResponse";
import { Grid, Typography } from "@mui/material";
import PayloadExpandedModal from "../components/parse/PayloadExpandedModal";
import IndexedDBProvider from "../provider/db/IndexedDBProvider";
import { Loading } from "../components/loading";
import ComparePayloadModal from "../components/parse/ComparePayloadModal";

export const ParsePayloadPage = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalState, setModalState] = useState(false);
  const [compareState, setCompareState] = useState(false);
  const [payloadExpandedState, setPayloadExpandedState] = useState(false);
  const [selectedPayload, setSelectedPayload] = useState({} as PayloadResponse);
  const [payloads, setPayloads] = useState([] as PayloadResponse[]);
  const [payloadsView, setPayloadsView] = useState([] as PayloadResponse[]);

  useEffect(() => {
    IndexedDBProvider.getAllData()
      .then((payloads) => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setPayloads(payloads);
      })
      .catch((error) => {
        console.error("Failed to load data:", error);
      });
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setPayloadsView(payloads.filter((x) => x.identifier.includes(search)));
    } else {
      setPayloadsView(payloads);
    }
  }, [payloads, search]);

  const onModalSuccess = (objectResponse: PayloadResponse) => {
    IndexedDBProvider.saveData(objectResponse).then(() => {
      setPayloads([...payloads, objectResponse]);
    });
  };

  return loading ? (
    <Loading message="Loaging Payloads..." />
  ) : (
    <>
      <Grid
        container
        style={{ marginTop: ".1rem", padding: ".1rem", paddingBottom: 10 }}
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={12} item>
          <ParseHeader
            searchState={search}
            setSearch={setSearch}
            addNewModalState={setModalState}
            compareState={setCompareState}
          />
        </Grid>
        <Grid
          xs={12}
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          style={{padding:"1rem"}}
        >
          {payloadsView.length > 0 ? (
            payloadsView.map((payload) => {
              return (
                <Grid item md={4} lg={6} xs={12} key={payload.id}>
                  <PayloadCard
                    onDelete={(payload) => {
                      IndexedDBProvider.deleteDataById(payload.id).then(() => {
                        setPayloads(payloads.filter((x) => x.id !== payload.id));
                      });
                    }}
                    onSelect={(payload) => {
                      setSelectedPayload(payload);
                      setPayloadExpandedState(true);
                    }}
                    payload={payload}
                  />
                </Grid>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
              }}
            >
              <Typography>No Payloads</Typography>
            </div>
          )}
        </Grid>
      </Grid>
      <AddNewModal onSuccess={onModalSuccess} setModalState={setModalState} state={modalState} />
      <PayloadExpandedModal
        state={payloadExpandedState}
        setModalState={setPayloadExpandedState}
        payload={selectedPayload}
      />
      <ComparePayloadModal
        setModalState={setCompareState}
        state={compareState}
        payloads={payloadsView}
      />
    </>
  );
};
