export interface LyricPhrase {
  text: string;
  startMs: number | null;
  endMs: number | null;
}

export const lyricsTimeline: LyricPhrase[] = [
  { text: "أيتها الوردة", startMs: 1960, endMs: 3960 },
  { text: "والريحانة", startMs: 3960, endMs: 5960 },
  { text: "والياقوتة", startMs: 5960, endMs: 7920 },
  { text: "والسلطانة", startMs: 7920, endMs: 9790 },
  { text: "والشعبية", startMs: 9790, endMs: 11830 },
  { text: "والشرعية", startMs: 11830, endMs: 13630 },
  { text: "بين جميع الملكات", startMs: 13630, endMs: 17710 },
];
