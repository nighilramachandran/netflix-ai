import { Dialog, DialogContent, DialogProps, IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface CustomModalProps extends DialogProps {
  children?: ReactNode;
  onClose?: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = (props) => {
  const { children, onClose, ...rest } = props;

  return (
    <Dialog
      fullWidth
      {...rest}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
