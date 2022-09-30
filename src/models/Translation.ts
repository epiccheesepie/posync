import { TranslationContent } from "../types";

export class Translation implements ITranslation {
  public term!: string;
  public context!: string;
  public translation!: TranslationContent;

  public constructor(
    { key, context, value }: { key: string, context: string, value: string }
  ) {
    this.term = key;
    this.context = context;
    this.translation = { content: value };
  }
}

export interface ITranslation {
  term: string;
  context: string;
  translation: TranslationContent;
}