import {
  List,
  ListItem,
  Typography,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { deepOrange, deepPurple, blue, red } from "@mui/material/colors";
import { UserDetailResponse } from "api/response/userDetail.response";
import { useState } from "react";

export type UserProfilePanelProps = {
  user?: UserDetailResponse;
};

const BG_COLORS = [deepOrange[500], deepPurple[500], blue[500], red[500]];

const TitleTypography: React.VFC<{ title: string }> = ({ title }) => {
  return (
    <Typography variant="h6" sx={{ textDecoration: "underline" }}>
      {title}
    </Typography>
  );
};

const UserProfilePanel: React.VFC<UserProfilePanelProps> = ({ user }) => {
  const [avatarColor] = useState(
    BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]
  );
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          {"ユーザ情報"}
        </Typography>
        <Avatar
          sx={{
            bgcolor: avatarColor,
            width: 256,
            height: 256,
            fontSize: 96,
            mb: 1,
          }}
        >
          T
        </Avatar>
        <TitleTypography title="email" />
        <Typography variant="subtitle1" gutterBottom>
          {user?.email}
        </Typography>
        <TitleTypography title="plainPassword" />
        <Typography variant="subtitle1" gutterBottom>
          {user?.plainPassword}
        </Typography>
        <TitleTypography title="password" />
        <Typography variant="subtitle1" gutterBottom>
          {user?.password}
        </Typography>

        <Box sx={{ mt: 3 }}></Box>

        <TitleTypography title="趣味" />
        <List>
          {user?.hobbies &&
            user.hobbies.map((hobby, index) => (
              <ListItem key={index}>
                <ListItemText>{hobby.name}</ListItemText>
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  );
};

export default UserProfilePanel;
