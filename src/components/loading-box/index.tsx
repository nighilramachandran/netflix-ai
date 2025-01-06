import React, { useMemo } from "react";

import Stack from "@mui/material/Stack";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { RequestStatus } from "../../interfaces";

interface Props {
  status?: RequestStatus;
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
}

export const LoadingBox: React.FC<Props & BoxProps> = (props) => {
  const { status, isLoading, emptyMessage, children, ...rest } = props;
  const default_props = useMemo(
    () => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 100,
      ...rest,
    }),
    [rest]
  );

  if (status === "error") {
    return (
      <Box {...default_props}>
        <Stack alignItems={"center"} spacing={2}>
          <ErrorOutline color="error" fontSize="large" />
          <Typography color="error">somthing_went_wrong"</Typography>
        </Stack>
      </Box>
    );
  }

  if (status === "data") {
    return <Box {...rest}>{children}</Box>;
  }

  return (
    <Box {...default_props}>
      <CircularProgress />
    </Box>
  );
};
