import React, { useState, Fragment } from "react";
import Fab from "@material-ui/core/Fab";

export const muStyle = {
    transform: "scale(1.2)",
    marginLeft: "3px",
};

export const faStyle = {
    fontSize: "30px",
    filter: "drop-shadow(.5px .5px 1.5px black)",
    color: "white",
};

export const faStyleSmall = {
    fontSize: "25px",
};

const handleBtnShadow = (shadowColor, custom) => {
    if (shadowColor) {
        return `drop-shadow(.001em .15em .2em ${shadowColor})`;
    }

    if (custom) {
        return `drop-shadow(${custom})`;
    }

    return "";
};

// NEED CHANGE ICON TO FONT AWESOME TOBE MORE FLEXIBLE
export default function ButtonFab({
    // main
    title = "button title",
    onClick,
    variant = "extended", // extended or round
    size = "large", // small, medium, large
    color = "var(--themeS)",
    backgroundColor = "var(--themeP)",
    // endmain
    position = "relative",
    top,
    right,
    bottom,
    left,
    fontSize,
    fontSizeTxt,
    fontWeight,
    iconMu,
    iconFontAwesome,
    toggleStatus,
    iconAfterClick = null,
    needClickAndToggle = false,
    iconMarginLeft,
    iconFontSize,
    needIconShadow = true,
    shadowColor,
    shadowColorCustom,
    titleSize,
    id,
    textTransform,
    needTxtNoWrap,
    needBtnShadow,
    onMouseOver,
    zIndex,
    width,
    height,
    disabled = false,
}) {
    const [toggle, setToggle] = useState("");

    const styles = {
        icon: {
            fontSize: iconFontSize,
            marginLeft: iconMarginLeft,
        },
        fab: {
            fontWeight,
            fontSize,
            position,
            top,
            left,
            bottom,
            right,
            zIndex,
            width,
            height,
            outline: "none",
            backgroundColor,
            filter:
                needBtnShadow &&
                handleBtnShadow(shadowColor, shadowColorCustom),
        },
    };

    const showIcon = (iconFontAwesome) => {
        if (iconFontAwesome && typeof iconFontAwesome !== "string") {
            return (
                <i
                    className={`${variant === "extended" && "ml-2"} ${
                        needIconShadow ? "icon-shadow" : ""
                    }`}
                >
                    {toggle ? iconAfterClick : iconFontAwesome}
                </i>
            );
        }

        return (
            iconFontAwesome && (
                <i
                    style={styles.icon}
                    className={toggle ? iconAfterClick : iconFontAwesome}
                ></i>
            )
        );
    };

    const showMuIcon = (iconMu) => (
        <i className={`${variant === "extended" && "ml-2"} icon-shadow`}>
            {iconMu}
        </i>
    );

    return (
        <Fab
            id={id}
            variant={variant}
            onClick={onClick}
            onMouseOver={onMouseOver}
            size={size}
            aria-label={title}
            style={styles.fab}
            disabled={disabled}
        >
            <span
                className={`btn-txt ${
                    needTxtNoWrap ? "text-nowrap" : ""
                } d-flex align-self-items text-shadow ${
                    titleSize ? `text-${titleSize}` : "text-normal"
                } font-weight-bold`}
                style={{ textTransform: textTransform || "capitalize" }}
            >
                {title}
                {iconFontAwesome && showIcon(iconFontAwesome)}
                {iconMu && showMuIcon(iconMu)}
            </span>
            <style jsx>
                {`
                    .btn-txt {
                        color: ${color};
                    }
                `}
            </style>
        </Fab>
    );
}
