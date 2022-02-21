import { NavIconType } from "components/dashboard/NavItem";

type DashBoardPath = {
  href: string;
  title: string;
  iconType: NavIconType;
};

type DashBoardPaths = {
  login: DashBoardPath;
  userList: DashBoardPath;
  user: DashBoardPath;
  userAdd: DashBoardPath;
};

const dashboardPath: DashBoardPaths = {
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
    href: "user",
    title: "ユーザ情報",
    iconType: "user",
  },
  userAdd: {
    href: "user-add",
    title: "ユーザ追加",
    iconType: "userAdd",
  },
};

export default { dashboardPath: dashboardPath };
