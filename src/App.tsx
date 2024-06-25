import Main from "./components/main";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen max-h-screen"
      >
        {/* sidebar */}
        <ResizablePanel
          className="p-4"
          minSize={20}
          defaultSize={20}
          maxSize={30}
        >
          <ModeToggle />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* browser */}
        <ResizablePanel>
          <Main />
        </ResizablePanel>
      </ResizablePanelGroup>
    </ThemeProvider>
  );
}

export default App;
