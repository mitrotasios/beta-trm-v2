import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  borderRadius,
  colorClassNames,
  fontSize,
  fontWeight,
  sizing,
  spacing,
} from "lib";
import { Color } from "../../../lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentageValue: number;
  label?: string;
  tooltip?: string;
  showAnimation?: boolean;
  color?: Color;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const {
    percentageValue,
    label,
    showAnimation = true,
    color = BaseColors.Blue,
    className,
    ...other
  } = props;

  const primaryBgColor = colorClassNames[color][colorPalette.background].bgColor;
  const secondaryBgColor = colorClassNames[color][colorPalette.lightBackground].bgColor;

  return (
    <div ref={ref} className={twMerge("flex items-center w-full", className)} {...other}>
      <div
        className={twMerge(
          "relative flex items-center w-full",
          secondaryBgColor,
          sizing.xs.height,
          borderRadius.lg.all,
        )}
      >
        <div
          className={twMerge(primaryBgColor, "flex-col h-full", borderRadius.lg.all)}
          style={{
            width: `${percentageValue}%`,
            transition: showAnimation ? "all 2s" : "",
          }}
        />
      </div>
      {label ? (
        <div
          className={twMerge(
            "w-16 truncate text-right",
            colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor,
            spacing.sm.marginLeft,
          )}
        >
          <p className={twMerge("shrink-0 whitespace-nowrap truncate", fontSize.sm, fontWeight.sm)}>
            {label}
          </p>
        </div>
      ) : null}
    </div>
  );
});

export default ProgressBar;
