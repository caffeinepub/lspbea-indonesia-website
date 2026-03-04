import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import type { FileMetadata } from "../backend";
import { useActor } from "./useActor";

export function useUploadFile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: { file: File; onProgress?: (percentage: number) => void }) => {
      if (!actor) throw new Error("Actor not initialized");

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      let blob = ExternalBlob.fromBytes(bytes);

      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }

      await actor.uploadFile(blob, file.name, BigInt(file.size));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
}

export function useGetFiles() {
  const { actor, isFetching } = useActor();

  return useQuery<FileMetadata[]>({
    queryKey: ["files"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFiles();
    },
    enabled: !!actor && !isFetching,
  });
}
