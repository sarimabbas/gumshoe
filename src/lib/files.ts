interface GetHandleToDirectoryOptions {
  mode?: FileSystemPermissionMode;
}

/**
 * Get a handle to a directory using the file system access API.
 * @returns {Promise<FileSystemDirectoryHandle | null>}
 */
export async function getHandleToDirectory(
  props: GetHandleToDirectoryOptions
): Promise<FileSystemDirectoryHandle | null> {
  const { mode = "read" } = props;
  const storageKey = "HANDLE_STORAGE_KEY";
  let handle: FileSystemDirectoryHandle | null = null;

  // Request a new directory handle
  try {
    handle = await window.showDirectoryPicker();
    console.log({ handle });
    localStorage.setItem(storageKey, JSON.stringify(handle));
  } catch (error) {
    console.error("Error selecting directory:", error);

    // Try to get the stored handle if directory picker fails
    const storedHandle = localStorage.getItem(storageKey);

    if (storedHandle) {
      try {
        // Parse the stored handle
        handle = await JSON.parse(storedHandle);
      } catch (error) {
        console.error("Error retrieving stored handle:", error);
      }
    }
  }

  // Verify if we have permission
  if (handle) {
    try {
      if (await verifyPermission({ handle, mode })) {
        return handle;
      }
    } catch (error) {
      console.error("Error verifying permission:", error);
    }
  }

  return null;
}

interface VerifyPermissionOptions {
  handle: FileSystemHandle;
  mode: FileSystemPermissionMode;
}

async function verifyPermission(
  props: VerifyPermissionOptions
): Promise<boolean> {
  const { handle, mode } = props;
  const options: FileSystemHandlePermissionDescriptor = {
    mode,
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
