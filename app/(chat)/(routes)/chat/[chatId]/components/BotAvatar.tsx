import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface BotAvatarProps {
  src: string;
}

const BotAvatar = ({ src }: BotAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
