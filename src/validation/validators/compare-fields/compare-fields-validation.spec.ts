import faker from 'faker';
import {PasswordMismatchError} from '../../errors';
import {CompareFieldsValidation} from './compare-fields-validation';

type FakeFormValues = {
  name?: string;
};

const makeSut = (
  comparedValue: string = faker.internet.password(),
): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), comparedValue);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.password());
    expect(error).toEqual(new PasswordMismatchError());
  });

  test('Should return null if compare is valid', () => {
    const password = faker.internet.password();
    const sut = makeSut(password);
    const error = sut.validate(password);
    expect(error).toBeNull();
  });
});
