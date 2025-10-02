// ...existing code...
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom';
// ...existing code...



const Home = () => {
  const [videos, setVideos] = useState([])
  const containerRef = useRef(null);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: [0.6], // consider a video "active" when 60% visible
    };


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video');
        if (!video) return;
        if (entry.isIntersecting) {
          // try to play the visible video
          video.play().catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      });
    }, observerOptions);

    // observe each reel item
    videoRefs.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  
    useEffect(() => {
      axios.get('http://localhost:3000/api/food',{
        withCredentials: true,
      }).then((response) => {setVideos(response.data.foodItems)})
    }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {videos.map((item) => (
        <div
          key={item._id}
          ref={(el) => {
            if (el) videoRefs.current.set(item._id, el);
            else videoRefs.current.delete(item._id);
          }}
          style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            scrollSnapAlign: 'start',
            backgroundColor: '#000',
          }}
        >
          <video
            src={item.video}
            muted
            playsInline
            loop
            autoPlay
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* overlay at bottom of the video: description (max 2 lines) above the Visit Store button */}
          <div
            style={{
              position: 'absolute',
              left: 16,
              right: 16,
              bottom: 32,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'flex-start',
              textShadow: '0 2px 6px rgba(0,0,0,0.7)',
            }}
          >
            <div
              style={{
                maxWidth: '100%',
                fontSize: 16,
                lineHeight: '1.2',
                // two-line truncation
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={item.description}
            >
              {item.description}
            </div>

            <Link
              to={"/food-partner/" + item.foodPartner}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Visit store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
// ...existing code...