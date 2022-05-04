import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPerilsAction, selectPerils } from "./perilsSlice";

export function Perils() {
  const data = useAppSelector(selectPerils);
  const dispatch = useAppDispatch();

  console.log("data", data);

  // Quick and dirty data loading.  Would use router in real world
  useEffect(() => {
    dispatch(
      fetchPerilsAction({ contractType: "SE_APARTMENT_RENT", locale: "en_SE" })
    );
  }, [dispatch]);

  switch (data.status) {
    case "loading": {
      return <div>Loading...</div>;
    }
    case "error": {
      return <div>Something went wrong</div>;
    }
    case "idle": {
      if (!data.value?.length) {
        return <div>No perils for this contract type</div>;
      }
      return (
        <div>
          <div>{data.value.length} perils</div>
          {data.value.map((item) => {
            return (
              <div key={item.title}>
                <img
                  alt=""
                  width="40"
                  height="40"
                  src={item.icon.variants.light.svgUrl}
                />
                {item.title} : {item.shortDescription}
              </div>
            );
          })}
        </div>
      );
    }
  }
  return <div>TODO: Perils</div>;
}
