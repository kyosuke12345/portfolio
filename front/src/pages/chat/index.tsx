import {
  Alert,
  AlertTitle,
  Link,
  Box,
  ListItem,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  TextField,
  InputAdornment,
  Paper,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import path from "utils/path";
import io from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { useDidMount } from "rooks";
import { environment } from "utils/enviroment";
import SendIcon from "@mui/icons-material/Send";

const socket =
  environment.mode === "production"
    ? io()
    : io("http://localhost:3100", { transports: ["websocket"] });

type ChatContent = {
  email: string;
  time: string;
  message: string;
};

const ChatScreen: React.VFC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatList, setChatList] = useState<ChatContent[]>([]);
  const [txt, setTxt] = useState("");

  useDidMount(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("exception", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("exception");
    };
  });

  useEffect(() => {
    socket.on("message", function (data: ChatContent) {
      setChatList([data, ...chatList]);
    });
    return () => {
      socket.off("message");
    };
  }, [chatList]);

  const onSubmit = useCallback(
    (txt: string) => {
      const email = user!.email;
      const message = txt;
      const time = new Date().toLocaleString();
      socket.emit("message", { email, message, time });
      setTxt("");
    },
    [isConnected, setTxt]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTxt(e.target.value);
    },
    [setTxt]
  );

  if (!isAuth) {
    return (
      <Alert severity="warning">
        <AlertTitle>ログインしてください</AlertTitle>
        <Link href={path.dashboardPath.login.href}>ログイン画面</Link>
        にてログインした場合に、chat画面が閲覧できます。
      </Alert>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: `calc(93vh - 64px - 16px)`,
        }}
      >
        <Alert severity="info">
          <AlertTitle>チャット</AlertTitle>
          WebSocketによるchat機能を作成
        </Alert>
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            marginTop: "4px",
            padding: "8px",
            border: "1px solid rgba(209, 213, 219, 0.3)",
          }}
        >
          <List>
            {chatList.map((chat, index) => (
              <ListItem
                key={index}
                sx={{
                  flexDirection:
                    user!.email === chat.email ? "row-reverse" : "row",
                  backgroundColor: "whitesmoke",
                  borderRadius: "12px",
                  marginBottom: "4px",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Profile Picture"
                    src={`https://avatars.dicebear.com/api/human/${chat.email}.svg`}
                  />
                </ListItemAvatar>
                <ListItemText primary={chat.message} secondary={chat.time} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            marginTop: "4px",
          }}
        >
          <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      alt="Profile Picture"
                      src={`https://avatars.dicebear.com/api/human/${
                        user!.email
                      }.svg`}
                      sx={{ padding: "10px" }}
                    />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              value={txt}
              onChange={onChange}
              sx={{
                width: "100%",
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter" && txt !== "") {
                  onSubmit(txt);
                }
              }}
            />
            <IconButton
              disabled={txt === ""}
              onClick={() => {
                onSubmit(txt);
              }}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    );
  }
};

export default ChatScreen;
