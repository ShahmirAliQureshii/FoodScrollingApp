import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Music2,
  Volume2,
  VolumeX,
  MoreVertical,
  Send,
  X,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Ultimate UI Overhaul: Home (Reels Feed)
 * High-performance, full-screen vertical snap-scrolling.
 * Pure Tailwind 4 Implementation.
 */
const Home = () => {
  const [reels, setReels] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        setReels(res.data.foodItems || []);
      } catch (err) {
        console.error("Error fetching reels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-white/5 border-t-neon-pink rounded-full animate-spin mx-auto shadow-[0_0_20px_#ff0050]" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 animate-pulse">
            Syncing Deliciousness
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="snap-container no-scrollbar">
      {reels.map((reel) => (
        <ReelItem
          key={reel._id}
          reel={reel}
          isMuted={isMuted}
          toggleMute={() => setIsMuted(!isMuted)}
        />
      ))}
    </div>
  );
};

const ReelItem = ({ reel, isMuted, toggleMute }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likes, setLikes] = useState(reel.likes || 0);
  const [isSaved, setIsSaved] = useState(reel.isSaved);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(reel.comments || []);
  const videoRef = useRef(null);

  const handleActionCheck = () => {
    if (!user) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleToggleLike = async (e) => {
    e.stopPropagation();
    if (!handleActionCheck()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/${reel._id}/like`,
        {},
        { withCredentials: true },
      );
      setIsLiked(res.data.isLiked);
      setLikes(res.data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSave = async (e) => {
    e.stopPropagation();
    if (!handleActionCheck()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/${reel._id}/save`,
        {},
        { withCredentials: true },
      );
      setIsSaved(res.data.isSaved);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostComment = async (text) => {
    if (!handleActionCheck()) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/${reel._id}/comment`,
        { comment: text },
        { withCredentials: true },
      );
      setComments(res.data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.8 },
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="snap-item bg-black group/reel">
      {/* Cinematic Main Viewport */}
      <div className="relative w-full max-w-[500px] h-full sm:h-[95vh] sm:rounded-[4rem] overflow-hidden bg-zinc-950 border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-all duration-700">
        {/* Interaction Layer */}
        <video
          ref={videoRef}
          src={reel.video}
          className="w-full h-full object-cover select-none"
          loop
          muted={isMuted}
          playsInline
          onClick={() => {
            if (isPlaying) {
              videoRef.current?.pause();
              setIsPlaying(false);
            } else {
              videoRef.current?.play();
              setIsPlaying(true);
            }
          }}
        />

        {/* Dynamic Shadow Mask */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Global UI Overlays */}
        <div className="absolute top-10 right-8 z-20 flex flex-col gap-6 items-center">
          <button
            onClick={toggleMute}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all border-white/10 shadow-2xl"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white border-white/10 active:rotate-90 transition-all shadow-2xl">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* High-Fidelity Action Bar */}
        <div className="absolute right-6 bottom-24 z-20 flex flex-col items-center gap-9">
          {/* Creator Pulse Avatar */}
          <div
            className="relative cursor-pointer group/avatar"
            onClick={() => navigate(`/food-partner/${reel.foodPartner?._id}`)}
          >
            <div
              className={`w-14 h-14 rounded-full border-2 p-0.5 transition-all duration-500 shadow-2xl ${reel.isFollowing ? "border-white/20" : "border-white"}`}
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reel.foodPartner?.name}`}
                className="w-full h-full rounded-full object-cover bg-zinc-900"
                alt="Partner"
              />
            </div>
            {!reel.isFollowing && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-neon-pink rounded-full flex items-center justify-center text-white shadow-[0_0_20px_#ff0050] border-4 border-zinc-950 group-hover/avatar:scale-125 transition-transform">
                <span className="text-[10px] font-black italic">+</span>
              </div>
            )}
          </div>

          {/* Social Interactions */}
          <div className="flex flex-col items-center gap-1.5 group/action">
            <button
              onClick={handleToggleLike}
              className="flex flex-col items-center"
            >
              <Heart
                size={36}
                fill={isLiked ? "#ff0050" : "none"}
                className={`transition-all duration-300 ${isLiked ? "text-neon-pink scale-110 drop-shadow-[0_0_15px_#ff0050]" : "text-white active:scale-150"}`}
                strokeWidth={2.5}
              />
              <span className="text-[10px] font-black uppercase tracking-tighter text-white mt-1 drop-shadow-lg">
                {likes}
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center gap-1.5 group/action">
            <button
              onClick={() => setShowComments(true)}
              className="flex flex-col items-center"
            >
              <MessageCircle
                size={36}
                className="text-white group-active/reel:scale-125 transition-transform drop-shadow-lg"
                strokeWidth={2.5}
              />
              <span className="text-[10px] font-black uppercase tracking-tighter text-white mt-1 drop-shadow-lg">
                {comments.length}
              </span>
            </button>
          </div>

          <button onClick={handleToggleSave} className="group/action">
            <Bookmark
              size={34}
              fill={isSaved ? "#00f2ea" : "none"}
              className={`transition-all duration-300 ${isSaved ? "text-neon-cyan drop-shadow-[0_0_15px_#00f2ea]" : "text-white stroke-[2.2]"}`}
            />
          </button>

          <button className="text-white hover:rotate-12 hover:scale-125 transition-all duration-300 drop-shadow-lg">
            <Share2 size={32} strokeWidth={2.5} />
          </button>
        </div>

        {/* Information Cluster */}
        <div className="absolute left-8 bottom-10 right-24 z-20 text-white">
          <div className="flex items-center gap-3 mb-3">
            <h3
              className="text-2xl font-black tracking-tighter italic cursor-pointer group-hover/reel:text-neon-cyan transition-colors"
              onClick={() => navigate(`/food-partner/${reel.foodPartner?._id}`)}
            >
              @
              {reel.foodPartner?.name?.toLowerCase().replace(/\s/g, "") ||
                "partner"}
            </h3>
            <div className="h-1.5 w-1.5 bg-neon-cyan rounded-full animate-bounce shadow-[0_0_10px_#00f2ea]" />
          </div>

          <p className="text-[17px] font-medium opacity-90 leading-tight tracking-tight line-clamp-2 mb-6 drop-shadow-md">
            {reel.description ||
              "The ultimate gastronomic experience captured in 8K resolution. 🔥🥂"}
          </p>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 shadow-2xl transition-all hover:bg-white/20">
            <div className="p-1.5 bg-neon-cyan/20 rounded-lg">
              <Music2 size={16} className="text-neon-cyan animate-spin-slow" />
            </div>
            <div className="overflow-hidden w-full whitespace-nowrap">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] inline-block animate-marquee">
                Original Audio - {reel.foodPartner?.name} • Elite Flavors Mix
              </span>
            </div>
          </div>
        </div>

        {/* Video Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5">
          <div className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan shadow-[0_0_15px_rgba(255,0,80,0.5)] transition-all ease-linear" />
        </div>

        {/* Comments Dynamic Panel */}
        {showComments && (
          <CommentPanel
            comments={comments}
            onClose={() => setShowComments(false)}
            onPostComment={handlePostComment}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

const CommentPanel = ({ comments, onClose, onPostComment, user }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onPostComment(text);
    setText("");
  };

  return (
    <div className="absolute inset-x-0 bottom-0 top-[25%] bg-black/95 backdrop-blur-3xl z-50 rounded-t-[4rem] flex flex-col animate-slide-up border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      {/* Panel Handle */}
      <div className="w-16 h-1.5 bg-zinc-800 rounded-full mx-auto mt-6 mb-4" />

      <div className="px-10 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tighter uppercase italic">
            FEEDBACK
          </span>
          <span className="px-3 py-1 bg-zinc-900 rounded-full text-[10px] font-black text-neon-cyan border border-white/5">
            {comments.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 no-scrollbar">
        {comments.map((c, i) => (
          <div key={i} className="flex gap-6 group/comment items-start">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 overflow-hidden shrink-0 border border-white/5 transition-transform group-hover/comment:scale-105">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user?.fullName}`}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h4 className="text-[12px] font-black uppercase tracking-widest text-white group-hover/comment:text-neon-cyan transition-colors">
                  {c.user?.fullName}
                </h4>
                <span className="text-[10px] font-bold text-zinc-700">
                  Just Now
                </span>
              </div>
              <p className="text-[15px] text-zinc-400 leading-relaxed font-medium">
                {c.comment}
              </p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-800 py-20 gap-6 opacity-40">
            <div className="p-8 bg-zinc-900/50 rounded-[2.5rem] border border-white/5">
              <MessageCircle size={60} strokeWidth={1} />
            </div>
            <div className="text-center space-y-1">
              <p className="font-black text-xs uppercase tracking-[0.4em]">
                Zero Broadcasts
              </p>
              <p className="text-[10px] font-bold">
                Be the first to initiate contact
              </p>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-10 pb-12 bg-black border-t border-white/5 flex gap-4"
      >
        <div className="flex-1 relative group">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              user ? "Communicate..." : "Access restricted. Login required."
            }
            disabled={!user}
            className="w-full bg-zinc-900 border border-white/5 rounded-3xl px-8 py-5 text-sm font-medium focus:outline-none focus:border-neon-pink focus:ring-4 focus:ring-neon-pink/10 transition-all text-white placeholder:text-zinc-700"
          />
          {user && (
            <Send
              className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-neon-pink transition-colors pointer-events-none"
              size={18}
            />
          )}
        </div>
        {!user ? (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-8 bg-neon-pink text-white font-black uppercase text-[10px] tracking-widest rounded-3xl animate-pulse"
          >
            Authenticate
          </button>
        ) : (
          <button
            type="submit"
            disabled={!text.trim()}
            className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-black active:scale-90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-30 disabled:grayscale"
          >
            <Send size={24} strokeWidth={3} />
          </button>
        )}
      </form>
    </div>
  );
};

export default Home;
