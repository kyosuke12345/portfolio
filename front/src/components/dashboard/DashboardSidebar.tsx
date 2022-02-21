import { Drawer, List, ModalProps } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import path from "utils/path";
import { SIDE_MENU_WIDTH } from "./DashboardLayout";
import NavItem, { NavItemProps } from "./NavItem";

export type DashBoardSideBarProps = {
  isMobile: boolean;
  onCloseNav: ModalProps["onClose"];
  openNav: boolean;
  onClickNav: NavItemProps["onClickNav"];
};

/**
 * Dashboardのサイドバー
 * @param param0
 * @returns
 */
const DashboardSidebar: React.VFC<DashBoardSideBarProps> = ({
  isMobile,
  onCloseNav,
  onClickNav,
  openNav,
}) => {
  const SideBarContent = useMemo(
    () => (
      <Box>
        <List>
          {Object.values(path.dashboardPath).map((v, index) => (
            <NavItem
              key={index}
              href={v.href}
              title={v.title}
              url={v.href}
              iconType={v.iconType}
              onClickNav={onClickNav}
            />
          ))}
        </List>
      </Box>
    ),
    [onClickNav]
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          onClose={onCloseNav}
          open={openNav}
          variant="temporary"
          PaperProps={{
            sx: {
              width: SIDE_MENU_WIDTH,
            },
          }}
        >
          {SideBarContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: SIDE_MENU_WIDTH,
              // top: 64,
              // height: "calc(100% - 64px)",
            },
          }}
        >
          {SideBarContent}
        </Drawer>
      )}
    </>
  );
};

export default DashboardSidebar;
