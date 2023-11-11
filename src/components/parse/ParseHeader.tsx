import { Container } from "@mui/material";
import * as React from "react";
import { SearchBar } from "./SearchBar";
import { ParseMenu } from "./ParseMenu";

interface ParseHeaderProps {
  addNewModalState: (state: boolean) => void;
  compareState: (state: boolean) => void;
  searchState: string;
  setSearch: (value: string) => void;
  removeCallback: () => void;
}
export const ParseHeader = (props: ParseHeaderProps) => {
  return (
    <Container style={{ display: "flex" }}>
      <SearchBar searchState={props.searchState} setSearch={props.setSearch} />
      <ParseMenu
        compareState={props.compareState}
        addNewModalState={props.addNewModalState}
        removeCallback={props.removeCallback}
      />
    </Container>
  );
};
