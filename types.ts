
import React from 'react';

export type SupportedLang = 'zh' | 'en' | 'ja' | 'es' | 'fr' | 'de' | 'ko' | 'it' | 'pt' | 'nl' | 'tr' | 'pl' | 'sv' | 'ru' | 'ar';

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

/**
 * Fix for stripe-pricing-table custom element recognition in JSX.
 * We augment the global JSX namespace so that TypeScript recognizes this custom element.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}
