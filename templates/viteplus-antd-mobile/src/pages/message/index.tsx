import { useLoaderData } from 'react-router';
import { LikeButton } from '../../components/like-button';

interface MessageItem {
  id: number;
  from: string;
  text: string;
  timestamp: Date;
}

interface MessageLoaderData {
  messages: MessageItem[];
}

function Message() {
  const { messages } = useLoaderData() as MessageLoaderData;

  return (
    <div>
      <h1>消息</h1>

      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>From: {message.from}</div>
            <div>{message.text}</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              {new Date(message.timestamp).toLocaleString()}
            </div>
            <LikeButton
              itemId={`message-${message.id}`}
              initialLikes={Math.floor(Math.random() * 10)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Message;
