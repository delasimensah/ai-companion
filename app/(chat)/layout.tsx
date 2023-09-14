import { FC, ReactNode } from "react";

type ChatLayputProps = {
  children: ReactNode;
};

const ChatLayout: FC<ChatLayputProps> = ({ children }) => {
  return <div className="mx-auto h-full w-full max-w-4xl">{children}</div>;
};

export default ChatLayout;
