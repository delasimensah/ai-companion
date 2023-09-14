import { FC } from "react";

import axios from "axios";
import { Companion, Message } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BotAvatar from "@/components/bot-avatar";
import { useToast } from "@/components/ui/use-toast";

type ChatHeaderProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

const ChatHeader: FC<ChatHeaderProps> = ({ companion }) => {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/companion/${companion.id}`);

      toast({
        description: "success",
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-primary/10 pb-4">
      <div className="flex items-center gap-x-2">
        <Button onClick={() => router.back()} variant="ghost" size="icon">
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <BotAvatar src={companion.src} />

        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>

            <div className="flex items-center text-xs text-muted-foreground ">
              <MessagesSquare className="mr-1 h-3 w-3" />
              {companion._count.messages}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Created by {companion.userName}
          </p>
        </div>
      </div>

      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
