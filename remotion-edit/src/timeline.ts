export type Range = { start: number; end: number };
export type Caption = Range & { text: string };

// A speech segment placed onto the cut (edited) timeline.
export type PlacedSegment = Range & {
  // start/end on the ORIGINAL video timeline
  originalStart: number;
  originalEnd: number;
};

export const placeSegmentsOnCutTimeline = (
  segments: Range[]
): PlacedSegment[] => {
  let cursor = 0;
  return segments.map((seg) => {
    const duration = seg.end - seg.start;
    const placed: PlacedSegment = {
      start: cursor,
      end: cursor + duration,
      originalStart: seg.start,
      originalEnd: seg.end,
    };
    cursor += duration;
    return placed;
  });
};

export const totalDuration = (segments: Range[]) =>
  segments.reduce((sum, seg) => sum + (seg.end - seg.start), 0);

// Re-time captions (given in ORIGINAL video time) onto the cut timeline,
// splitting/clipping them against the kept speech segments and dropping
// any portion that falls inside a removed silence gap.
export const mapCaptionsToCutTimeline = (
  captions: Caption[],
  segments: Range[]
): Caption[] => {
  const placed = placeSegmentsOnCutTimeline(segments);
  const result: Caption[] = [];

  for (const caption of captions) {
    for (const seg of placed) {
      const overlapStart = Math.max(caption.start, seg.originalStart);
      const overlapEnd = Math.min(caption.end, seg.originalEnd);
      if (overlapEnd <= overlapStart) continue;

      const offsetIntoSeg = overlapStart - seg.originalStart;
      const newStart = seg.start + offsetIntoSeg;
      const newEnd = newStart + (overlapEnd - overlapStart);

      result.push({ start: newStart, end: newEnd, text: caption.text });
    }
  }

  return result;
};
