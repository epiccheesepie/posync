import { TranslateDto } from './TranslateDto';

export interface TermDto {
  term: string;
  context: string;
  plural: string;
  created: string;
  updated: string;
  translation: TranslateDto;
  reference: string;
  tags: string[];
  comment: string;
}