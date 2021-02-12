import {PasswordMismatchError} from '@/validation/errors';
import {FieldValidation} from '../../protocols';

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly comparedValue: string) {}

  validate(value: string): Error {
    return value !== this.comparedValue ? new PasswordMismatchError() : null;
  }
}
