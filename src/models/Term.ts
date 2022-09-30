export class Term implements ITerm {
  public term!: string;
  public context!: string;

  public constructor(
    { key, context }: { key: string, context: string }
  ) {
    this.term = key;
    this.context = context;
  }
}

export interface ITerm {
  term: string;
  context: string;
  plural?: string;
  created?: string;
  updated?: string;
  reference?: string;
  tags?: string[] | string;
  comment?: string;
}