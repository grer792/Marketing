import React from "react";
import { Composition } from "remotion";
import { VideoEdit } from "./VideoEdit";
import {
  FPS,
  SOURCE_HEIGHT,
  SOURCE_WIDTH,
  SPEECH_SEGMENTS,
} from "./data/edit-data";
import { totalDuration } from "./timeline";

export const Root: React.FC = () => {
  const durationInFrames = Math.round(totalDuration(SPEECH_SEGMENTS) * FPS);

  return (
    <>
      <Composition
        id="VideoEdit"
        component={VideoEdit}
        durationInFrames={durationInFrames}
        fps={FPS}
        width={SOURCE_WIDTH}
        height={SOURCE_HEIGHT}
      />
    </>
  );
};
