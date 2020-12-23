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

export default function DefinitionMoreBtn({ data }) {
    const [fullOpen, setFullOpen] = useState(false);

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleFullOpen = (e) => {
        stopPropagation(e);
        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    const AsyncComp = (
        <AsyncDefinitionContent data={data} handleFullClose={handleFullClose} />
    );

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
                contentComp={AsyncComp}
                fullOpen={fullOpen}
                setFullOpen={handleFullClose}
                needIndex={false}
            />
        </section>
    );
}

/*
 */
