import React, { useEffect } from "react";
import { CastItem, MovieCasting } from "../../interfaces";
import _ from "lodash";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { IMG_URL } from "../../utils/constants/Global";
import { m } from "framer-motion";
import MotionViewport from "../animate/MotionViewPort";
import { varFade } from "../animate/variant";

interface CastingProps {
  name: string;
  members: CastItem[];
}

const top = 5;

const getTopItems = (
  items: CastItem[] | undefined,
  top: number
): CastItem[] => {
  if (!items) return [];
  const orderedItems = _.orderBy(items, ["popularity"], ["desc"]);
  const uniqueItems = _.uniqBy(orderedItems, "name");

  return _.take(uniqueItems, top);
};

const CastingDeatils: React.FC<MovieCasting> = (props) => {
  const { cast, crew } = props;

  const casting: CastingProps[] = [
    { name: "Top Actors", members: getTopItems(cast, top) },
    { name: "Top Crew", members: getTopItems(crew, top) },
  ];

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Stack component={MotionViewport} spacing={2}>
      {casting.length > 0 &&
        casting?.map((el) => {
          return (
            <Box key={el.name} textAlign={"center"}>
              <m.div variants={varFade().inUp}>
                <Typography margin={4}>{el.name}</Typography>
              </m.div>
              <Stack
                flexDirection={"row"}
                flexWrap="wrap"
                width={"100%"}
                sx={{ justifyContent: "center", gap: 10 }}
              >
                {el?.members.map((mem, index) => {
                  return (
                    <m.div variants={varFade().inUp} key={`${mem.id}_${index}`}>
                      <Card
                        path={mem.profile_path}
                        o_name={mem.original_name}
                        character={mem.character}
                        dept={mem.known_for_department}
                      />
                    </m.div>
                  );
                })}
              </Stack>
            </Box>
          );
        })}
    </Stack>
  );
};

interface CardProps {
  path: string;
  o_name: string;
  character: string;
  dept: string;
}

// components
const Card: React.FC<CardProps> = ({ path, o_name, character, dept }) => {
  return (
    <Stack>
      <StyledCardBox>
        <img
          src={IMG_URL + (path ?? "/bgOGxlpen6HoJUXPEkL1kZrCvdR.jpg")}
          alt=""
        />
      </StyledCardBox>
      <Typography variant="subtitle1">{o_name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {dept}
      </Typography>
      <Typography variant="subtitle1">{character}</Typography>
    </Stack>
  );
};

// styles

const StyledCardBox = styled(Box)(() => ({
  maxWidth: "150px",
  width: "100%",
  height: "200px",
  borderRadius: "12px",
  overflow: "hidden",
  "&>img": {
    width: "100%",
    height: "100%",
  },
}));

export default CastingDeatils;
