import {HttpPostClientSpy} from '@/data/test';
import {AccountModel} from '@/domain/models';
import {mockAddAccount} from '@/domain/test';
import {AddAccountParams} from '@/domain/usecases';
import faker from 'faker';
import {RemoteAddAccount} from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {sut, httpPostClientSpy};
};

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct url', () => {
    const url = faker.internet.url();
    const {sut, httpPostClientSpy} = makeSut(url);
    sut.add(mockAddAccount());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', () => {
    const {sut, httpPostClientSpy} = makeSut();
    const addAccountParams = mockAddAccount();
    sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });
});
