import {ErrorsI18n, translate} from '@/locale';

export class PasswordMismatchError extends Error {
  constructor() {
    super(translate(ErrorsI18n.passwordMismatchError));
    this.name = 'PasswordMismatchError';
  }
}
