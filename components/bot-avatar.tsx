import { FC } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

type BotAvatarProps = {
  src: string;
};

const BotAvatar: FC<BotAvatarProps> = ({ src }) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
