
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default async function Header() {

  return (
    <header className="flex items-center justify-between bg-gray-50 w-full h-20 px-6 py-3 shadow-md">
      <div></div>

      <Avatar>
        {/* <AvatarImage
          className="overflow-hidden"
          src={"https://github.com/shadcn.png"}
        /> */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
