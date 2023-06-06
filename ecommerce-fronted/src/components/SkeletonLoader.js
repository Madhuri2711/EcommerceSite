import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonLoader(props) {
  const {
    count = 5,
    baseColor = "",
    highlightColor = "",
    height = 50,
    width = "100%",
    borderRadius,
    containerClassName,
    style,
  } = props;
  return (
    <SkeletonTheme
      baseColor={baseColor}
      highlightColor={highlightColor}
      height={height}
      width={width}
      borderRadius={borderRadius}
    >
      <div style={{ margin: "20px 0" }}>
        <Skeleton
          count={count}
          containerClassName={containerClassName}
          style={style}
        />
      </div>
    </SkeletonTheme>
  );
}

export default SkeletonLoader;
