import { Fragment } from "react";

export default function Img({
    src,
    alt,
    title,
    height,
    width,
    className,
    dataSrc,
    id,
    style,
}) {
    return (
        <Fragment>
            <img
                src={src}
                alt={alt}
                height={height || "auto"}
                width={width}
                id={id}
                style={style}
                data-src={dataSrc}
                className={`${className} featured-img`}
                title={title}
                onLoad={null}
                onError={null}
            />
            <style jsx>
                {`
                    .featured-img {
                        height: 300px;
                        object-fit: fill;
                    }
                    @media only screen and (min-width: 650px) {
                        .featured-img {
                            height: 400px;
                        }
                    }
                    @media only screen and (min-width: 900px) {
                        .featured-img {
                            height: 500px;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}
