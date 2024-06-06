import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import useIcons from "../../hooks/useIcons";
import { Link } from "react-router-dom";
import { CSSProperties } from "@mui/material/styles/createMixins";

interface MoreOptionsProps {
  options: {
    name: string;
    action: () => void;
    isLink: boolean;
    to?: string;
  }[];
  sx?: CSSProperties;
}

export default function MoreOptions({ options, sx }: MoreOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { MoreVertIcon } = useIcons();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={
          sx
            ? sx
            : {
                position: "absolute",
                right: "10px",
                top: "auto",
                float: "right",
                color: "var(--primary)",
              }
        }
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
      >
        {options.map((option, key) => (
          <MenuItem
            key={`${option.name}-${key}`}
            onClick={() => {
              option.action();
              handleClose();
            }}
          >
            {option.isLink ? (
              <Link to={option.to || ""}>{option.name}</Link>
            ) : (
              option.name
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
