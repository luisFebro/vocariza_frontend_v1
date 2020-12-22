import React from "react";
import Img from "components/Img";

export default function Etymology({ ety, currWord }) {
    return (
        <section className="container">
            <div className="max-w-500">
                <h3>Origin</h3>
                <ul>
                    <li>
                        <Img
                            src={`/img/icons/flags/us.svg`}
                            width={40}
                            height={20}
                            alt="flag"
                        />{" "}
                        {ety.en}
                    </li>
                    <br />
                    <li>
                        <Img
                            src={`/img/icons/flags/br.svg`}
                            width={40}
                            height={20}
                            alt="flag"
                        />{" "}
                        {ety.br}
                    </li>
                </ul>
                <a
                    className="no-text-decoration"
                    href={`https://www.lexico.com/en/definition/${currWord}`}
                    target="_blank"
                    rel="noopener"
                >
                    <em className="text-gray text-small">- lexico, oxford</em>
                </a>
            </div>
        </section>
    );
}
