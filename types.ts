
export enum AppStep {
  Upload,
  Customize,
  Generating,
  Result,
}

export type WorkflowType = 'partial' | 'full' | 'match' | 'custom';

export type RoomType =
  | 'Living Room'
  | 'Primary Bedroom'
  | 'Kitchen'
  | 'Dining Room'
  | 'Home Office'
  | 'Full Bathroom'
  | 'Game Room'
  | 'Walk-in Closet'
  | 'Content Creator Room'
  | 'Pet Room';

// RoomUsage is now a string to allow for more descriptive, dynamic options.
export type RoomUsage = string;

export type RoomFeel = 'Let AI Decide' | 'Relaxed' | 'Cozy' | 'Bright' | 'Elegant' | 'Bold' | 'Playful' | 'Minimal' | 'Natural' | 'Moody' | 'Classic';

export type RoomStyle = 'Modern' | 'Transitional' | 'Contemporary' | 'Scandinavian' | 'Moroccan' | 'Industrial' | 'Mid-Century Modern' | 'Coastal' | 'Japandi' | 'Bohemian';

export interface DesignParameters {
  workflowType: WorkflowType;
  roomType: RoomType;
  roomUsage: RoomUsage[];
  roomFeel: RoomFeel;
  roomStyle: RoomStyle;
  specialRequests: string;
}

export interface Option<T> {
  value: T;
  label: string;
  description?: string;
}
