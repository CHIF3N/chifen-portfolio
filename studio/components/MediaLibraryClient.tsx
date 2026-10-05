'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { MediaAsset } from '@/lib/contentStore';

interface Props {
  initialAssets: MediaAsset[];
}

interface Folder {
  id: string;
  name: string;
  icon: string;
  description: string;
  accent: string;
}

const DEFAULT_FOLDERS: Folder[] = [
  {
    id: 'covers',
    name: 'Project Thumbnails',
    icon: '🖼️',
    description: 'Featured project cards, case study covers, and work teasers',
    accent: '#8b5cf6',
  },
  {
    id: 'hero',
    name: 'Hero Portraits',
    icon: '👤',
    description: 'Hero persona images and Section 4 narrative story portraits',
    accent: '#08b9d4',
  },
  {
    id: 'research',
    name: 'Research Diagrams',
    icon: '🔬',
    description: 'Empirical histograms, antenatal correlation heatmaps, and charts',
    accent: '#f59e0b',
  },
  {
    id: 'screenshots',
    name: 'Product Screenshots',
    icon: '📱',
    description: 'Mobile app walkthroughs, web donor portals, and UI screens',
    accent: '#10b981',
  },
  {
    id: 'scenes',
    name: 'Motion Scenes',
    icon: '🎬',
    description: 'Ambient 3D loop animations and video background scenes',
    accent: '#ec4899',
  },
];

const STORAGE_KEY = 'chifen_studio_media_assets';

export function MediaLibraryClient({ initialAssets }: Props) {
  const [assets, setAssets] = useState<MediaAsset[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) return JSON.parse(cached);
      } catch (e) {
        console.error('Failed to load cached media assets', e);
      }
    }
    return initialAssets;
  });

  const [folders, setFolders] = useState<Folder[]>(DEFAULT_FOLDERS);
  const [activeFolderId, setActiveFolderId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Drag and Drop State
  const [draggingAssetId, setDraggingAssetId] = useState<string | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
    } catch (e) {
      console.error('Failed to cache media assets', e);
    }
  }, [assets]);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  function copyToClipboard(text: string, label: string) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard!`);
    }
  }

  // Move an asset to a specific folder
  function moveAssetToFolder(assetId: string, folderId: string) {
    const targetFolder = folders.find((f) => f.id === folderId);
    const targetAsset = assets.find((a) => a.id === assetId);

    if (!targetAsset || !targetFolder) return;

    setAssets((prev) =>
      prev.map((item) => {
        if (item.id === assetId) {
          return {
            ...item,
            category: folderId as MediaAsset['category'],
            usedIn: `${targetFolder.name} Collection`,
          };
        }
        return item;
      })
    );

    showToast(`✓ Categorized "${targetAsset.name}" into "${targetFolder.name}"!`);
  }

  // Handle Drag Events
  function handleDragStart(e: React.DragEvent, asset: MediaAsset) {
    e.dataTransfer.setData('text/plain', asset.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingAssetId(asset.id);
  }

  function handleDragEnd() {
    setDraggingAssetId(null);
    setDragOverFolderId(null);
  }

  function handleDragOverFolder(e: React.DragEvent, folderId: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverFolderId !== folderId) {
      setDragOverFolderId(folderId);
    }
  }

  function handleDragLeaveFolder(e: React.DragEvent, folderId: string) {
    e.preventDefault();
    if (dragOverFolderId === folderId) {
      setDragOverFolderId(null);
    }
  }

  function handleDropOnFolder(e: React.DragEvent, folderId: string) {
    e.preventDefault();
    const assetId = e.dataTransfer.getData('text/plain') || draggingAssetId;
    if (assetId) {
      moveAssetToFolder(assetId, folderId);
    }
    setDraggingAssetId(null);
    setDragOverFolderId(null);
  }

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesFolder = activeFolderId === 'all' || asset.category === activeFolderId;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        asset.filename.toLowerCase().includes(q) ||
        asset.usedIn.toLowerCase().includes(q) ||
        asset.category.toLowerCase().includes(q);
      return matchesFolder && matchesSearch;
    });
  }, [assets, activeFolderId, searchQuery]);

  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = { all: assets.length };
    folders.forEach((f) => {
      counts[f.id] = assets.filter((a) => a.category === f.id).length;
    });
    return counts;
  }, [assets, folders]);

  const activeFolder = folders.find((f) => f.id === activeFolderId);

  return (
    <div className="MediaLibraryClient" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.85rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Drag & Drop Guidance Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(8,185,212,0.12) 100%)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
              Drag &amp; Drop Visual Storytelling Organization
            </p>
            <p style={{ fontSize: '0.78rem', color: '#a1a1aa', marginTop: '0.15rem' }}>
              Grab any asset card below and drop it onto folder targets like <strong>Project Thumbnails</strong>, <strong>Hero Portraits</strong>, or <strong>Research Diagrams</strong>.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveFolderId('all')}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #3f3f46',
              background: activeFolderId === 'all' ? '#8b5cf6' : '#18181b',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Show All ({assets.length})
          </button>
        </div>
      </div>

      {/* Interactive Folder Drop Targets Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontVariant: 'all-small-caps', letterSpacing: '0.08em', color: '#a1a1aa', fontWeight: 700 }}>
            Folders &bull; Drag Target Zones
          </span>
          {draggingAssetId && (
            <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600, animation: 'pulse 1.5s infinite' }}>
              ✦ Release over a folder to categorize
            </span>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '0.85rem',
          }}
        >
          {folders.map((folder) => {
            const isHovered = dragOverFolderId === folder.id;
            const isSelected = activeFolderId === folder.id;
            const count = folderCounts[folder.id] || 0;

            return (
              <div
                key={folder.id}
                onDragOver={(e) => handleDragOverFolder(e, folder.id)}
                onDragLeave={(e) => handleDragLeaveFolder(e, folder.id)}
                onDrop={(e) => handleDropOnFolder(e, folder.id)}
                onClick={() => setActiveFolderId(isSelected ? 'all' : folder.id)}
                style={{
                  background: isHovered
                    ? 'rgba(139, 92, 246, 0.25)'
                    : isSelected
                    ? 'rgba(255, 255, 255, 0.08)'
                    : '#18181b',
                  border: isHovered
                    ? `2px dashed ${folder.accent}`
                    : isSelected
                    ? `1px solid ${folder.accent}`
                    : '1px solid #27272a',
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: isHovered ? `0 8px 25px ${folder.accent}33` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.6rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{folder.icon}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>{folder.name}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: 'rgba(0,0,0,0.5)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '9999px',
                      color: folder.accent,
                      border: `1px solid ${folder.accent}40`,
                    }}
                  >
                    {count}
                  </span>
                </div>

                <p style={{ fontSize: '0.72rem', color: '#a1a1aa', lineHeight: 1.35 }}>
                  {folder.description}
                </p>

                <div
                  style={{
                    paddingTop: '0.4rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: isHovered ? folder.accent : '#71717a',
                  }}
                >
                  <span>{isHovered ? '📥 Drop here to move' : isSelected ? '✓ Active Filter' : 'Filter by folder'}</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter, Search & View Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: '#111113',
          border: '1px solid #27272a',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#71717a' }}>Viewing:</span>
          <button
            onClick={() => setActiveFolderId('all')}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: activeFolderId === 'all' ? '1px solid #8b5cf6' : '1px solid transparent',
              background: activeFolderId === 'all' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
              color: activeFolderId === 'all' ? '#c4b5fd' : '#a1a1aa',
              cursor: 'pointer',
            }}
          >
            All Visual Assets ({assets.length})
          </button>
          {folders.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFolderId(f.id)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                border: activeFolderId === f.id ? `1px solid ${f.accent}` : '1px solid transparent',
                background: activeFolderId === f.id ? `${f.accent}26` : 'transparent',
                color: activeFolderId === f.id ? '#ffffff' : '#a1a1aa',
                cursor: 'pointer',
              }}
            >
              {f.icon} {f.name} ({folderCounts[f.id] || 0})
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '260px' }}>
          <input
            type="text"
            placeholder="Search by name, file, or usage..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              color: '#fff',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Active Folder Header Banner */}
      {activeFolder && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid #27272a',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.25rem' }}>{activeFolder.icon}</span>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{activeFolder.name}</span>
              <span style={{ fontSize: '0.75rem', color: '#71717a', marginLeft: '0.5rem' }}>
                ({filteredAssets.length} assets filed here)
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveFolderId('all')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8b5cf6',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Clear Folder Filter &times;
          </button>
        </div>
      )}

      {/* Visual Asset Cards Grid */}
      {filteredAssets.length === 0 ? (
        <div
          style={{
            background: '#111113',
            border: '1px dashed #27272a',
            borderRadius: '16px',
            padding: '3.5rem 1rem',
            textAlign: 'center',
            color: '#71717a',
          }}
        >
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📂</p>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Folder is empty</p>
          <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
            Drag and drop images into this folder, or clear your search query to see assets.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredAssets.map((asset) => {
            const isVideo = asset.format.includes('MP4');
            const isBeingDragged = draggingAssetId === asset.id;
            const currentFolder = folders.find((f) => f.id === asset.category);

            return (
              <div
                key={asset.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, asset)}
                onDragEnd={handleDragEnd}
                style={{
                  background: '#18181b',
                  border: isBeingDragged ? '2px dashed #8b5cf6' : '1px solid #27272a',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: isBeingDragged ? 0.45 : 1,
                  transform: isBeingDragged ? 'scale(0.97)' : 'scale(1)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease',
                  cursor: 'grab',
                }}
              >
                {/* Media Thumbnail Container */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    background: '#09090b',
                    overflow: 'hidden',
                  }}
                  onClick={() => setPreviewAsset(asset)}
                >
                  {isVideo ? (
                    <video
                      src={asset.url}
                      muted
                      loop
                      playsInline
                      autoPlay
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={asset.url}
                      alt={asset.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                      }}
                    />
                  )}

                  {/* Drag Handle Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.45rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backdropFilter: 'blur(4px)',
                    }}
                    title="Drag to organize into folders"
                  >
                    <span>⋮⋮ Drag</span>
                  </div>

                  {/* Folder Tag Badge */}
                  {currentFolder && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(0,0,0,0.85)',
                        color: currentFolder.accent,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        border: `1px solid ${currentFolder.accent}55`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <span>{currentFolder.icon}</span>
                      <span>{currentFolder.name}</span>
                    </span>
                  )}

                  {/* Format & Size Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.8)',
                      color: '#fff',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {asset.format} · {asset.sizeFormatted}
                  </span>
                </div>

                {/* Metadata Details */}
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={asset.name}
                  >
                    {asset.name}
                  </p>

                  <p
                    style={{
                      fontSize: '0.74rem',
                      color: '#a1a1aa',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {asset.usedIn}
                  </p>

                  {/* Quick Folder Assignment Select */}
                  <div style={{ marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#71717a' }}>Folder:</span>
                    <select
                      value={asset.category}
                      onChange={(e) => moveAssetToFolder(asset.id, e.target.value)}
                      style={{
                        flex: 1,
                        background: '#111113',
                        border: '1px solid #27272a',
                        borderRadius: '6px',
                        padding: '0.25rem 0.45rem',
                        fontSize: '0.72rem',
                        color: '#d4d4d8',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {folders.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.icon} {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* URL path box */}
                  <div
                    style={{
                      marginTop: '0.2rem',
                      background: '#111113',
                      border: '1px solid #222226',
                      borderRadius: '6px',
                      padding: '0.35rem 0.5rem',
                      fontSize: '0.7rem',
                      fontFamily: 'monospace',
                      color: '#71717a',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={asset.url}
                  >
                    {asset.url}
                  </div>

                  {/* Action Toolbar */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #27272a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <button
                      onClick={() => copyToClipboard(asset.url, 'path')}
                      style={{
                        flex: 1,
                        background: '#27272a',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.35rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Copy Path
                    </button>

                    <button
                      onClick={() => copyToClipboard(`![${asset.name}](${asset.url})`, 'Markdown')}
                      style={{
                        background: 'transparent',
                        border: '1px solid #27272a',
                        borderRadius: '6px',
                        padding: '0.35rem 0.6rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#a1a1aa',
                        cursor: 'pointer',
                      }}
                      title="Copy Markdown code"
                    >
                      MD
                    </button>

                    <button
                      onClick={() => setPreviewAsset(asset)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #27272a',
                        borderRadius: '6px',
                        padding: '0.35rem 0.6rem',
                        fontSize: '0.75rem',
                        color: '#a1a1aa',
                        cursor: 'pointer',
                      }}
                      title="Inspect media"
                    >
                      👁️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewAsset && (
        <div
          onClick={() => setPreviewAsset(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ position: 'relative', background: '#000', maxHeight: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {previewAsset.format.includes('MP4') ? (
                <video src={previewAsset.url} controls autoPlay loop style={{ maxWidth: '100%', maxHeight: '500px' }} />
              ) : (
                <img src={previewAsset.url} alt={previewAsset.name} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
              )}
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{previewAsset.name}</p>
                <p style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '0.2rem' }}>
                  {previewAsset.url} · {previewAsset.sizeFormatted} · {previewAsset.format}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => copyToClipboard(previewAsset.url, 'path')}
                  style={{
                    background: '#8b5cf6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Copy URL
                </button>
                <button
                  onClick={() => setPreviewAsset(null)}
                  style={{
                    background: '#27272a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
