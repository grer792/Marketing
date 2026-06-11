# Video Analysis Skills

Two free, open-source Claude Code skills for researching viral videos (frames,
script/transcript, scene-by-scene breakdown) so you can understand why a video
worked and recreate the format.

## `watch/` — fetch & quick-look at any video

Source: https://github.com/bradautomates/claude-video

Give it a URL (YouTube, TikTok, Instagram, Reels, etc.) or local file and a
question. It downloads with `yt-dlp`, pulls native captions (free) or falls
back to Whisper, extracts frames, and lets Claude "watch" it to answer
questions or summarize structure.

```
/watch https://www.tiktok.com/@user/video/123 what's the hook in the first 3 seconds?
```

- 100% free if the platform has captions/auto-subs (most do).
- Whisper fallback (Groq/OpenAI) is optional and only used if you add an API
  key — skip it entirely with `--no-whisper`.

## `video-analyzer/` — deep structural analysis for recreation

Source: https://github.com/bsisduck/video-analyzer-skill

Give it a downloaded video file. It extracts frames/grids, detects scene
changes, transcribes audio with **local** Whisper (no API key, no cost), and
dispatches parallel subagents to produce a structured Markdown report:
overview, executive summary, timeline (visual + audio per timestamp), and a
scene-by-scene breakdown — exactly what you need to reverse-engineer a
viral video's hook, pacing, script, and editing pattern.

```
analyze this video: ./downloaded/video.mp4
```

## Suggested workflow for "recreate this viral video"

1. `/watch <url>` to fetch the video locally and get a quick read.
2. Run `video-analyzer` on the downloaded file for the full
   timeline/script/scene breakdown.
3. Use the resulting `_analysis.md` (hook, pacing, scene structure, script)
   as a template/brief for your recreation.

## Requirements

`ffmpeg`, `ffprobe`, `yt-dlp`, `python3`, `bc`, and (optional, free) local
`openai-whisper` for transcription. No paid APIs are required for either
skill in their default configuration.
