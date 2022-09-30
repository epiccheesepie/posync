import { Api, mapMessage, mapTerm } from "./api";
import { Message, Language } from "./types";
import { loadFromFile, saveToFile } from "./utils";
import { ITerm, Term, Translation } from "./models";

export const messagesPath = 'messages.json';

export class POEditor {
  private messages!: Message[];
  private language: Language;

  private api: Api;

  public constructor() {
    this.language = Language.en;

    this.api = new Api();
  }

  public static create() {
    return new POEditor();
  }

  public async getTerms() {  
    const termsDto = await this.api.getTerms(this.language);
    const messages: Message[] = [];
    termsDto.forEach(termDto => {
      const message = mapMessage(termDto);
      messages.push(message);
    });
  
    this.saveMessages(messages);
  }

  public async deleteTerms() {
    this.getMessages();

    const termsDto = await this.api.getTerms(this.language);
    const terms: Term[] = [];
    termsDto.forEach(termDto => {
      const term = mapTerm(termDto);
      terms.push(term);
    });

    const termsForDelete = terms.filter(term => {
      const localKeys = this.messages.map(x => x.key);

      return !localKeys.includes(term.term);
    });

    await this.api.deleteTerms(termsForDelete);
  }

  public async uploadTranslates() {  
    this.getMessages();

    const termsDto = await this.api.getTerms(this.language);
    const terms: ITerm[] = [];
    termsDto.forEach(termDto => {
      const term = mapTerm(termDto);
      terms.push(term);
    });
  
    const messagesForUpload = this.messages.filter(message => {
      const outsideKeys = terms.map(x => x.term);
  
      return !outsideKeys.includes(message.key);
    });
  
    const localTerms = messagesForUpload.map(message => new Term({
      key: message.key,
      context: message.context ?? ''
    }));
  
    await this.api.addTerms(localTerms);
  
    const translates = messagesForUpload.map(message => new Translation({
      key: message.key,
      value: message.translation,
      context: message.context ?? ''
    }));
  
    await this.api.uploadTranslates(translates, this.language);
  }

  private saveMessages(messages: Message[]) {
    this.messages = messages;
    saveToFile(messagesPath, this.messages);
  }

  private getMessages() {
    this.messages = loadFromFile(messagesPath);
  }
}