import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import theme from "../../theme/main-theme";

const ITEM_HEIGHT = 48;

interface ParseMenuProps {
  addNewModalState: (state: boolean) => void;
  compareState: (state: boolean) => void;
}
export const ParseMenu = (props: ParseMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        style={{ color: theme.palette.text.primary }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          style={{ color: theme.palette.text.secondary }}
          onClick={() => {
            props.addNewModalState(true);
            handleClose();
          }}
        >
          Decode New
        </MenuItem>
        <MenuItem
          style={{ color: theme.palette.text.secondary }}
          onClick={() => {
            props.compareState(true);
            handleClose();
          }}
        >
          Compare
        </MenuItem>
      </Menu>
    </div>
  );
};
