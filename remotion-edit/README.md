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
