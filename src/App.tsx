import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

function App() {
  return (
    <ResizablePanelGroup direction="horizontal">
      {/* sidebar */}
      <ResizablePanel
        className="h-screen p-4"
        minSize={20}
        defaultSize={20}
        maxSize={30}
      >
        One
      </ResizablePanel>
      <ResizableHandle withHandle />
      {/* browser */}
      <ResizablePanel className="p-4">
        <h1></h1>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default App;
