import {PasswordMismatchError} from '@/validation/errors';
import {FieldValidation} from '../../protocols';

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly comparedValue: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: string): Error {
    return new PasswordMismatchError();
  }
}
