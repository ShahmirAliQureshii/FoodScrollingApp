import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid3X3,
  Film,
  Bookmark,
  Settings,
  Heart,
  MessageCircle,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/**
 * Ultimate UI Overhaul: Profile Page
 * Intelligent Routing for Users and Food Partners.
 * World-Class Tailwind 4 Aesthetic.
 */
const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          // Perspective: Viewing a Public Food Partner
          const res = await axios.get(
            `http://localhost:3000/api/food-partner/${id}`,
            { withCredentials: true },
          );
          setProfile(res.data.foodPartner);
          setVideos(res.data.foodReels || []);
          setActiveTab("reels");
        } else {
          // Perspective: Accessing Internal Identity (Current User)
          const res = await axios.get(
            `http://localhost:3000/api/user/profile`,
            { withCredentials: true },
          );
          setProfile(res.data.user);
          setVideos(res.data.savedItems || []);
          setActiveTab("saved");
        }
      } catch (err) {
        console.error("Critical Profile Sync Failure:", err);
        if (!id) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black gap-6">
        <div className="relative">
          <div className="w-24 h-24 border-2 border-white/5 border-t-neon-cyan rounded-full animate-spin shadow-[0_0_30px_#00f2ea]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black bg-white rounded-lg px-2 py-1 text-[10px] font-black italic">
              SYNC
            </span>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 animate-pulse">
          Retrieving Digital Identity
        </span>
      </div>
    );
  }

  const isOwnProfile = !id || id === authUser?._id;

  return (
    <div className="h-screen w-full bg-black overflow-y-auto no-scrollbar pb-32">
      {/* Dynamic Header Interaction */}
      <div className="sticky top-0 z-30 bg-black/50 backdrop-blur-3xl border-b border-white/5 md:hidden px-6 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-zinc-900 rounded-2xl text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-black tracking-widest uppercase italic">
          Profile Perspective
        </h1>
        <div className="w-10 h-10" />
      </div>

      <div className="max-w-[1000px] mx-auto pt-16 md:pt-24 px-8 md:px-16">
        {/* Cinematic Identity Core */}
        <header className="flex flex-col md:flex-row items-center gap-12 md:gap-28 mb-24">
          <div className="relative group shrink-0">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-[3.5rem] p-1 bg-gradient-to-tr from-neon-pink via-zinc-800 to-neon-cyan rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-2xl">
              <div className="w-full h-full rounded-[3.2rem] border-8 border-black overflow-hidden bg-zinc-950">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || profile?.fullName}`}
                  className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                  alt="Identity"
                />
              </div>
            </div>
            {/* Dynamic Status Indicator */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black shadow-2xl border-4 border-black">
              <span className="text-[10px] font-black italic">PRO</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white italic">
                {(profile?.name || profile?.fullName || "user")
                  .toLowerCase()
                  .replace(/\s/g, "_")}
              </h2>
              <div className="flex gap-3 justify-center md:justify-start">
                {isOwnProfile ? (
                  <>
                    <button className="px-8 py-3.5 bg-white text-black font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 shadow-xl">
                      CONFIGURE
                    </button>
                    <button
                      onClick={logout}
                      className="p-3.5 bg-zinc-900 text-zinc-400 border border-white/5 rounded-2xl hover:text-red-500 hover:border-red-500/20 transition-all"
                    >
                      <Settings
                        size={22}
                        className="animate-spin-slow hover:animate-spin"
                      />
                    </button>
                  </>
                ) : (
                  <button className="px-10 py-3.5 bg-neon-pink text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_40px_rgba(255,0,80,0.3)] hover:scale-105 active:scale-95 transition-all">
                    FOLLOW IDENTITY
                  </button>
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="flex justify-center md:justify-start gap-12 border-y border-white/5 py-6">
              <Metric label="BROADCASTS" value={id ? videos.length : 0} />
              <Metric
                label="FOLLOWERS"
                value={profile?.followers?.length || 0}
              />
              <Metric
                label="FOLLOWING"
                value={profile?.following?.length || 0}
              />
            </div>

            <div className="max-w-md mx-auto md:mx-0 space-y-2">
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-neon-cyan italic">
                {profile?.name || profile?.fullName}
              </h4>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed tracking-tight">
                {profile?.address ||
                  "Constructing high-fidelity gastro-content for the next generation. ⚡🥂"}
              </p>
            </div>
          </div>
        </header>

        {/* Semantic Navigation Hub */}
        <div className="flex justify-start gap-12 md:gap-20 mb-12 border-b border-white/5 pt-0 relative overflow-x-auto no-scrollbar">
          <ProfileTab
            active={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
            label="POSTS"
            icon={Grid3X3}
          />
          <ProfileTab
            active={activeTab === "reels"}
            onClick={() => setActiveTab("reels")}
            label="REELS"
            icon={Film}
          />
          {isOwnProfile && (
            <ProfileTab
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              label="ARCHIVE"
              icon={Bookmark}
            />
          )}
        </div>

        {/* Volumetric Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-6">
          {videos.map((video, idx) => (
            <ProfileVideoCard key={video._id} video={video} index={idx} />
          ))}
          {videos.length === 0 && (
            <div className="col-span-full py-32 text-center rounded-[3rem] border border-white/[0.03] bg-zinc-950/40">
              <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto mb-6 text-zinc-700">
                <Film size={36} />
              </div>
              <p className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.5em]">
                Inventory Depleted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, value }) => (
  <div className="flex flex-col items-center md:items-start gap-1">
    <span className="font-black text-2xl text-white tracking-tighter italic">
      {value}
    </span>
    <span className="text-[9px] uppercase font-black tracking-[0.2em] text-zinc-600">
      {label}
    </span>
  </div>
);

const ProfileTab = ({ active, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 py-6 relative transition-all duration-700 whitespace-nowrap ${active ? "text-white translate-y-[-2px]" : "text-zinc-600 hover:text-zinc-400"}`}
  >
    <Icon
      size={16}
      className={active ? "text-neon-pink scale-110" : "opacity-50"}
    />
    <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">
      {label}
    </span>
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neon-pink rounded-full shadow-[0_-5px_15px_#ff0050]" />
    )}
  </button>
);

const ProfileVideoCard = ({ video, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative aspect-[4/5] bg-zinc-950 group overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer border border-white/5 shadow-2xl animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        src={video.video}
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115 grayscale-[0.3] group-hover:grayscale-0"
        muted
        autoPlay={isHovered}
        loop
      />

      {/* Volumetric Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center gap-8 text-white transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0 scale-105"}`}
      >
        <div className="flex flex-col items-center gap-2">
          <Heart
            size={24}
            fill="white"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
          <span className="font-black text-xs italic">{video.likes || 0}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageCircle
            size={24}
            fill="white"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
          <span className="font-black text-xs italic">
            {video.comments?.length || 0}
          </span>
        </div>
      </div>

      {/* Subtle Progress Bar (Hover) */}
      <div
        className={`absolute bottom-6 left-6 right-6 h-1 bg-white/10 rounded-full overflow-hidden transition-all duration-500 translate-y-4 opacity-0 ${isHovered ? "translate-y-0 opacity-100" : ""}`}
      >
        <div className="h-full bg-neon-cyan w-1/3 shadow-[0_0_10px_#00f2ea]" />
      </div>
    </div>
  );
};

export default Profile;
