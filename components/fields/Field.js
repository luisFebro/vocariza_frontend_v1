import { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { handleEnterPress, handleOnChange } from "./helpers/index";

export default function Field({
    size = "normal",
    textAlign = "text-left",
    name,
    value,
    onChange,
    error,
    placeholder,
    autoComplete = "off",
    variant = "outlined",
    enterCallback,
    onChangeCallback,
}) {
    const sizes = ["small", "normal", "large"];
    const variants = ["filled", "outlined", "standard"];
    const textAligns = ["text-center", "text-left"];
    if (!sizes.includes(size)) throw new Error("Invalid field size");
    if (!variants.includes(variant)) throw new Error("Invalid variant");
    if (!textAligns.includes(textAlign)) throw new Error("Invalid text align");

    // Warning: use a <form></form> wrapper to a group or even an individual field.
    // TextField is simply rendered as a raw <input /> tag
    return (
        <Fragment>
            <TextField
                className={`${size} ${textAlign}`}
                placeholder={placeholder}
                name={name}
                value={value}
                variant={variant}
                onChange={(e) => handleOnChange(e, onChangeCallback)}
                onKeyPress={(e) => handleEnterPress(e, enterCallback)}
                error={error}
                autoComplete={autoComplete}
            />
            <style jsx global>
                {`
                    .large {
                        background-color: var(--mainWhite);
                        margin: 0 10px !important;
                    }
                    .MuiInputBase-input {
                        z-index: 2000;
                        color: var(--themeP) !important;
                        font: var(--mainFont);
                        padding: 10px;
                    }

                    .large div .MuiInputBase-input {
                        font-size: 3em;
                    }

                    .text-left div .MuiInputBase-input {
                        text-align: left;
                    }

                    .text-center div .MuiInputBase-input {
                        text-align: center;
                    }
                `}
            </style>
        </Fragment>
    );
}

/*
InputProps={{
    style: styles.fieldFormValue, // alignText is not working here... tried input types and variations
}}
inputProps={{ style: styles.input }}
 */
