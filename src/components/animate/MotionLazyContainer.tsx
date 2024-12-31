import React, { ReactNode } from "react";
import { LazyMotion, domMax } from "framer-motion";

type Props = {
  children: ReactNode;
};
const MotionLazyContainer: React.FC<Props> = ({ children }) => {
  return (
    <LazyMotion strict features={domMax}>
      {children}
    </LazyMotion>
  );
};

export default MotionLazyContainer;
