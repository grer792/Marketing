import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import {
  CAPTIONS,
  COLOR_GRADE_FILTER,
  FPS,
  SPEECH_SEGMENTS,
  VIDEO_FILE,
} from "./data/edit-data";
import { mapCaptionsToCutTimeline, placeSegmentsOnCutTimeline } from "./timeline";

const toFrames = (seconds: number) => Math.round(seconds * FPS);

export const VideoEdit: React.FC = () => {
  const placedSegments = placeSegmentsOnCutTimeline(SPEECH_SEGMENTS);
  const placedCaptions = mapCaptionsToCutTimeline(CAPTIONS, SPEECH_SEGMENTS);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Cut timeline: each kept speech segment plays back-to-back */}
      {placedSegments.map((seg, i) => {
        const from = toFrames(seg.start);
        const durationInFrames = toFrames(seg.end) - from;
        if (durationInFrames <= 0) return null;

        return (
          <Sequence key={i} from={from} durationInFrames={durationInFrames}>
            <AbsoluteFill style={{ filter: COLOR_GRADE_FILTER }}>
              <OffthreadVideo
                src={staticFile(VIDEO_FILE)}
                startFrom={toFrames(seg.originalStart)}
                endAt={toFrames(seg.originalStart) + durationInFrames}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* Captions, re-timed onto the cut timeline */}
      {placedCaptions.map((cap, i) => {
        const from = toFrames(cap.start);
        const durationInFrames = toFrames(cap.end) - from;
        if (durationInFrames <= 0) return null;

        return (
          <Sequence key={`cap-${i}`} from={from} durationInFrames={durationInFrames}>
            <AbsoluteFill
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 160,
              }}
            >
              <div
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 800,
                  fontSize: 64,
                  color: "white",
                  textAlign: "center",
                  textTransform: "uppercase",
                  textShadow: "0 0 12px rgba(0,0,0,0.85), 0 4px 8px rgba(0,0,0,0.6)",
                  maxWidth: "85%",
                  lineHeight: 1.15,
                }}
              >
                {cap.text}
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
