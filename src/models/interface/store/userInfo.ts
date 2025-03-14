export interface ILoginInfo {
    loginId?: string;
    empId?: string | number;
    userNm?: string;
    usrMnuAtrt?: IMenuState[];
    userType?: string;
    serverName?: string;
    result?: string;
    detail_name?: string;
    usr_nm?: string;
    usr_idx?: number;
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
