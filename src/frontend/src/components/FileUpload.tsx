import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Archive,
  File,
  FileText,
  Image as ImageIcon,
  Music,
  Upload,
  Video,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useGetFiles, useUploadFile } from "../hooks/useQueries";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadFile();
  const { data: files = [], isLoading } = useGetFiles();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Silakan pilih file terlebih dahulu");
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        file: selectedFile,
        onProgress: (percentage) => {
          setUploadProgress(percentage);
        },
      });

      toast.success("Sertifikat berhasil diunggah!");
      setSelectedFile(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Gagal mengunggah sertifikat");
      console.error("Upload error:", error);
    }
  };

  const formatFileSize = (bytes: bigint) => {
    const size = Number(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />;
    }
    if (["mp4", "avi", "mov", "wmv", "webm"].includes(ext || "")) {
      return <Video className="h-5 w-5 text-purple-500" />;
    }
    if (["mp3", "wav", "ogg", "flac"].includes(ext || "")) {
      return <Music className="h-5 w-5 text-green-500" />;
    }
    if (["zip", "rar", "7z", "tar", "gz"].includes(ext || "")) {
      return <Archive className="h-5 w-5 text-orange-500" />;
    }
    if (
      ["pdf", "doc", "docx", "txt", "xls", "xlsx", "ppt", "pptx"].includes(
        ext || "",
      )
    ) {
      return <FileText className="h-5 w-5 text-red-500" />;
    }
    return <File className="h-5 w-5 text-gray-500" />;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Unggah <span className="text-primary">Sertifikat Anda</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unggah sertifikat Anda dengan aman. Kami mendukung berbagai format
            file termasuk PDF, gambar, dan dokumen lainnya
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Unggah Sertifikat Baru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Pilih Sertifikat</Label>
                <Input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  onChange={handleFileSelect}
                  disabled={uploadMutation.isPending}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    File terpilih: {selectedFile.name} (
                    {(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

              {uploadMutation.isPending && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mengunggah...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadMutation.isPending}
                className="w-full"
                size="lg"
              >
                {uploadMutation.isPending
                  ? "Mengunggah..."
                  : "Unggah Sertifikat Anda"}
              </Button>
            </CardContent>
          </Card>

          {/* Files List Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Daftar Sertifikat yang Diunggah
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Memuat daftar sertifikat...
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada sertifikat yang diunggah
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getFileIcon(file.name)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} •{" "}
                            {formatDate(file.uploadTime)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={file.blob.getDirectURL()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Lihat
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
