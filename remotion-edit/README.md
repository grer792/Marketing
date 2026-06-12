# Remotion auto-edit for IMG_0345

Visual, browser-based editor (Remotion Studio) that auto-builds a cut
timeline from Whisper's silence gaps, applies a color grade, and overlays
synced captions — no DaVinci Resolve / Studio license needed.

## One-time setup (Windows)

```powershell
cd C:\Users\grer7\Marketing\remotion-edit
npm install
```

## 1. Generate the transcript (if you haven't already)

```powershell
python -m whisper "C:\Users\grer7\Downloads\IMG_0345.MOV" --model medium --output_format json
```

This creates `IMG_0345.json` in your current folder.

## 2. Build the edit data from the transcript

```powershell
node scripts/build-data-from-whisper.js "C:\Users\grer7\Downloads\IMG_0345.json" IMG_0345.mp4
```

This rewrites `src/data/edit-data.ts` with:
- `SPEECH_SEGMENTS` — the parts to keep (dead-air gaps removed)
- `CAPTIONS` — every transcript line, re-timed automatically onto the cut timeline

## 3. Add the video file

Copy/convert your video into `public/IMG_0345.mp4` (matches the filename you
passed in step 2):

```powershell
ffmpeg -i "C:\Users\grer7\Downloads\IMG_0345.MOV" -c copy public\IMG_0345.mp4
```

## 4. Preview it live (the "visual" part)

```powershell
npm run preview
```

Opens Remotion Studio in your browser — scrub the timeline, see the cuts,
color grade, and captions all rendered live. Tweak and re-save:

- **Color grade**: edit `COLOR_GRADE_FILTER` in `src/data/edit-data.ts`
  (any CSS `filter` string — e.g. `brightness()`, `contrast()`, `saturate()`).
- **Cuts**: edit `SPEECH_SEGMENTS` (add/remove/extend ranges in seconds).
- **Captions**: edit `CAPTIONS` text/timing directly.

Studio hot-reloads on save.

## 5. Render the final video

```powershell
npm run render
```

Output: `out/IMG_0345_edited.mp4`

---

## Split-screen overlay edit (separate project)

A second composition, `SplitScreenEdit`, takes a main video plus two overlay
clips and splits the screen (top = main video, bottom = overlay) at specific
points in the main video.

### 1. Build the edit data

```powershell
node scripts/build-split-screen.js `
  "C:\Users\grer7\AppData\Local\CapCut\Videos\0211\0612(1).mp4" `
  "C:\Users\grer7\Downloads\overlay1.MP4" `
  "C:\Users\grer7\Downloads\overlay 2.MP4" `
  19.23 54.10
```

This probes each video with ffprobe, copies them into `public/` as
`main.mp4`, `overlay1.mp4`, `overlay2.mp4`, and writes
`src/data/split-screen-data.ts` with the real durations/resolution. The last
two arguments (`19.23` / `54.10`) are when each overlay's split-screen window
starts, in seconds into the main video.

### 2. Preview live

```powershell
npm run preview -- --composition SplitScreenEdit
```

Adjust `mainStart` / `duration` for each overlay in
`src/data/split-screen-data.ts` and Studio hot-reloads.

### 3. Render

```powershell
npm run render-split
```

Output: `out/split-screen-edited.mp4`
