import { memo, useCallback } from "react";
import { Peril } from "./perilsApi";
import { useAppDispatch } from "../hooks";
import { perilsSlice } from "./perilsSlice";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const PerilCard = memo(
  ({
    peril,
    index,
    selected,
  }: {
    peril: Peril;
    index: number;
    selected: boolean;
  }) => {
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

    const theme = useTheme();
    const isTiny = !useMediaQuery(theme.breakpoints.up("sm"));

    return (
      <>
        <Card
          raised
          onClick={handleClick}
          sx={{
            margin: { xs: 0.5, sm: 2 },
            width: { xs: "100%", sm: "10rem" },
          }}
        >
          <CardActionArea sx={{ height: "100%" }}>
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
        <Dialog
          open={selected}
          fullScreen={isTiny}
          sx={{ padding: "1rem", minHeight: "sx" }}
          onClose={handleClose}
        >
          <DialogTitle
            sx={{
              paddingTop: "1.5rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              title="close"
              onClick={handleClose}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton title="previous" onClick={handlePrev}>
              <ChevronLeftIcon />
            </IconButton>
            {peril.title}
            <IconButton title="next" onClick={handleNext}>
              <ChevronRightIcon />
            </IconButton>
          </DialogTitle>
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="body1">{peril.description}</Typography>
            <Divider sx={{ marginTop: "1rem" }} />
            <ul>
              {peril.covered.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Box>
        </Dialog>
      </>
    );
  }
);
