import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPerilsAction, perilsSlice, selectPerils } from "./perilsSlice";
import { Peril } from "./perilsApi";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
  Typography,
} from "@mui/material";

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
      return <Container>Loading...</Container>;
    }
    case "error": {
      return <Container>Something went wrong</Container>;
    }
    case "idle": {
      if (!perils.value?.length) {
        return <Container>No perils for this contract type</Container>;
      }
      return (
        <Container>
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

function PerilCard({
  peril,
  index,
  selected,
}: {
  peril: Peril;
  index: number;
  selected: boolean;
}) {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(
    () => dispatch(perilsSlice.actions.select(index)),
    [dispatch, index]
  );
  const handleClose = useCallback(
    () => dispatch(perilsSlice.actions.deselect()),
    [dispatch]
  );
  const handlePrev = useCallback(
    () => dispatch(perilsSlice.actions.selectPrev()),
    [dispatch]
  );
  const handleNext = useCallback(
    () => dispatch(perilsSlice.actions.selectNext()),
    [dispatch]
  );
  return (
    <>
      <Card raised onClick={handleClick}>
        <CardActionArea>
          <CardContent>
            <img
              alt=""
              width="40"
              height="40"
              src={peril.icon.variants.light.svgUrl}
            />
            <Typography>{peril.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog open={selected} onClose={handleClose}>
        <DialogTitle>
          <button onClick={handlePrev}>&lt;</button>
          {peril.title}
          <button onClick={handleNext}>&gt;</button>
        </DialogTitle>
        <div>{peril.description}</div>
        <ul>
          {peril.covered.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Dialog>
    </>
  );
}
