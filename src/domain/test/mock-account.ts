import {AccountModel} from '@/domain/models';
import {AddAccountParams, AuthenticationParams} from '@/domain/usecases';
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
