import { List, ListItem, Typography, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { UserDetailResponse } from "api/response/userDetail.response";

export type UserProfilePanelProps = {
  user?: UserDetailResponse;
};

const UserProfilePanel: React.VFC<UserProfilePanelProps> = ({ user }) => {
  return (
    <Box>
      <Typography>{`email: ${user?.email}`}</Typography>
      <Typography>{`plainPassword: ${user?.plainPassword}`}</Typography>
      <Typography>{`password: ${user?.password}`}</Typography>
      <List>
        {user?.hobbies &&
          user.hobbies.map((hobby, index) => (
            <ListItem key={index}>
              <ListItemText>{hobby.name}</ListItemText>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default UserProfilePanel;
