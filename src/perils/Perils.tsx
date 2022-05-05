import { useEffect } from "react";
import { Container, LinearProgress, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPerilsAction, selectPerils } from "./perilsSlice";
import { PerilCard } from "./PerilCard";

export function Perils() {
  const perils = useAppSelector(selectPerils);
  const dispatch = useAppDispatch();

  // Quick and dirty data loading.  Would use router in real world
  useEffect(() => {
    dispatch(
      fetchPerilsAction({ contractType: "SE_APARTMENT_RENT", locale: "en_SE" })
    );
  }, [dispatch]);

  switch (perils.status) {
    case "loading": {
      return (
        <Container maxWidth="sm">
          <LinearProgress />
          <Typography variant="body1">Loading...</Typography>
        </Container>
      );
    }
    case "error": {
      return <Container maxWidth="sm">Something went wrong</Container>;
    }
    case "idle": {
      if (!perils.value?.length) {
        return (
          <Container maxWidth="sm">No perils for this contract type</Container>
        );
      }
      return (
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: 0,
          }}
        >
          {perils.value.map((peril, i) => {
            // NOTE: In real world we'd have some stable .id
            return (
              <PerilCard
                key={peril.title}
                index={i}
                selected={i === perils.selectedIndex}
                peril={peril}
              />
            );
          })}
        </Container>
      );
    }
  }
}

PerilCard.displayName = "PerilCard";
