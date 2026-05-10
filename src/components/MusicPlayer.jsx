import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, ChevronLeft, ChevronRight } from 'lucide-react'

const playlist = [
  { title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', src: '/music/do-i-wanna-know.mp3', cover: null },
]

const formatTime = (s) => {
  if (isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const MusicPlayer = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [muted, setMuted] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const audioRef = useRef(null)

  const current = playlist[currentIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = muted ? 0 : volume
    audio.src = current.src
    if (isPlaying) audio.play().catch(() => setIsPlaying(false))
  }, [currentIndex])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const prev = () => setCurrentIndex(i => (i - 1 + playlist.length) % playlist.length)
  const next = () => setCurrentIndex(i => (i + 1) % playlist.length)

  const onTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0)
  const onLoadedMetadata = () => setDuration(audioRef.current?.duration || 0)
  const onEnded = () => next()

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />

      <div
        className="music-player"
        style={{
          position: 'fixed',
          left: collapsed ? '-220px' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Main Panel */}
        <div style={{
          width: '220px',
          background: 'rgba(10, 42, 59, 0.97)',
          backdropFilter: 'blur(20px)',
          borderRadius: '0 16px 16px 0',
          padding: '20px 16px',
          boxShadow: '4px 0 32px rgba(0,0,0,0.3)',
          border: '1px solid rgba(191,158,107,0.15)',
          borderLeft: 'none',
          color: 'white',
        }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Music2 size={14} style={{ color: '#bf9e6b', flexShrink: 0 }} />
            <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#bf9e6b', fontWeight: 600 }}>
              Now Playing
            </span>
          </div>

          {/* Cover Art */}
          <div style={{
            width: '100%',
            aspectRatio: '1',
            background: 'linear-gradient(135deg, #1c4e63 0%, #0a2a3b 100%)',
            borderRadius: '10px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(191,158,107,0.2)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {current.cover ? (
              <img src={current.cover} alt={current.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Music2 size={36} style={{ color: 'rgba(191,158,107,0.4)' }} />
              </div>
            )}
            {isPlaying && (
              <div style={{
                position: 'absolute', bottom: '8px', right: '8px',
                display: 'flex', gap: '2px', alignItems: 'flex-end',
              }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    width: '3px',
                    background: '#bf9e6b',
                    borderRadius: '2px',
                    animation: `bar${i} 0.8s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.15}s`,
                    height: `${8 + i * 4}px`,
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* Track Info */}
          <div style={{ marginBottom: '14px', overflow: 'hidden' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'white',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '2px',
            }}>
              {current.title}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
              {current.artist}
            </div>
          </div>

          {/* Progress Bar */}
          <div
            onClick={seek}
            style={{
              height: '3px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              marginBottom: '6px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(to right, #bf9e6b, #dbbc87)',
              borderRadius: '2px',
              transition: 'width 0.1s linear',
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{formatTime(currentTime)}</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '14px' }}>
            <button onClick={prev} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '4px', display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlay}
              style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: '#bf9e6b',
                border: 'none',
                color: '#0a2a3b',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#dbbc87'}
              onMouseLeave={e => e.currentTarget.style.background = '#bf9e6b'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
            </button>

            <button onClick={next} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '4px', display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setMuted(m => !m)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0', display: 'flex', flexShrink: 0 }}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range" min="0" max="1" step="0.01"
              value={muted ? 0 : volume}
              onChange={e => { setVolume(parseFloat(e.target.value)); setMuted(false) }}
              style={{ flex: 1, accentColor: '#bf9e6b', height: '3px', cursor: 'pointer' }}
            />
          </div>

          {/* Playlist Toggle */}
          <button
            onClick={() => setShowPlaylist(p => !p)}
            style={{
              width: '100%',
              marginTop: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(191,158,107,0.2)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '7px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(191,158,107,0.1)'; e.currentTarget.style.color = '#bf9e6b' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >
            {showPlaylist ? 'Tutup Playlist' : 'Lihat Playlist'}
          </button>

          {/* Playlist */}
          {showPlaylist && (
            <div style={{ marginTop: '10px', maxHeight: '180px', overflowY: 'auto' }}>
              {playlist.map((track, i) => (
                <div
                  key={i}
                  onClick={() => { setCurrentIndex(i); setIsPlaying(true); setTimeout(() => audioRef.current?.play().catch(() => {}), 100) }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: currentIndex === i ? 'rgba(191,158,107,0.15)' : 'transparent',
                    borderLeft: currentIndex === i ? '2px solid #bf9e6b' : '2px solid transparent',
                    marginBottom: '2px',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (currentIndex !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (currentIndex !== i) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 500, color: currentIndex === i ? '#bf9e6b' : 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{track.artist}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Toggle Tab */}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            width: '24px',
            height: '64px',
            background: 'rgba(10,42,59,0.97)',
            border: '1px solid rgba(191,158,107,0.15)',
            borderLeft: 'none',
            borderRadius: '0 8px 8px 0',
            color: '#bf9e6b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(28,78,99,0.97)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,42,59,0.97)'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <style>{`
        @keyframes bar1 { from { height: 8px; } to { height: 16px; } }
        @keyframes bar2 { from { height: 12px; } to { height: 6px; } }
        @keyframes bar3 { from { height: 16px; } to { height: 10px; } }
        .music-player::-webkit-scrollbar { width: 4px; }
        .music-player::-webkit-scrollbar-track { background: transparent; }
        .music-player::-webkit-scrollbar-thumb { background: rgba(191,158,107,0.3); border-radius: 2px; }
      `}</style>
    </>
  )
}

export default MusicPlayer