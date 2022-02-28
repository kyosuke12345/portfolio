import { NavIconType } from "components/dashboard/NavItem";

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

const dashboardPath: DashBoardPaths = {
  about: {
    href: "portfolio",
    title: "プロフィール",
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

export default { dashboardPath: dashboardPath };
