import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";
import Logo100percentage from "../../assets/images/logo100percentage.png";
import "./ChatBox.css";

// This API Key should be change
const API_KEY = "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";

const systemMessage = {
  role: "system",
  content:
    "Welcome! I am your virtual Chef. Feel free to ask for food recipes, cooking tips, or anything related to the culinary world. Let's cook up some delicious dishes together!",
};

type MessageDirection = "incoming" | "outgoing" | 0 | 1;

interface MessageProps {
  message?: string;
  sender?: string;
  direction: MessageDirection;
  position: "single" | "first" | "normal" | "last" | 0 | 1 | 2 | 3;
}

const Main: React.FC = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      message:
        "Welcome to Grand Cafe's Food Recipe Chatbot! 🍽️ I'm here to help you discover delightful recipes for a fantastic dining experience. Ask away! 🍔🍰🍝",
      sender: "ChatGPT",
      direction: "incoming",
      position: "last",
    },
  ]);

  const handleSend = async (message: string) => {
    const newMessage: MessageProps = {
      message: message,
      sender: "user",
      direction: "outgoing",
      position: "last",
    };

    const newMessages: MessageProps[] = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: MessageProps[]) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
            position: "normal",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <>
      <div className="h-screen py-10">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator
                    content="Preparing a delicious recipe"
                    className="ml-3"
                  />
                ) : null
              }
            >
              {messages.map((message, i) => (
                <Message
                  key={i}
                  model={message}
                  avatarPosition={message.sender === "user" ? "tr" : "tl"}
                  className="bg-transparent"
                >
                  <Avatar
                    src={
                      message.sender === "user"
                        ? "https://chatscope.io/storybook/react/static/media/joe.641da105.svg"
                        : Logo100percentage
                    }
                    name="Joe"
                    size="sm"
                  />
                </Message>
              ))}
            </MessageList>
            <MessageInput
              attachButton={false}
              placeholder="Type message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};

export default Main;