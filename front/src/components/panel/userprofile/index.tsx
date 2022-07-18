import {
  List,
  ListItem,
  Typography,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { UserDetailResponse } from "api/response/userDetail.response";

export type UserProfilePanelProps = {
  user?: UserDetailResponse;
};

const TitleTypography: React.VFC<{ title: string }> = ({ title }) => {
  return (
    <Typography variant="h6" sx={{ textDecoration: "underline" }}>
      {title}
    </Typography>
  );
};

const UserProfilePanel: React.VFC<UserProfilePanelProps> = ({ user }) => {
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
          src={`https://avatars.dicebear.com/api/human/${user!.email}.svg`}
          sx={{
            width: 256,
            height: 256,
            fontSize: 96,
            mb: 1,
          }}
        ></Avatar>
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
