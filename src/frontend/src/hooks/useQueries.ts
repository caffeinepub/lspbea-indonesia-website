import { useMutation } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

export interface FileMetadata {
  name: string;
  size: bigint;
  uploadTime: bigint;
  blob: ExternalBlob;
}

// Legacy stubs — kept for compile compatibility
export function useUploadFile() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: { file: File; onProgress?: (percentage: number) => void }) => {
      if (!actor) throw new Error("Actor not initialized");
      const bytes = new Uint8Array(await file.arrayBuffer());
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) blob = blob.withUploadProgress(onProgress);
      return blob;
    },
  });
}

export function useGetFiles() {
  return { data: [] as FileMetadata[], isLoading: false };
}
