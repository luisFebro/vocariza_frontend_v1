import { Fragment, useEffect } from "react";
import DraggableGrid from "components/DraggableGrid";
import useContext from "global/Context";
import DefinitionCard from "./card/accordion/DefinitionCard";
import ButtonFab from "components/buttons/material-ui/ButtonFab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getId from "utils/getId";

const getNewCardPattern = (word) => {
    return {
        en: word,
        br: "",
        definition: {
            en: getId(),
            br: "",
        },
        partOfSpeech: {
            en: "noun",
            br: "",
        },
        synonyms: [],
        antonyms: [],
        dialect: "american",
        langRegister: "neutral",
        vulgarLevel: "none",
        isNew: true, // to enable edit the part of speech button
    };
};

export default function DefinitionList() {
    const {
        setGlobalData,
        globalData: { wordData = {}, vocaEn },
    } = useContext();

    const gotWordData = Boolean(wordData);
    const mainData = gotWordData && wordData.treatedWordData;

    const ultimateList =
        gotWordData &&
        mainData.map((item, ind) => (
            <div
                style={{
                    cursor: "grab",
                }}
                key={item.definition.en}
                data-grid={{ i: item.definition.en, x: 0, y: 0, w: 4, h: 2 }} // use y to check the current dropped position from each element
            >
                <DefinitionCard wordData={item} ind={ind} />
            </div>
        ));

    const handleNewCard = () => {
        const newCard = getNewCardPattern(vocaEn);

        setGlobalData((prev) => ({
            ...prev,
            wordData: {
                ...prev.wordData,
                treatedWordData: [newCard, ...mainData],
            },
        }));
    };

    const getLayoutResult = (res) => {
        setGlobalData((prev) => ({
            ...prev,
            wordData: { ...prev.wordData, treatedWordData: res },
        }));
    };

    return (
        <Fragment>
            <div className="container-center mt-5">
                <ButtonFab
                    title="Add Card"
                    size="medium"
                    faIcon={<FontAwesomeIcon icon="plus" />}
                    onClick={handleNewCard}
                />
            </div>
            <DraggableGrid
                reactList={ultimateList}
                rawData={mainData}
                getLayoutResult={getLayoutResult}
                targetElem="definition"
            />
        </Fragment>
    );
}

/* ARCHIVES
useEffect(() => {
    if (!sortedDataList.length) return;
    setGlobalData((prev) => ({
        ...prev,
        wordData: { ...prev.wordData, treatedWordData: sortedDataList },
    }));
}, [sortedDataList]);
 */

/*
const ultimateList = useMemo(() => {
    return new Array(mainData.length).fill(undefined).map((val, ind) => {
      return(
       <div
           style={{
               cursor: "grab",
           }}
           key={mainData[ind].definition}
           data-grid={{ i: mainData[ind].definition, x: 0, y: 0, w: 4, h: 2 }} // use y to check the current dropped position from each element
       >
           <DefinitionCard wordData={mainData[ind]} ind={ind} />
       </div>
      );
    });
  }, [mainData.length]);
 */

/*
 const [skip, setSkip] = useState(0);
    const { businessId } = useAppSystem();

    const styles = getStyles();

    const params = { userId: businessId, skip };

    const {
        list,
        loading,
        ShowLoadingSkeleton,
        error,
        ShowError,
        needEmptyIllustra,
        hasMore,
        isOffline,
        ShowOverMsg,
    } = useAPIList({
        url: readTransactionHistory(),
        skip,
        params,
        listName: "investCardsList",
    });
    // console.log("lsitMOFO", listMOFO)
    const detectedCard = useElemDetection({
        loading,
        hasMore,
        setSkip,
        isOffline,
    });

    const handlePlanCode = (code) => {
        if (code === "OU") return "ouro";
        if (code === "PR") return "prata";
        if (code === "BR") return "bronze";
    };

    const handlePeriod = (per) => {
        if (per === "A") return "Anual";
        if (per === "M") return "Mensal";
    };

    const handlePeriodDays = (per) => {
        if (per === "A") return 365;
        if (per === "M") return 30;
    };

    const displayPlanType = (planCode, period, ordersStatement) => {
        const plan = handlePlanCode(planCode);

        const keys = ordersStatement && Object.keys(ordersStatement);
        const isUnlimitedService = ordersStatement && keys && keys[0] === "sms"; // like SMS with a long hardcoded date;

        const generatedPeriod = isUnlimitedService
            ? "Ilimitado"
            : handlePeriod(period);
        const planDesc = `P. ${plan && plan.cap()} ${generatedPeriod}`;

        const handleColor = (plan) => {
            if (plan === "ouro") return "yellow";
            if (plan === "prata") return "white";
            if (plan === "bronze") return "#edbead";
        };

        return (
            <section className="d-flex">
                <FontAwesomeIcon
                    icon="crown"
                    className="mr-2"
                    style={{
                        ...styles.icon,
                        color: handleColor(plan),
                        filter:
                            plan === "bronze"
                                ? "drop-shadow(black 0.001em 0.001em 0.5em)"
                                : "drop-shadow(0.001em 0.001em 0.15em grey)",
                    }}
                />
                <span
                    className={`position-relative  d-inline-block text-subtitle font-weight-bold text-shadow`}
                    style={{ lineHeight: "25px", top: 5 }}
                >
                    {planDesc}
                </span>
            </section>
        );
    };

    const showAccordion = () => {
        const actions = list.map((data) => {
            const {
                reference,
                paymentCategory: payCategory, // boleto, crédito, débito.
                ordersStatement,
            } = data;

            const referenceArray = reference && reference.split("-");
            const [planCode, qtt, period] = referenceArray;

            const chosenPlan = handlePlanCode(planCode);
            const chosenPeriod = handlePeriod(period);
            const periodDays = handlePeriodDays(period);

            const mainHeading = (
                <section className="d-flex flex-column align-self-start">
                    {displayPlanType(planCode, period, ordersStatement)}
                    <p
                        className="m-0 mt-4 text-normal text-shadow font-weight-bold"
                        style={{ lineHeight: "25px" }}
                    >
                        <span className="main-font text-em-1-4 font-weight-bold">
                            {convertToReal(data.investAmount, {
                                moneySign: true,
                            })}
                        </span>
                        <br />
                        <span className="main-font text-em-1 font-weight-bold">
                            via {payCategory}.
                        </span>
                    </p>
                </section>
            );

            const HiddenPanel = <PanelHiddenContent data={data} />;
            const sideHeading = handleSecHeading(data, styles);

            return {
                _id: data._id,
                mainHeading,
                secondaryHeading: sideHeading,
                // data here is immutable only. If you need handle a mutable data, set it to teh card's actions iteration.
                data: { ...data, periodDays, chosenPlan, chosenPeriod },
                hiddenContent: HiddenPanel,
            };
        });

        return (
            <InvestCard
                detectedCard={detectedCard}
                checkDetectedElem={checkDetectedElem}
                actions={actions}
                backgroundColor="var(--themePLight)"
                color="white"
                needToggleButton={true}
            />
        );
    };

    const showEmptyData = () => {
        return (
            <section>
                <Img
                    className="img-fluid margin-auto-90"
                    src="/img/illustrations/empty-fiddelize-invest.svg"
                    offline={true}
                    alt="sem investimentos"
                    title="Sem investimentos. Seu porquinho está vazio."
                />
                <div className="mt-3 mb-5 container-center">
                    <Link
                        to="/planos?cliente-admin=1"
                        className="no-text-decoration"
                    >
                        <ButtonFab
                            size="large"
                            title="FAZER O PRIMEIRO"
                            position="relative"
                            onClick={null}
                            backgroundColor={"var(--themeSDark--default)"}
                            variant="extended"
                        />
                    </Link>
                </div>
            </section>
        );
    };

    return (
        <Fragment>
            {needEmptyIllustra ? showEmptyData() : showAccordion()}
            {loading && <ShowLoadingSkeleton size="large" />}
            {error && <ShowError />}
            <ShowOverMsg />
        </Fragment>
    );
 */
