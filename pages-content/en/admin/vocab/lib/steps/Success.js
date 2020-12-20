import ButtonFab from "components/buttons/material-ui/ButtonFab";

export default function Success({ word = "love", setCurrStep }) {
    return (
        <section className="mx-3 full-page text-center">
            <h1>A palavra {word.toUpperCase()} foi salva com sucesso!</h1>
            <div className="container-center mt-2">
                <ButtonFab
                    title="Adicionar outra"
                    onClick={() => setCurrStep("translation")}
                />
            </div>
        </section>
    );
}
