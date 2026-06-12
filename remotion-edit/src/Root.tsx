import React from "react";
import { Composition } from "remotion";
import { VideoEdit } from "./VideoEdit";
import { SplitScreenEdit } from "./SplitScreenEdit";
import {
  FPS,
  SOURCE_HEIGHT,
  SOURCE_WIDTH,
  SPEECH_SEGMENTS,
} from "./data/edit-data";
import {
  FPS as SPLIT_FPS,
  MAIN_DURATION,
  WIDTH as SPLIT_WIDTH,
  HEIGHT as SPLIT_HEIGHT,
} from "./data/split-screen-data";
import { totalDuration } from "./timeline";

export const Root: React.FC = () => {
  const durationInFrames = Math.round(totalDuration(SPEECH_SEGMENTS) * FPS);
  const splitDurationInFrames = Math.round(MAIN_DURATION * SPLIT_FPS);

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
      <Composition
        id="SplitScreenEdit"
        component={SplitScreenEdit}
        durationInFrames={splitDurationInFrames}
        fps={SPLIT_FPS}
        width={SPLIT_WIDTH}
        height={SPLIT_HEIGHT}
      />
    </>
  );
};
