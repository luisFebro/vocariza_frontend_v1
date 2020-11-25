import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const crumbStore = {
    blog: {
        name: "blogues",
        icon: "pen-square",
    },
    vocabulario: {
        name: "vocabulários",
        icon: "",
    },
    expressao: {
        name: "expressões",
        icon: "",
    },
};

const getCrumbData = ({ n, isLast, mainCrumb }) => {
    if (isLast) {
        return {
            name: mainCrumb,
        };
    }

    return crumbStore[n];
};

export default function Breadcrumb({
    mainCrumb = "the main title in the page",
    crumbList,
}) {
    const router = useRouter();

    const isHome = router.route === "/";

    let resultList;
    if (!isHome) {
        const urlNames = router.asPath.split("/").slice(1);

        let currPath = "/";
        const crumbList = urlNames.map((n, ind) => {
            const isLast = ind === urlNames.length - 1;

            currPath += `${n}${!isLast ? "/" : ""}`;
            const { name, icon } = getCrumbData({ n, isLast, mainCrumb });

            return {
                path: currPath,
                name,
                icon,
            };
        });

        resultList = crumbList.map((data, ind) => {
            const needDelimeter = ind !== crumbList.length - 1;

            return (
                <Fragment key={ind}>
                    <li
                        itemScope
                        itemProp="itemListElement"
                        itemType="http://schema.org/ListItem"
                    >
                        <Link href={data.path}>
                            <a
                                className={
                                    !needDelimeter ? "last-crumb" : undefined
                                }
                                itemProp="item"
                                itemType="http://schema.org/Thing"
                                itemID="/"
                            >
                                {needDelimeter && (
                                    <FontAwesomeIcon
                                        icon={data.icon}
                                        className="mr-1"
                                    />
                                )}
                                <span itemProp="name">{data.name}</span>
                            </a>
                        </Link>
                        <meta itemProp="position" content={ind.toString()} />
                    </li>
                    {needDelimeter && (
                        <li>
                            <span className="a"></span>
                        </li>
                    )}
                    <style jsx>
                        {`
                            li {
                                list-style: none;
                            }

                            li > span.a {
                                display: inline-block;
                                padding: 0 15px;
                                font-size: 0.6em;
                            }

                            li > span.a:before {
                                content: "›";
                                color: var(--themeP);
                                transform: scale(3.5);
                                display: block;
                            }

                            .last-crumb {
                                display: none;
                                color: grey;
                                text-decoration: none;
                            }

                            @media screen and (min-width: 768px) {
                                .last-crumb {
                                    display: block;
                                }
                            }
                        `}
                    </style>
                </Fragment>
            );
        });
    }

    return (
        !isHome && (
            <Fragment>
                <ol
                    itemScope
                    itemType="http://schema.org/BreadcrumbList"
                    className="breadcrumbs"
                    aria-label="breadcrumbs"
                >
                    <li
                        itemScope
                        itemProp="itemListElement"
                        itemType="http://schema.org/ListItem"
                    >
                        <Link href="/">
                            <a
                                itemProp="item"
                                itemType="http://schema.org/Thing"
                                itemID="/"
                            >
                                <FontAwesomeIcon icon="home" className="mr-1" />
                                <span itemProp="name">início</span>
                            </a>
                        </Link>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li>
                        <span className="a"></span>
                    </li>
                    {resultList}
                </ol>
                <style jsx>
                    {`
                        .breadcrumbs {
                            display: flex;
                            padding: 0 20px;
                            margin: 10px 0 10px;
                            font-size: 0.8rem;
                        }

                        .breadcrumbs li {
                            list-style: none;
                        }

                        .breadcrumbs li > span.a {
                            display: inline-block;
                            margin: 0 6px;
                            font-size: 0.6em;
                        }

                        .breadcrumbs li > span.a:before {
                            content: "›";
                            color: var(--themeP);
                            transform: scale(3.5);
                            padding: 0 10px;
                            display: block;
                        }
                    `}
                </style>
            </Fragment>
        )
    );
}
