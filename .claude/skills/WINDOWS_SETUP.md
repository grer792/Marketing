# Windows Setup Guide — Video Analysis + DaVinci Resolve Editing

One-time setup to get the full pipeline working on your Windows machine:
analyze viral videos (frames + real transcript) -> use DaVinci Resolve MCP to
do AI-assisted cuts, color, and overlays.

## 1. Install Claude Code (if not already)

Requires Node.js 18+: https://nodejs.org (LTS installer)

Then:
```powershell
npm install -g @anthropic-ai/claude-code
```

## 2. Install ffmpeg

```powershell
winget install ffmpeg
```

Restart your terminal after this so `ffmpeg`/`ffprobe` are on PATH.

## 3. Install Whisper (free, local, real transcription)

Requires Python 3.10+: https://www.python.org/downloads/ (check "Add to PATH"
during install)

```powershell
pip install openai-whisper
```

First time it runs on a video it downloads the model (one-time, ~1.5GB for
`medium`) — this works fine on your home network (only blocked in the
sandbox we were using earlier).

## 4. Get this repo (video-analyzer + watch + davinci-resolve-mcp skills)

```powershell
git clone https://github.com/grer792/Marketing.git
cd Marketing
git checkout claude/video-analysis-tools-research-9gt6g4
```

## 5. Install DaVinci Resolve (free)

Download from https://www.blackmagicdesign.com/products/davinciresolve/
(Windows x86, free "DaVinci Resolve 21" — not Studio). Install and open it
at least once so it finishes its own setup.

## 6. Install the DaVinci Resolve MCP server

```powershell
pip install davinci-resolve-mcp
```

Then register it with Claude Code:
```powershell
claude mcp add davinci-resolve -- davinci-resolve-mcp
```

The skill is already in `.claude/skills/davinci-resolve-mcp/` in this repo —
Claude Code auto-discovers it.

**Important**: DaVinci Resolve must be **open and running** before you start
a Claude Code session that uses this MCP server.

## 7. Run it

```powershell
claude
```

Example prompts once everything is set up:
```
analyze this video: C:\Users\grer7\Downloads\IMG_0345.MOV
```
(now with a real Whisper transcript)

```
Open IMG_0345.MOV in DaVinci Resolve, cut out the silent pauses, and add
a text overlay with the hook line in the first 3 seconds.
```

## Troubleshooting

- `python3` not found -> use `python` instead, or run:
  `doskey python3=python $*` to alias it for the session.
- DaVinci Resolve MCP can't connect -> make sure Resolve is open with a
  project loaded, then in Claude Code run the `initialize` tool again.
- Whisper is slow on CPU -> use a smaller model (`base` or `small`) for
  quicker iteration; `medium`/`large` for final accuracy.
