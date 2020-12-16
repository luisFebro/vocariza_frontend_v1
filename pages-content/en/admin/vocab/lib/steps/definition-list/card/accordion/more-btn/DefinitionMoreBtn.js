import { useState } from "react";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import FullModal from "components/modals/FullModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dynamic from "components/Dynamic";

const AsyncDefinitionContent = Dynamic(() =>
    import(
        "./DefinitionContent" /* webpackChunkName: "definition-content-full-modal-lazy" */
    )
);

export default function DefinitionMoreBtn() {
    const [fullOpen, setFullOpen] = useState(false);

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleFullOpen = (e) => {
        stopPropagation(e);
        console.log("HITTT FULL OPNE");
        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    return (
        <section>
            <ButtonFab
                variant="round"
                size="large"
                faIcon={<FontAwesomeIcon icon="plus" />}
                shadowColor="white"
                onClick={handleFullOpen}
                onMouseDown={handleFullOpen}
                onTouchStart={handleFullOpen}
            />
            <FullModal
                contentComp={<AsyncDefinitionContent />}
                fullOpen={fullOpen}
                setFullOpen={handleFullClose}
            />
        </section>
    );
}

/*
 */
