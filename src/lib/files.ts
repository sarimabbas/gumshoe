const HANDLE_STORAGE_PREFIX = "directory-handle-";

export const doIt = async () => {
  try {
    const handle = await window.showDirectoryPicker();
    await verifyPermission(handle, true); // Ensure we have read/write permission
    return handle;
  } catch (error) {
    console.error("Error selecting directory:", error);
    return null;
  }
};

async function getHandleToDirectory(
  dir: string
): Promise<FileSystemDirectoryHandle | null> {
  const storageKey = HANDLE_STORAGE_PREFIX + dir;

  // Try to get the stored handle
  const storedHandle = localStorage.getItem(storageKey);

  if (storedHandle) {
    try {
      // Parse the stored handle
      const handle = await JSON.parse(storedHandle);

      // Verify if we still have permission
      if (await verifyPermission(handle, true)) {
        return handle;
      }
    } catch (error) {
      console.error("Error retrieving stored handle:", error);
    }
  }

  // If no stored handle or permission denied, request a new one
  try {
    const handle = await window.showDirectoryPicker();
    await verifyPermission(handle, true); // Ensure we have read/write permission
    localStorage.setItem(storageKey, JSON.stringify(handle));
    return handle;
  } catch (error) {
    console.error("Error selecting directory:", error);
    return null;
  }
}

async function verifyPermission(
  handle: FileSystemHandle,
  readWrite: boolean
): Promise<boolean> {
  const options: FileSystemHandlePermissionDescriptor = {
    mode: readWrite ? "readwrite" : "read",
  };

  // Check if we already have permission, if not, request it
  if ((await handle.queryPermission(options)) === "granted") {
    return true;
  }

  return (await handle.requestPermission(options)) === "granted";
}

async function hashFiles(dir: string) {
  const dirHandle = await getHandleToDirectory(dir);
  if (!dirHandle) {
    console.error("Failed to get directory handle");
    return;
  }

  for await (const entry of dirHandle.values()) {
    if (entry.kind === "file") {
      const file = await entry.getFile();
      const hash = await calculateHash(file);
      console.log(`${file.name}: ${hash}`);
    }
  }
}

async function calculateHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
