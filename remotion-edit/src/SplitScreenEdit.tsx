import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { FPS, MAIN_VIDEO, OVERLAYS } from "./data/split-screen-data";

const toFrames = (seconds: number) => Math.round(seconds * FPS);

const fullCover: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
};

export const SplitScreenEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Background: main video full-screen for the whole timeline */}
      <OffthreadVideo src={staticFile(MAIN_VIDEO)} style={fullCover} />

      {/* During each overlay window, cover the screen with a split view */}
      {OVERLAYS.map((overlay, i) => {
        const from = toFrames(overlay.mainStart);
        const durationInFrames = toFrames(overlay.duration);
        if (durationInFrames <= 0) return null;

        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <AbsoluteFill style={{ flexDirection: "column" }}>
              <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                {/* Main video continues in sync (offset so it lines up with the background) */}
                <OffthreadVideo
                  src={staticFile(MAIN_VIDEO)}
                  startFrom={from}
                  style={fullCover}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  overflow: "hidden",
                  borderTop: "3px solid white",
                }}
              >
                <OffthreadVideo src={staticFile(overlay.file)} style={fullCover} />
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
