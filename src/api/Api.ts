const needle = require('needle');

import { Language } from '../types';
import { config } from '../config';
import { TermDto } from './dto';
import { toJson } from '../utils';
import { Translation, ITerm } from '../models';
import { Action } from './urls';

export class Api {
  public async getTerms(language: Language): Promise<TermDto[]> {
    const url = Action.GET_TERMS;
    const payload = {
      api_token: config.api_token,
      id: config.id,
      language
    };

    console.log({ action: 'request', ...payload });
    const response = await needle('post', url, payload);
    console.log(response.body.response);

    return response.body.result.terms as TermDto[];
  }

  public async deleteTerms(data: ITerm[]): Promise<void> {
    const url = Action.DELETE_TERMS;
    const payload = {
      api_token: config.api_token,
      id: config.id,
      data: toJson(data)
    };

    if (!data.length) throw new Error("Data can't be empty!");

    console.log({ action: 'request', ...payload });
    const response = await needle('post', url, payload);
    console.log(response.body.response);
  }

  public async addTerms(data: ITerm[]): Promise<void> {
    const url = Action.ADD_TERMS;
    const payload = {
      api_token: config.api_token,
      id: config.id,
      data: toJson(data)
    };

    console.log({ action: 'request', ...payload });
    const response = await needle('post', url, payload);
    console.log(response.body.response);
  }

  public async uploadTranslates(data: Translation[], language: Language): Promise<void> {
    const url = Action.ADD_TRANSLATES;
    const payload = {
      api_token: config.api_token,
      id: config.id,
      language,
      data: toJson(data)
    };

    console.log({ action: 'request', ...payload });
    const response = await needle('post', url, payload);
    console.log(response.body.response);
  }
}