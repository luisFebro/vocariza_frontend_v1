import Link from "next/link";
import urlizer from "utils/string/urlizer";
// reference: https://codepen.io/Manolavelle/pen/XeWwJz

const categories = [
    {
        category: "Ditados Populares",
        img: "/img/cat/saying.jpg",
        totalSubs: 5,
    },
    {
        category: "Verbos Frasais",
        img: "/img/cat/pv.jpg",
        totalSubs: 10,
    },
    {
        category: "Gírias",
        img: "/img/cat/slang.jpg",
        totalSubs: 15,
    },
];

export default function CategoryGallery() {
    return (
        <section className="root_cat-gallery">
            {categories.map((e) => (
                <figure className="snip hover">
                    <div className="image">
                        <Link href={`/c/${urlizer(e.category)}`}>
                            <img src={e.img} alt={e.category} />
                        </Link>
                    </div>
                    <figcaption className="text-white">
                        <h3>{e.category}</h3>
                        <p>{e.totalSubs} assuntos</p>
                    </figcaption>
                </figure>
            ))}
            <style jsx>
                {`
                    .root_cat-gallery {
                        margin-bottom: 600px;
                    }

                    .root_cat-gallery .snip {
                        cursor: pointer;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
                        //float: left;
                        //max-width: 310px;
                        //min-width: 250px;
                        max-height: 300px;
                        font-size: 25px;
                        margin: 10px 1%;
                        overflow: hidden;
                        position: relative;
                        text-align: left;
                        width: 100%;
                    }

                    .root_cat-gallery .snip * {
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        -webkit-transition: all 0.25s ease;
                        transition: all 0.25s ease;
                    }

                    .root_cat-gallery .snip img {
                        width: 100%;
                        vertical-align: top;
                        position: relative;
                    }

                    .root_cat-gallery .snip figcaption {
                        padding: 20px;
                        position: absolute;
                        bottom: 0;
                        z-index: 1;
                        background: transparent;
                    }

                    .root_cat-gallery .snip figcaption:before {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        content: "";
                        border-radius: 15px;
                        background: -moz-linear-gradient(
                            90deg,
                            #700877 0%,
                            var(--themeP) 100%,
                            var(--themeP) 100%
                        );
                        background: -webkit-linear-gradient(
                            90deg,
                            #700877 0%,
                            var(--themeP) 100%,
                            var(--themeP) 100%
                        );
                        background: linear-gradient(
                            90deg,
                            #700877 0%,
                            var(--themeP) 100%,
                            var(--themeP) 100%
                        );
                        opacity: 0.6;
                        z-index: -1;
                    }

                    .snip h3,
                    .snip p {
                        margin: 0;
                        padding: 0;
                    }

                    .snip h3 {
                        font-size: 1.5em;
                        color: white;
                        display: inline-block;
                        font-weight: 700;
                        letter-spacing: -0.4px;
                        margin-bottom: 5px;
                        min-height: 100px;
                    }

                    .snip p {
                        color: white;
                        font-size: 1em;
                        line-height: 1.6em;
                        margin-bottom: 0px;
                    }

                    .root_cat-gallery .snip:hover .image,
                    .root_cat-gallery .snip.hover div img {
                        -webkit-transform: scale(1.1);
                        transform: scale(1.1);
                    }

                    @media only screen and (min-width: 768px) {
                        .root_cat-gallery .snip {
                            float: left;
                            max-width: 310px;
                            min-width: 250px;
                        }

                        .root_cat-gallery .snip img {
                            max-width: 100%;
                        }
                    }
                `}
            </style>
        </section>
    );
}
