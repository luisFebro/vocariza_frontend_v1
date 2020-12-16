import Dialog from "@material-ui/core/Dialog";
import ButtonLink from "components/buttons/material-ui/ButtonLink";
import CloseBtn from "components/buttons/CloseBtn";
import RadiusBtn from "components/buttons/RadiusBtn";

const getStyles = ({ needIndex }) => ({
    // assign as false when you need to open other modals above this component like calendar dialog
    root: {
        zIndex: needIndex ? 3000 : 15,
        overflowX: "hidden",
    },
});

export default function FullModal({
    contentComp,
    fullOpen,
    setFullOpen,
    style = {},
    animatedClass,
    exitBtn,
    showBackBtn = false,
    needIndex = true,
    backgroundColor,
}) {
    const styles = getStyles({ needIndex });

    const handleOpen = () => {
        return fullOpen;
    };

    const handleModalClose = () => {
        setFullOpen((prevStatus) => !prevStatus);
    };

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: backgroundColor || "var(--mainWhite)",
                    maxWidth: "500px",
                    overflowX: "hidden",
                },
            }}
            maxWidth="md"
            fullWidth
            style={styles.root}
            fullScreen={true}
            open={handleOpen()}
            aria-labelledby="form-dialog-title"
            className={`${animatedClass || ""}`}
            onScroll={null}
        >
            {contentComp}
            {exitBtn === "text" ? (
                <RadiusBtn
                    position="fixed"
                    onClick={setFullOpen}
                    top={0}
                    right={15}
                    title="voltar"
                    backgroundColor="black"
                    size="extra-small"
                />
            ) : (
                <CloseBtn
                    onClick={setFullOpen}
                    size="40px"
                    top="10px"
                    right="10px"
                />
            )}

            {showBackBtn && (
                <div className="my-4 container-center">
                    <ButtonLink
                        title="back"
                        color="var(--mainWhite)"
                        backgroundColor="var(--themeP)"
                        onClick={handleModalClose}
                    />
                </div>
            )}
        </Dialog>
    );
}
