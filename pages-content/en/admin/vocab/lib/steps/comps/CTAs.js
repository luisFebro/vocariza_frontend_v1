import ButtonFab from "components/buttons/material-ui/ButtonFab";
import ButtonLink from "components/buttons/material-ui/ButtonLink";

export default function CTAs({ onClickBack, onClickNext }) {
    return (
        <section className="container-center">
            {onClickBack && (
                <div className="mr-3">
                    <ButtonLink title="back" onClick={onClickBack} />
                </div>
            )}
            {onClickNext && (
                <ButtonFab title="continue" onClick={onClickNext} />
            )}
        </section>
    );
}
