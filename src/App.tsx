import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { doIt } from "./lib/files";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ResizablePanelGroup direction="horizontal">
        {/* sidebar */}
        <ResizablePanel
          className="h-screen p-4"
          minSize={20}
          defaultSize={20}
          maxSize={30}
        >
          <ModeToggle />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* browser */}
        <ResizablePanel className="p-4">
          <Button onClick={doIt}>Do it</Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ThemeProvider>
  );
}

export default App;
