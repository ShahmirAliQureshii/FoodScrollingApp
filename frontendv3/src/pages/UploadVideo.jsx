import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Upload,
  X,
  FileVideo,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Plus,
  Type,
  AlignLeft,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError("");
    } else {
      setError("Please select a valid video file.");
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setError("");
    } else {
      setError("Please select a valid video file.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !name) {
      setError("Name and Video are required.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setProgress(percentCompleted);
          },
        },
      );

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again.",
      );
      setUploading(false);
    }
  };

  if (success) {
    return (
      <div className="h-full w-full bg-black flex items-center justify-center p-6">
        <div className="text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-neon-cyan" size={48} />
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2">
            UPLOAD COMPLETE
          </h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em]">
            Propagating to Global Feed...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black flex items-start justify-center p-4 md:p-10 relative overflow-y-auto no-scrollbar pt-20 md:pt-32">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-cyan/5 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-neon-pink/5 blur-[180px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
        {/* Left Column: Upload Zone */}
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-5xl font-black tracking-tighter text-white italic leading-tight">
              CREATE <br />
              NEW REEL
            </h1>
            <p className="text-neon-cyan font-bold text-[10px] uppercase tracking-[0.6em] mt-2">
              Publish your high-fidelity content
            </p>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={`relative aspect-9/16 max-w-[320px] mx-auto lg:mx-0 rounded-[2.5rem] border-2 border-dashed transition-all duration-500 overflow-hidden group
              ${file ? "border-neon-cyan/50 shadow-[0_0_50px_rgba(0,242,234,0.1)]" : "border-white/10 hover:border-white/20 hover:bg-white/2"}
            `}
          >
            {file ? (
              <div className="h-full w-full relative">
                <video
                  src={preview}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={removeFile}
                    className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8">
                    <div className="w-full space-y-4">
                      <div className="flex justify-between text-[10px] font-black tracking-widest text-white uppercase">
                        <span>Uploading</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-cyan transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="h-full w-full flex flex-col items-center justify-center p-12 text-center"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ring-1 ring-white/5">
                  <FileVideo
                    className="text-zinc-500 group-hover:text-neon-cyan transition-colors"
                    size={32}
                  />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-2">
                  Drag Video or Click
                </h3>
                <p className="text-zinc-600 text-[9px] uppercase tracking-widest leading-relaxed">
                  MP4, WebM up to 50MB
                  <br />
                  9:16 Aspect Ratio Recommended
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="video/*"
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="flex flex-col justify-end">
          <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] border-white/5 space-y-8 relative overflow-hidden group">
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="space-y-6 relative z-10">
              <div className="space-y-3 group/field">
                <div className="flex items-center gap-3 ml-4">
                  <Type size={12} className="text-neon-cyan" />
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 group-focus-within/field:text-neon-cyan transition-colors">
                    Reel Name
                  </label>
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Midnight Cyber Burger"
                  className="w-full px-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/50 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800"
                />
              </div>

              <div className="space-y-3 group/field">
                <div className="flex items-center gap-3 ml-4">
                  <AlignLeft size={12} className="text-neon-pink" />
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 group-focus-within/field:text-neon-pink transition-colors">
                    Description
                  </label>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Tell the world about this creation..."
                  className="w-full px-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-pink/50 focus:ring-4 focus:ring-neon-pink/5 transition-all text-white placeholder:text-zinc-800 resize-none h-40"
                />
              </div>

              {error && (
                <div className="flex items-center gap-3 p-5 bg-red-500/5 border border-red-500/10 rounded-3xl text-red-500 animate-shake">
                  <AlertCircle size={18} />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    {error}
                  </p>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading || !file || !name}
                className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-4xl hover:bg-neon-cyan hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-20 relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-neon-cyan/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                {uploading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span className="relative z-10">Broadcast Reel</span>
                    <Plus
                      size={18}
                      className="relative z-10 group-hover:rotate-90 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>

            {/* Hint */}
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
                By publishing, you agree to the <br />
                <span className="text-white hover:text-neon-cyan transition-colors cursor-pointer underline underline-offset-4">
                  Identity Terms of Service
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
