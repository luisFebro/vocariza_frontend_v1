import ButtonFab from "components/buttons/material-ui/ButtonFab";
import useScrollUp from "hooks/scroll/useScrollUp";

export default function Success({ word = "love", setCurrStep }) {
    useScrollUp();

    return (
        <section className="mx-3 full-height text-center">
            <h1>The word {word.toUpperCase()} was saved!</h1>
            <div className="container-center mt-5">
                <ButtonFab
                    title="Add more"
                    onClick={() => setCurrStep("translation")}
                />
            </div>
        </section>
    );
}
