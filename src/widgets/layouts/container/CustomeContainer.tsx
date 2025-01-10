import { Container } from "@mui/material";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  withPadding?: boolean;
}

const CustomeContainer: React.FC<ContainerProps> = ({
  children,
  withPadding = true,
}) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ padding: withPadding ? "0 35px" : "" }}
    >
      {children}
    </Container>
  );
};

export default CustomeContainer;
