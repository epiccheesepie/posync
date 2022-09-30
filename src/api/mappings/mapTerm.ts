import { TermDto } from '../dto';
import { ITerm } from '../..//models';

export function mapTerm(term: TermDto): ITerm {
  return {
    term: term.term,
    context: term.context
  }
}