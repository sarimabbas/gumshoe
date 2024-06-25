import { ScrollArea } from "../ui/scroll-area";
import { Item } from "./item";

export const Content = () => {
  return (
    <ScrollArea>
      <div className="grid grid-cols-3 gap-4 p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <Item key={index} />
        ))}
      </div>
    </ScrollArea>
  );
};
