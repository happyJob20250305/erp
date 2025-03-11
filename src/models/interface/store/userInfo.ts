export interface ILoginInfo {
    loginId?: string;
    userNm?: string;
    empId?: number;
    usrMnuAtrt?: IMenuState[];
    userType?: string;
    serverName?: string;
    result?: string;
}

export interface ISubmenuState {
    mnu_id: string;
    hir_mnu_id: string;
    mnu_nm: string;
    mnu_url: string;
    mnu_dvs_cod: string;
    grp_num: string;
    odr: string;
    lvl: string;
}

export interface IMenuState {
    mnu_id: string;
    hir_mnu_id: string;
    mnu_nm: string;
    mnu_url: string;
    mnu_dvs_cod: string;
    grp_num: string;
    odr: string;
    lvl: string;
    mnu_ico_cod: string;
    nodeList: ISubmenuState[];
}
