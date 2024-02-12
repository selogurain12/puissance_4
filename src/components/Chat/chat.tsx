import { useEffect, useState, FormEvent } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"]
});

const username = prompt("What is your username?");

interface Message {
  user: { name: string; id: string };
  date: string;
  text: string;
}

export default function App() {
  const [users, setUsers] = useState<{ name: string; id: string }[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username);
    });

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("message", message => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("connected", user => {
      setUsers((users) => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers((users) => users.filter((user) => user.id !== id));
    });

    return () => {
      socket.off("connect");
      socket.off("users");
      socket.off("message");
      socket.off("connected");
      socket.off("disconnected");
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send", message);
      setMessage("");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography component="h3" gutterBottom>
        Chat Room - Hello {username}
      </Typography>
      <Paper style={{ height: 300, overflow: 'auto' }}>
        <List>
          {messages.map(({ user, date, text }, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${user.name}: ${text}`} secondary={moment(date).format("h:mm:ss a")} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 1,
        }}
        onSubmit={sendMessage}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" color="primary" sx={{ p: '10px', ml: 1 }}>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
}
