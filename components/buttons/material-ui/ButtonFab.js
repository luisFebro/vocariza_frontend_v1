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
        return `drop-shadow(.001em .15em .1em ${shadowColor})`;
    }

    if (custom) {
        return `drop-shadow(${custom})`;
    }

    return "";
};

// NEED CHANGE ICON TO FONT AWESOME TOBE MORE FLEXIBLE
export default function ButtonFab({
    // main
    title,
    onClick,
    variant = "extended", // extended or round
    size = "large", // extra-small, small, medium, large
    color = "var(--themeS)",
    backgroundColor = "var(--themeP)",
    muIcon,
    faIcon,
    // endmain
    onMouseOver,
    onMouseDown,
    onTouchStart,
    position = "relative",
    top,
    right,
    bottom,
    left,
    fontSize,
    fontSizeTxt,
    fontWeight,
    toggleStatus,
    iconAfterClick = null,
    needClickAndToggle = false,
    iconMarginLeft,
    iconFontSize,
    needIconShadow,
    shadowColor,
    shadowColorCustom,
    titleSize,
    id,
    textTransform,
    needTxtNoWrap,
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
                (shadowColor || shadowColorCustom) &&
                handleBtnShadow(shadowColor, shadowColorCustom),
        },
    };

    const showIcon = (faIcon) => {
        if (faIcon && typeof faIcon !== "string") {
            return (
                <i
                    className={`${variant === "extended" ? "ml-2" : ""} ${
                        needIconShadow ? "icon-shadow" : ""
                    } d-flex align-self-center`}
                >
                    {toggle ? iconAfterClick : faIcon}
                </i>
            );
        }

        return (
            faIcon && (
                <i
                    style={styles.icon}
                    className={toggle ? iconAfterClick : faIcon}
                ></i>
            )
        );
    };

    const showMuIcon = (muIcon) => (
        <i className={`${variant === "extended" && "ml-2"} icon-shadow`}>
            {muIcon}
        </i>
    );

    const istTinySize = size === "extra-small" || size === "nano";

    return (
        <Fragment>
            <Fab
                id={id}
                variant={variant}
                onClick={onClick}
                className={istTinySize ? size : ""}
                onMouseOver={onMouseOver}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                size={istTinySize ? "small" : size}
                aria-label={title}
                style={styles.fab}
                disabled={disabled}
            >
                <span
                    className={`btn-txt ${
                        needTxtNoWrap ? "text-nowrap" : ""
                    } text-shadow ${
                        titleSize ? `text-${titleSize}` : "text-normal"
                    } font-weight-bold`}
                    style={{ textTransform: textTransform || "capitalize" }}
                >
                    {title}
                    {faIcon && showIcon(faIcon)}
                    {muIcon && showMuIcon(muIcon)}
                </span>
            </Fab>
            <style jsx global>
                {`
                    .btn-txt {
                        color: ${color};
                    }

                    .extra-small.MuiFab-sizeSmall {
                        width: 32px;
                        height: 32px;
                    }

                    .extra-small.MuiFab-root {
                        min-height: 0px;
                    }

                    .extra-small svg {
                        height: 0.85em !important;
                    }

                    .nano.MuiFab-sizeSmall {
                        width: 25px;
                        height: 25px;
                    }

                    .nano.MuiFab-root {
                        min-height: 0px;
                    }

                    .nano svg {
                        height: 0.7em !important;
                    }
                `}
            </style>
        </Fragment>
    );
}
