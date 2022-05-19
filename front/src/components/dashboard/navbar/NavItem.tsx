import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { matchPath, useLocation } from "react-router";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LoginIcon from "@mui/icons-material/Login";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ReactNode } from "react";

export type NavIconType =
  | "login"
  | "list"
  | "account"
  | "user"
  | "info"
  | "cryptoCurrency"
  | "cryptoTimeline";

export interface NavItemProps {
  /** url */
  url: string;
  /** リンク */
  href: string;
  /** タイトル */
  title: string;
  /** icon */
  iconType: NavIconType;
  /** クリック時の挙動 */
  onClickNav: () => void;
}

function renderNavIcon(iconType: NavIconType): ReactNode {
  switch (iconType) {
    case "login":
      return <LoginIcon />;
    case "account":
      return <AccountCircleIcon />;
    case "list":
      return <SupervisedUserCircleIcon />;
    case "info":
      return <InfoIcon />;
    case "cryptoCurrency":
      return <AttachMoneyIcon />;
    case "cryptoTimeline":
      return <TimelineIcon />;
    default:
      return <SettingsApplicationsIcon />;
  }
}

/**
 * SideBarのアイテム
 * @param param0
 * @returns
 */
const NavItem: React.VFC<NavItemProps> = ({
  url,
  href,
  title,
  iconType,
  onClickNav,
}) => {
  const location = useLocation();
  const theme = useTheme();

  const active = url
    ? !!matchPath(
        {
          path: url,
          end: true,
        },
        location.pathname
      )
    : false;

  return (
    <Link
      to={href}
      style={{ textDecoration: "none", color: theme.palette.text.primary }}
      onClick={() => onClickNav()}
    >
      <ListItem selected={active}>
        <ListItemButton>
          <ListItemIcon>{renderNavIcon(iconType)}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default NavItem;
