import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

const DropDownMenu = () => {
  return (
    <MenuRoot positioning={{ placement: "right-start" }}>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">New Text File</MenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuItem value="new-win">New Window</MenuItem>
        <MenuItem value="open-file">Open File...</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default DropDownMenu;
