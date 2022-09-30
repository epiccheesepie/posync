import { TermDto } from "../dto";
import { Message } from "../../types";

export function mapMessage(term: TermDto): Message {
  return {
    key: term.term,
    translation: term.translation.content
  }
}