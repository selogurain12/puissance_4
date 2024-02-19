import { useEffect, useState, FormEvent } from 'react';
import moment from 'moment';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useWebSocket from '../useWebSocket';

const username = prompt("What is your username?");

interface Message {
  text: string;
}

export default function Chat() {
  const socket = useWebSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (socket){
      const handleMessage = (newMessage: Message) => {
        setMessages((messages) => [...messages, newMessage]);
      };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }
  }, [socket]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData: Message = { text: message };
      socket?.emit("message", (messageData));
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
        {messages.map(({ text }, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${username}: ${text}`} secondary={moment().format("h:mm:ss a")} />
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
