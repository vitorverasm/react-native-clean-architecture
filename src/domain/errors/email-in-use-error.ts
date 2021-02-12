import {ErrorsI18n, translate} from '@/locale';

export class EmailInUseError extends Error {
  constructor() {
    super(translate(ErrorsI18n.emailInUseError));
    this.name = 'EmailInUseError';
  }
}
