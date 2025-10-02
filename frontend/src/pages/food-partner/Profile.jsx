// ...existing code...
import React from 'react';
import '../../styles/variables.css'
import { useParams } from 'react-router-dom';

const Profile = () => {
    const params = useParams();
    console.log(params);
    
  const business = {
    name: 'Business Name',
    address: '123 Main St, City',
    totalMeals: 43,
    customerServe: '15K',
    videos: Array.from({ length: 12 }).map((_, i) => ({ id: i + 1 })),
  };

  const containerStyle = {
    maxWidth: 420,
    margin: '16px auto',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    background: 'var(--card-bg, #1b1b1b)',
    color: 'var(--text-primary, #fff)',
    paddingBottom: 12,
  };

  const headerStyle = {
    padding: 18,
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    background: 'var(--surface-1, rgba(255,255,255,0.02))',
  };

  const avatarStyle = {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'var(--avatar-bg, #234)',
    flexShrink: 0,
  };

  const metaRight = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  };

  const pill = {
    alignSelf: 'flex-start',
    padding: '8px 12px',
    borderRadius: 20,
    background: 'var(--pill-bg, rgba(255,255,255,0.04))',
    color: 'var(--text-primary, #fff)',
    fontWeight: 700,
    fontSize: 14,
    textDecoration: 'none',
  };

  const statsStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '18px 12px',
    gap: 12,
    alignItems: 'center',
  };

  const statCol = {
    textAlign: 'center',
    flex: 1,
  };

  const statLabel = { fontSize: 14, opacity: 0.9 };
  const statValue = { fontSize: 20, fontWeight: 700, marginTop: 6 };

  const hrStyle = {
    height: 1,
    background: 'var(--divider, rgba(255,255,255,0.06))',
    margin: '0 12px',
    borderRadius: 1,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    padding: 12,
    background: 'transparent',
  };

  const tileStyle = {
    aspectRatio: '1 / 1',
    background: 'var(--tile-bg, rgba(0,0,0,0.4))',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary, #ddd)',
    fontWeight: 600,
    fontSize: 14,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle} role="region" aria-label="food-partner-profile">
      <div style={headerStyle}>
        <div style={avatarStyle} aria-hidden="true" />
        <div style={metaRight}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={pill} title={business.name}>{business.name}</div>
            <div style={{ ...pill, padding: '6px 10px', fontWeight: 600 }} title={business.address}>
              {business.address}
            </div>
          </div>
        </div>
      </div>

      <div style={statsStyle}>
        <div style={statCol}>
          <div style={statLabel}>total meals</div>
          <div style={statValue}>{business.totalMeals}</div>
        </div>

        <div style={{ width: 1, background: 'transparent' }} />

        <div style={statCol}>
          <div style={statLabel}>customer serve</div>
          <div style={statValue}>{business.customerServe}</div>
        </div>
      </div>

      <div style={hrStyle} />

      <div style={gridStyle}>
        {business.videos.map((v) => (
          <div key={v.id} style={tileStyle} role="button" aria-label={`video-${v.id}`}>
            video
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
// ...existing code...