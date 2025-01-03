import { m, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import useResponsive from "../../utils/hooks/useResponsive";
import { varContainer } from "./variant";

type IProps = BoxProps & MotionProps;

interface Props extends IProps {
  children: ReactNode;
  disableAnimatedMobile?: boolean;
}

export default function MotionViewport({
  children,
  disableAnimatedMobile = true,
  ...other
}: Readonly<Props>) {
  const isDesktop = useResponsive("up", "sm");

  if (!isDesktop && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
