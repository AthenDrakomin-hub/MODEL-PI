
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface SpecItem {
  name: string;
  teslaValue: string;
  competitorValue: string;
  teslaScore: number;
  competitorScore: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};
