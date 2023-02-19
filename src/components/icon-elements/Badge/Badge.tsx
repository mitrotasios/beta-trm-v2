import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  Sizes,
  borderRadius,
  colorClassNames,
  makeClassName,
  mergeRefs,
  spacing,
} from "lib";
import { Color, Size } from "../../../lib";
import { badgeProportions, iconSizes } from "./styles";
import { colorPalette } from "lib/theme";
import Tooltip, { useTooltip } from "components/util-elements/Tooltip/Tooltip";

const makeBadgeClassName = makeClassName("Badge");

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  size?: Size;
  icon?: React.ElementType;
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    color = BaseColors.Blue,
    icon,
    size = Sizes.SM,
    tooltip,
    className,
    children,
    ...other
  } = props;

  const Icon = icon ? icon : null;

  const { tooltipProps, getReferenceProps } = useTooltip();

  return (
    <>
      <Tooltip text={tooltip} {...tooltipProps} />
      <span
        ref={mergeRefs([ref, tooltipProps.refs.setReference])}
        className={twMerge(
          makeBadgeClassName("root"),
          "w-max flex-shrink-0 inline-flex justify-center items-center cursor-default",
          colorClassNames[color][colorPalette.darkText].textColor,
          colorClassNames[color][colorPalette.lightBackground].bgColor,
          borderRadius.full.all,
          badgeProportions[size].paddingX,
          badgeProportions[size].paddingY,
          badgeProportions[size].fontSize,
          className,
        )}
        {...getReferenceProps}
        {...other}
      >
        {Icon ? (
          <Icon
            className={twMerge(
              makeBadgeClassName("icon"),
              spacing.twoXs.negativeMarginLeft,
              spacing.xs.marginRight,
              iconSizes[size].height,
              iconSizes[size].width,
            )}
          />
        ) : null}
        <p className={twMerge(makeBadgeClassName("text"), "text-sm whitespace-nowrap")}>
          {children}
        </p>
      </span>
    </>
  );
});

export default Badge;
