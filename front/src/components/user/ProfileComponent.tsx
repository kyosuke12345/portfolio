import { List, ListItem, Typography, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { UserDetailResponse } from "api/response/userDetail.response";
import { connect } from "react-redux";
import { RootState } from "redux/rootReducer";

export type ProfileProps = {
  user?: UserDetailResponse;
};

const Profile: React.VFC<ProfileProps> = ({ user }) => {
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

const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
