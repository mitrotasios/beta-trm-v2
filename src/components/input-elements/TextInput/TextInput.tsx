"use client";

import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  border,
  borderRadius,
  boxShadow,
  colorClassNames,
  fontSize,
  fontWeight,
  mergeRefs,
  sizing,
  spacing,
} from "lib";
import { ExclamationFilledIcon } from "assets";
import { DEFAULT_COLOR, TRANSPARENT, WHITE, colorPalette } from "lib/theme";

const getTextColor = (error: boolean, disabled: boolean) => {
  if (error) return colorClassNames[BaseColors.Rose][colorPalette.text].textColor;
  if (disabled) return colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor;
  return colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor;
};

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  defaultValue?: string;
  value?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    placeholder = "Type...",
    icon,
    error = false,
    errorMessage,
    disabled = false,
    className,
    ...other
  } = props;
  const Icon = icon;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const textColor = getTextColor(error, disabled);
  const bgColor = disabled
    ? colorClassNames[DEFAULT_COLOR][colorPalette.canvasBackground].bgColor
    : colorClassNames[WHITE]["none"].bgColor;
  const boderColor = error
    ? colorClassNames[BaseColors.Rose][colorPalette.ring].borderColor
    : colorClassNames[DEFAULT_COLOR][colorPalette.ring].borderColor;

  const handleFocusChange = (isFocused: boolean) => {
    if (isFocused === false) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
    setIsFocused(isFocused);
  };

  return (
    <>
      <div
        className={twMerge(
          "relative w-full flex items-center min-w-[10rem] focus:outline-none focus:ring-2",
          bgColor,
          className,
          colorClassNames[BaseColors.Blue][colorPalette.ring].focusRingColor,
          boderColor,
          borderRadius.md.all,
          border.sm.all,
          boxShadow.sm,
          textColor,
          isFocused &&
            twMerge("ring-2", colorClassNames[BaseColors.Blue][colorPalette.ring].ringColor),
        )}
        onClick={() => {
          if (!disabled) {
            handleFocusChange(true);
          }
        }}
        onFocus={() => {
          handleFocusChange(true);
        }}
        onBlur={() => {
          handleFocusChange(false);
        }}
      >
        {Icon ? (
          <Icon
            className={twMerge(
              "shrink-0",
              sizing.lg.height,
              sizing.lg.width,
              colorClassNames[DEFAULT_COLOR][colorPalette.lightText].textColor,
              spacing.xl.marginLeft,
            )}
            aria-hidden="true"
          />
        ) : null}
        <input
          ref={mergeRefs([ref, inputRef])}
          type="text"
          className={twMerge(
            "w-full focus:outline-none focus:ring-0",
            colorClassNames[TRANSPARENT]["none"].bgColor,
            colorClassNames[DEFAULT_COLOR][colorPalette.darkText].textColor,
            Icon ? spacing.lg.paddingLeft : spacing.twoXl.paddingLeft,
            error ? spacing.lg.paddingRight : spacing.twoXl.paddingRight,
            spacing.sm.paddingY,
            fontSize.sm,
            fontWeight.md,
            border.none.all,
            "placeholder:text-gray-500",
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...other}
        />
        {error ? (
          <ExclamationFilledIcon
            className={twMerge(
              spacing.xl.marginRight,
              sizing.lg.height,
              sizing.lg.width,
              colorClassNames[BaseColors.Rose][colorPalette.text].textColor,
            )}
            aria-hidden="true"
          />
        ) : null}
      </div>
      {errorMessage ? (
        <p
          className={twMerge(
            "text-sm",
            colorClassNames[BaseColors.Rose][colorPalette.text].textColor,
          )}
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
});

export default TextInput;