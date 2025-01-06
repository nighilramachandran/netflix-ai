import React, { useEffect } from "react";
import { CastItem, MovieCasting } from "../../interfaces";
import _ from "lodash";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { IMG_URL } from "../../utils/constants/Global";
// import { castImageCache } from "../../utils/helpers/CacheImage";

interface CastingProps {
  name: string;
  members: CastItem[];
}

const CastingDeatils: React.FC<MovieCasting> = (props) => {
  const { cast, crew } = props;

  const top = 5;

  const top5Casting: CastItem[] =
    cast && _.take(_.orderBy(cast, ["popularity"], ["desc"]), top);

  const top5Crew: CastItem[] =
    crew && _.take(_.orderBy(crew, ["popularity"], ["desc"]), top);

  const casting: CastingProps[] = [
    { name: "Top Actors", members: top5Casting },
    { name: "Top Crew", members: top5Crew },
  ];

  useEffect(() => {
    // console.log("castImageCache", castImageCache);

    return () => {};
  }, []);

  return (
    <Stack>
      {casting.length > 0 &&
        casting?.map((el) => {
          return (
            <Box key={el.name} textAlign={"center"}>
              <Typography margin={2}>{el.name}</Typography>
              <Stack
                flexDirection={"row"}
                flexWrap="wrap"
                width={"100%"}
                sx={{ justifyContent: "center", gap: 10 }}
              >
                {el?.members.map((mem, index) => {
                  return (
                    <Card
                      key={`${mem.id}_${index}`}
                      path={mem.profile_path}
                      o_name={mem.original_name}
                      character={mem.character}
                      dept={mem.known_for_department}
                    />
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
