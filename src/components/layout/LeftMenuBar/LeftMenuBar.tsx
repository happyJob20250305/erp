import logoImage from "../../../assets/logo.png";
import logo_img from "../../../assets/logo_img.png";
import menu from "../../../assets/menu.png";
import { ILoginInfo, IMenuState } from "../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../stores/userInfo";
import { LeftMenuBarStyled, StyledLink } from "./styled";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import React from "react";

export const LeftMenuBar = React.memo(() => {
    console.log("LeftMenuBar 렌더링됨!");
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const navigate = useNavigate();

    const handlerClick = (menuId: string, e: React.MouseEvent<HTMLDivElement>) => {
        const childMenuId = document.getElementById(menuId);
        const childMenuClass = document.getElementsByClassName("child-menu-box");
        Array.from(childMenuClass).forEach((childMenu) => {
            childMenu.classList.remove("active");
        });

        if (e) {
            if (e.currentTarget.id === menuId) {
                childMenuId?.classList.toggle("active");
            } else {
                childMenuId?.classList.remove();
            }
        }
    };

    const handlerMenuLinkClick = (menuId: string, e: React.MouseEvent<HTMLDivElement>) => {
        const childLinkId = document.getElementById(menuId);
        const childLinkClass = document.getElementsByClassName("child-menu-link");
        Array.from(childLinkClass).forEach((childLink) => {
            childLink.classList.remove("active-link");
        });

        if (e.currentTarget.id === menuId) {
            childLinkId?.classList.toggle("active-link");
        } else {
            childLinkId?.classList.remove();
        }
    };

    const handlerLogout = () => {
        sessionStorage.setItem("userInfo", "");
        navigate("/");
    };

    return (
        <LeftMenuBarStyled>
            <a href='/react'>
                <img src={logo_img} alt='happyjob' />
            </a>
            <div className='logo-box'>
                <img src={logoImage} alt='logoImage' />
                <div className='user-info'>
                    <div>{userInfo.loginId}</div>
                    <button onClick={handlerLogout}>로그아웃</button>
                </div>
            </div>
            <ul>
                {userInfo?.usrMnuAtrt?.map((menuAttrt: IMenuState) => {
                    return (
                        <li key={menuAttrt.mnu_id} className='parent-menu'>
                            <img src={menu} alt='menu' />
                            {menuAttrt.mnu_nm}
                            <div
                                className='child-menu-box'
                                onClick={(e) => handlerClick(menuAttrt.mnu_id, e)}
                                id={menuAttrt.mnu_id}
                            >
                                {menuAttrt.nodeList.map((node) => {
                                    return (
                                        <StyledLink to={"/react" + node.mnu_url} key={node.mnu_id}>
                                            <div
                                                className='child-menu-link'
                                                id={node.mnu_id}
                                                onClick={(e) => handlerMenuLinkClick(node.mnu_id, e)}
                                            >
                                                {node.mnu_nm}
                                            </div>
                                        </StyledLink>
                                    );
                                })}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </LeftMenuBarStyled>
    );
});
