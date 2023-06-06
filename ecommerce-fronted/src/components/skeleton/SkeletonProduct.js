import React from "react";
import { Card, Skeleton, Stack } from "@mui/material";

export default function SkeletonProduct(props) {
  const { count } = props;
  return (
    <>
      <Card sx={{ marginLeft: "14px", width: "272px", marginBottom: "10px" }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: "250px", height: "300px !important" }}
          count={count}
        />
        <Stack spacing={2} sx={{ p: 3 }}>
          <Skeleton variant="text" sx={{ width: 0.99 }} count={count} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
          <h1>hello</h1>
            <Skeleton
              variant="text"
              sx={{ marginLeft: "65px", marginTop: "0px", width: 70 }}
              count={count}
            />
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
