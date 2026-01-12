"use client";

import { useState } from "react";
import { Download, FileText, FileType, Check, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";

type DownloadFormat = "pdf" | "word";
type DownloadStatus = "idle" | "downloading" | "success" | "error";

interface DownloadButtonProps {
  variant?: "default" | "compact" | "mobile";
  className?: string;
}

export default function DownloadButton({ variant = "default", className = "" }: DownloadButtonProps) {
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [downloadedFormat, setDownloadedFormat] = useState<DownloadFormat | null>(null);

  const handleDownload = async (format: DownloadFormat) => {
    setStatus("downloading");
    setProgress(0);
    setDownloadedFormat(format);

    const formatLabel = format === "pdf" ? "PDF" : "Word";
    toast.loading(`Downloading ${formatLabel} resume...`, { id: "download" });

    try {
      const endpoint = format === "pdf" ? "/api/download/pdf" : "/api/download/word";
      const filename = format === "pdf" ? "Eric_Gitangu_Resume.pdf" : "Eric_Gitangu_Resume.docx";
      const mimeType = format === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      setProgress(5);

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      setProgress(15);

      const contentLength = response.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to read response");
      }

      const chunks: ArrayBuffer[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength));
        received += value.length;

        if (total > 0) {
          setProgress(15 + Math.round((received / total) * 75));
        } else {
          setProgress(Math.min(90, 15 + chunks.length * 15));
        }
      }

      setProgress(95);

      const blob = new Blob(chunks, { type: mimeType });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setProgress(100);
      setStatus("success");

      toast.success(`${formatLabel} resume downloaded!`, {
        id: "download",
        description: `Check your Downloads folder for ${filename}`,
      });

      setTimeout(() => {
        setStatus("idle");
        setProgress(0);
        setDownloadedFormat(null);
      }, 2500);

    } catch (error) {
      console.error("Download error:", error);
      setStatus("error");

      toast.error(`Failed to download ${formatLabel} resume`, {
        id: "download",
        description: "Please try again or contact Eric directly.",
      });

      setTimeout(() => {
        setStatus("idle");
        setProgress(0);
        setDownloadedFormat(null);
      }, 3000);
    }
  };

  const getStatusColor = () => {
    if (status === "success") return "bg-green-500";
    if (status === "error") return "bg-red-500";
    return "bg-primary";
  };

  const getButtonContent = () => {
    if (status === "downloading") {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden lg:inline">{progress}%</span>
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <Check className="w-4 h-4" />
          <span className="hidden lg:inline">
            {downloadedFormat === "pdf" ? "PDF" : "Word"} Done!
          </span>
        </>
      );
    }

    if (status === "error") {
      return (
        <>
          <Download className="w-4 h-4" />
          <span className="hidden lg:inline">Failed</span>
        </>
      );
    }

    return (
      <>
        <Download className="w-4 h-4" />
        {variant !== "compact" && <span className="hidden lg:inline">Resume</span>}
        <ChevronDown className="w-3 h-3 ml-1" />
      </>
    );
  };

  const getMobileButtonContent = () => {
    if (status === "downloading") {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Downloading {downloadedFormat?.toUpperCase()}...</span>
          <span className="ml-auto font-mono">{progress}%</span>
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <Check className="w-4 h-4" />
          <span>{downloadedFormat === "pdf" ? "PDF" : "Word"} Downloaded!</span>
        </>
      );
    }

    if (status === "error") {
      return (
        <>
          <Download className="w-4 h-4" />
          <span>Download Failed - Tap to Retry</span>
        </>
      );
    }

    return (
      <>
        <Download className="w-4 h-4" />
        <span>Download Resume</span>
        <ChevronDown className="w-3 h-3 ml-auto" />
      </>
    );
  };

  // Progress bar fill style
  const progressStyle = {
    width: `${progress}%`,
    transition: "width 0.3s ease-out",
  };

  if (variant === "mobile") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={status === "downloading"}>
          <Button
            className={`w-full gap-2 relative overflow-hidden ${className}`}
            variant={status === "error" ? "destructive" : "default"}
          >
            {/* Progress fill background */}
            {status === "downloading" && (
              <div
                className={`absolute inset-0 ${getStatusColor()} opacity-30`}
                style={progressStyle}
              />
            )}
            {status === "success" && (
              <div className="absolute inset-0 bg-green-500 opacity-20" />
            )}
            <div className="relative z-10 flex items-center gap-2 w-full">
              {getMobileButtonContent()}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuItem
            onClick={() => handleDownload("pdf")}
            className="cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2 text-red-500" />
            <div className="flex flex-col">
              <span className="font-medium">Download PDF</span>
              <span className="text-xs text-muted-foreground">Best for printing & sharing</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDownload("word")}
            className="cursor-pointer"
          >
            <FileType className="w-4 h-4 mr-2 text-blue-500" />
            <div className="flex flex-col">
              <span className="font-medium">Download Word</span>
              <span className="text-xs text-muted-foreground">Editable .docx format</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={status === "downloading"}>
        <Button
          size="sm"
          className={`ml-1 gap-1 relative overflow-hidden ${className}`}
          variant={status === "error" ? "destructive" : "default"}
        >
          {/* Progress fill background */}
          {status === "downloading" && (
            <div
              className={`absolute inset-0 ${getStatusColor()} opacity-40`}
              style={progressStyle}
            />
          )}
          {status === "success" && (
            <div className="absolute inset-0 bg-green-500 opacity-30 animate-pulse" />
          )}
          <div className="relative z-10 flex items-center gap-1">
            {getButtonContent()}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleDownload("pdf")}
          className="cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2 text-red-500" />
          <div className="flex flex-col">
            <span className="font-medium">PDF Format</span>
            <span className="text-xs text-muted-foreground">Best for sharing</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload("word")}
          className="cursor-pointer"
        >
          <FileType className="w-4 h-4 mr-2 text-blue-500" />
          <div className="flex flex-col">
            <span className="font-medium">Word Format</span>
            <span className="text-xs text-muted-foreground">Editable .docx</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
