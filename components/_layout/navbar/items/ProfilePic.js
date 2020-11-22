import { Fragment } from "react";

export default function ProfilePic({ Link }) {
    return (
        <Fragment>
            <div className="nav-pic-wrap container-center">
                <img
                    className="nav-pic"
                    src="/img/me.jpg"
                    alt="foto de perfil"
                />
            </div>
            <style jsx>
                {`
                    .nav-pic-wrap {
                        position: absolute;
                        right: 5px;
                        border: 2px solid var(--themeS);
                        border-radius: 50%;
                        background: transparent;
                        width: 37px;
                        height: 37px;
                        margin: 0 15px;
                    }
                    .nav-pic {
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                    }

                    @media screen and (min-width: 768px) {
                        .nav-pic-wrap {
                            position: relative;
                            width: 47px;
                            height: 47px;
                        }

                        .nav-pic {
                            width: 40px;
                            height: 40px;
                            margin: 0 35px;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}
