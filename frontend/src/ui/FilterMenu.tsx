import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Avatar } from "@mui/material";

interface filterMenuProps {
  setFilter: any;
  setPage: any;
}

export default function FilterMenu({ setFilter, setPage }: filterMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar>
          <FilterAltIcon />
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setFilter(null);
            setPage(1);
            handleClose();
          }}
          className="flex-center gap-2"
        >
          No Filter
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter("Login");
            setPage(1);
            handleClose();
          }}
          className="flex-center gap-2"
        >
          Login <span className="size-2 rounded-full bg-green-600" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter("Logout");
            setPage(1);
            handleClose();
          }}
          className="flex-center gap-2"
        >
          Logout <span className="size-2 rounded-full bg-red-600" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter("Others");
            setPage(1);
            handleClose();
          }}
          className="flex-center gap-2"
        >
          Others <span className="size-2 rounded-full bg-blue-500" />
        </MenuItem>
      </Menu>
    </div>
  );
}
