import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import { useStoreState, useStoreDispatch } from "easy-peasy";
// import { logout } from "../../../redux/actions/authActions";
// import RadiusBtn from "../../../components/buttons/RadiusBtn";
// import isThisApp from "../../../utils/window/isThisApp";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useAuthUser } from "../../../hooks/useAuthUser";
// import useImg, { Img } from "../../../hooks/media/useImg";
// import useCount from '../../../hooks/useCount';

// const isApp = isThisApp();
// const isSmall = window.Helper.isSmallScreen();
export default function Navbar() {
    const router = useRouter();

    const path = router.pathname;
    const isHome = path === "/";

    const showLogo = () => {
        const handleLogoPath = () => {
            if (isHome) return "/img/logo/logo-name-header.svg";
            if (path.includes("/blog"))
                return "/img/logo/logo-name-header-blog.svg";
        };

        return (
            <Fragment>
                <Link href="/">
                    <a className="text-decoration-none">
                        <img
                            className="logo"
                            src={handleLogoPath()}
                            alt="logo da vocariza"
                        />
                    </a>
                </Link>
                <style jsx>
                    {`
                        .logo {
                            display: block;
                            self-align: center;
                            width: 200px;
                            height: 50px;
                            padding: 5px;
                            margin-bottom: 5px;
                        }

                        @media screen and (min-width: 768px) {
                            .logo {
                                display: block;
                                padding: 5px 20px;
                            }
                        }
                    `}
                </style>
            </Fragment>
        );
    };

    const showNav = () => (
        <Fragment>
            <nav className="nav-main push-right">
                <ul className="m-0 nav-menu no-list-style">
                    <li className="nav-menu-item">Acesso</li>
                    <li className="nav-menu-item">Blog</li>
                </ul>
            </nav>
            <style jsx>
                {`
                    .push-right {
                        margin-left: auto;
                    }

                    .nav-main {
                        display: none;
                    }

                    .nav-menu {
                        display: flex;
                        align-items: center;
                        flex-flow: wrap;
                        justify-content: flex-end;
                    }

                    .nav-menu-item {
                        padding: 15px;
                        font-size: 1.2em;
                        line-height: 0.01;
                        margin: 0 15px;
                    }

                    @media screen and (min-width: 1200px) {
                        .nav-menu-item {
                            margin: 0 35px;
                        }
                    }

                    @media screen and (min-width: 768px) {
                        .nav-main {
                            display: block;
                        }
                    }
                `}
            </style>
        </Fragment>
    );

    return (
        <Fragment>
            <header className="site-header">
                {showLogo()}
                {showNav()}
            </header>
            <style jsx>
                {`
                    .site-header {
                        display: flex;
                        justify-content: center;
                        margin: 0;
                        padding: 0;
                        background: var(--themePDark);
                        color: var(--themeS);
                    }

                    @media screen and (min-width: 768px) {
                        .nav-wrap .site-nav {
                            display: block;
                        }

                        .nav-wrap {
                            padding: 11px 0;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}
// const [isSearchOpen, setSearchOpen] = useState(false);
// const { role, _idStaff } = useStoreState((state) => ({
//     role: state.userReducer.cases.currentUser.role,
//     _idStaff: state.userReducer.cases.currentUser._id,
// }));

// const dispatch = useStoreDispatch();

// Render
// const isClientAdmin = location.search.includes("client-admin=1");

// const btnLogout = () => (
//     <button
//         className="font-weight-bold text-small text-shadow"
//         style={{
//             position: "absolute",
//             top: "65px",
//             right: "5px",
//             color: "white",
//             padding: "2px 5px",
//             borderRadius: "20px",
//             backgroundColor: "var(--themeSDark)",
//             outline: "none",
//         }}
//         onClick={() => logout(dispatch)}
//     >
//         sair
//     </button>
// );

// const showAccessBtn = () => (
//     <Fragment>
//         {!gotToken || !role ? (
//             <Link
//                 to="/acesso/verificacao"
//                 className={
//                     [
//                         "/cliente/pontos-fidelidade",
//                         "/acesso/verificacao",
//                     ].includes(locationNow)
//                         ? "disabled-link"
//                         : "nav-link"
//                 }
//             >
//                 {locationNow === "/" ? (
//                     <span
//                         className="text-subtitle text-s"
//                         style={{
//                             position: "relative",
//                             right: isSmall ? "-18px" : "",
//                         }}
//                     >
//                         Acesso{" "}
//                         <FontAwesomeIcon
//                             icon="lock"
//                             style={{ fontSize: "1.9rem" }}
//                         />
//                     </span>
//                 ) : null}
//             </Link>
//         ) : (
//             <div>
//                 {role === "admin" && (
//                     <Fragment>
//                         <Link
//                             to="/admin/painel-de-controle"
//                             className="text-cyan-light"
//                         >
//                             Admin{" "}
//                             <FontAwesomeIcon
//                                 icon="lock"
//                                 style={{ fontSize: "1.9rem" }}
//                             />
//                         </Link>
//                         {btnLogout()}
//                     </Fragment>
//                 )}

//                 {role === "cliente-admin" && ( // logout and actionbtns moved to DashboardClientAdmin.js
//                     <Fragment>
//                         <Link
//                             to={`/${bizCodeName}/cliente-admin/painel-de-controle`}
//                             style={{
//                                 display: !locationNow.includes(
//                                     "/cliente-admin/painel-de-controle"
//                                 )
//                                     ? "block"
//                                     : "none",
//                             }}
//                             className="text-cyan-light"
//                         >
//                             Cli-Admin{" "}
//                             <FontAwesomeIcon
//                                 icon="lock"
//                                 style={{ fontSize: "1.9rem" }}
//                             />
//                         </Link>
//                     </Fragment>
//                 )}

//                 {role === "cliente" && (
//                     <Fragment>
//                         <span className="text-cyan-light">Cliente</span>
//                         {btnLogout()}
//                     </Fragment>
//                 )}
//             </div>
//         )}
//     </Fragment>
// );

// const showCallToActionBtn = () =>
//     locationNow === "/" && (
//         <Link
//             to="/empresa-teste/novo-app/self-service/5ed0316700c6a10017f8c190?teste=1&nome-cliente=visitante&ponto-premio=500&ponto-atual=100"
//             className={
//                 [
//                     "/cliente/pontos-fidelidade",
//                     "/acesso/verificacao",
//                 ].includes(locationNow)
//                     ? "disabled-link"
//                     : "nav-link"
//             }
//         >
//             <RadiusBtn
//                 title={isSmall ? "Crie App" : "Crie seu App"}
//                 position="fixed"
//                 top={20}
//                 right={20}
//                 zIndex={1000}
//             />
//         </Link>
//     );

// const showButtons = () => (
//     <Fragment>
//         <ul
//             className="nav-item-position navbar-nav mr-3 align-items-center"
//             style={{
//                 display: [
//                     "/baixe-app/",
//                     "/regulamento",
//                     "/cliente/pontos-fidelidade",
//                     "/compartilhar-app",
//                 ].some((link) => locationNow.includes(link))
//                     ? "none"
//                     : "block",
//             }}
//         >
//             <li className="nav-item text-subtitle">
//                 <span>{showAccessBtn()}</span>
//             </li>
//         </ul>
//         {showCallToActionBtn()}
//     </Fragment>
// );

// const forceFiddelizeLogo = locationNow.indexOf('temporariamente-indisponivel-503') >= 0
// const needClientLogo =
//     (isApp && selfBizLogoImg) || (isAuthUser && selfBizLogoImg && isApp);
// const fiddelizeLogo = `/img/official-logo-name.png`;
// const handleLogoSrc = () => {
//     if (needClientLogo) {
//         return setUrl({ ...url, logoBiz: selfBizLogoImg });
//     } else {
//         return setUrl({ ...url, logoFid: `/img/official-logo-name.png` });
//     }
// };

// useEffect(() => {
//     handleLogoSrc();
// }, [needClientLogo]);

// const showAccessLinkMobile = () => (
//     <Link
//         to="/acesso/verificacao"
//         className={`access-link-mobile ${
//             ["/cliente/pontos-fidelidade", "/acesso/verificacao"].includes(
//                 locationNow
//             )
//                 ? "disabled-link"
//                 : "nav-link"
//         }`}
//     >
//         {locationNow === "/" ? (
//             <span className="text-normal text-s">
//                 Acesso{" "}
//                 <FontAwesomeIcon
//                     icon="lock"
//                     style={{ fontSize: "1.4rem" }}
//                 />
//             </span>
//         ) : null}
//     </Link>
// );

/* ARCHIVES
{locationNow.includes("/cliente-admin/painel-de-controle") && btnLogout()}

{isSmall ? "Admin" : "Usuário: Cliente-Admin"} <i className="fas fa-lock" style={{fontSize: '1.9rem'}}></i>

This is not wokring right... I cant seem to log out when clicked i the btn.
<div>
    <span className="text-subtitle text-s" style={{position: 'relative', right: isSmall ? '-18px' : '' }}>
        Cliente <i className="fas fa-lock" style={{fontSize: '1.9rem'}}></i>
    </span>
    {btnLogout()}
</div>

{role === "colaborador" &&
<Fragment>
    <Link to={`/colaborador/quadro-administrativo/${_idStaff}`}>
        Usuário: Colaborador <i className="fas fa-lock" style={{fontSize: '1.9rem'}}></i>
    </Link>
    {btnLogout()}
</Fragment>}
*/

/*ARCHIVES
const NavWrapper = styled.nav`
    & {
        min-height: 60px;
    }
    .store-container {
        position: relative;
    }

    .store-badge {
        font-size: 0.4em;
        position: absolute;
        top: 60%;
        left: 65%;
        transform: translate(-50%, -50%);
    }
    & .fixed {
        position: fixed;
        right: 1.2rem;
        top: 1.9rem;
    }

    .nav-link {
        text-transform: capitalize;
    }
`;

import KeyAccessDashboard from './KeyAccessDashboard';
const showKeyAccessDashboard = () => (
    <Link to="/painel-controle-admin">
        <KeyAccessDashboard />
    </Link>
);

import { storeIcon } from './dataIcons';
import { dataWorkingHour } from './working-hour/GetWorkingHour';
const isStoreOpen = dataWorkingHour[1];

const showLogo = () => {
        const isSquared =
            isApp && selfBizLogoImg && selfBizLogoImg.includes("h_100,w_100");
        // gotArrayThisItem(["/cliente-admin/painel-de-controle", ], locationNow)
        const handleSize = (side) => {
            let size;
            if (side === "width") {
                if (selfBizLogoImg) {
                    isSquared ? (size = 85) : (size = 150);
                } else {
                    size = 200;
                }
            } else {
                if (selfBizLogoImg) {
                    isSquared ? (size = 85) : (size = 67);
                } else {
                    size = 90;
                }
            }
            return size;
        };

        const handleLogoClick = () => {
            if (isClientAdmin && locationNow.includes("pontos-fidelidade"))
                return "/mobile-app?client-admin=1";
            return isApp ? "/mobile-app" : "/";
        };
        return (
            <Link to={handleLogoClick()}>
                <Img
                    className="animated zoomIn slow"
                    style={{
                        position: "absolute",
                        top: isAuthUser ? 0 : "12px",
                        left: isSmall ? "10px" : "20px",
                    }}
                    src={locationNow === "/" ? fiddelizeLogo : logoSrc}
                    alt="Logomarca Principal"
                    width={handleSize("width")}
                    height={handleSize("height")}
                />
            </Link>
        );
    };

*/
