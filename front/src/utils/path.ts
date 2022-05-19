import { NavIconType } from "components/dashboard/navbar/NavItem";

type DashBoardPath = {
  href: string;
  title: string;
  iconType: NavIconType;
};

type DashBoardPaths = {
  about: DashBoardPath;
  login: DashBoardPath;
  userList: DashBoardPath;
  user: DashBoardPath;
};

type AdminDashBoardPaths = {
  cryptoCurrency: DashBoardPath;
  cryptoTimeline: DashBoardPath;
};

const dashboardPath: DashBoardPaths = {
  about: {
    href: "/",
    title: "about",
    iconType: "info",
  },
  userList: {
    href: "user-list",
    title: "ユーザ一覧",
    iconType: "list",
  },
  login: {
    href: "login",
    title: "ログイン",
    iconType: "login",
  },
  user: {
    href: "user-detail",
    title: "ユーザ情報",
    iconType: "account",
  },
};

const adminDashboardPath: AdminDashBoardPaths = {
  cryptoCurrency: {
    href: "crypto-currency",
    title: "仮想通貨マスタ",
    iconType: "cryptoCurrency",
  },
  cryptoTimeline: {
    href: "crypto-currencisAdminDisp",
    title: "仮想通貨タイムライン",
    iconType: "cryptoTimeline",
  },
};

export default {
  dashboardPath: dashboardPath,
  adminDashboardPath: adminDashboardPath,
};
