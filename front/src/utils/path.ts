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
  tetris: DashBoardPath;
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
  tetris: {
    href: "tetris",
    title: "テトリス",
    iconType: "game",
  },
};

export default { dashboardPath: dashboardPath };
