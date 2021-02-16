import {
  ApplicationProviderMock,
  assertStatusForInput,
  assertValueForInput,
} from '@/presentation/test';
import {NavigationStub} from '@/presentation/test/mock-navigation';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {Icon, TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {SignUp} from '..';

type SutTypes = {
  sut: RenderAPI;
  navigationStub: NavigationStub<'SignUp'>;
};

const makeSut = (): SutTypes => {
  const navigationStub = new NavigationStub<'SignUp'>();
  const sut = render(
    <ApplicationProviderMock>
      <SignUp navigation={navigationStub} />
    </ApplicationProviderMock>,
  );
  return {
    navigationStub,
    sut,
  };
};

describe('SignUp Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const {sut} = makeSut();
    expect(sut.getByTestId('signup_header')).toBeDefined();
    assertStatusForInput(sut, 'name_input');
    assertStatusForInput(sut, 'email_input');
    assertStatusForInput(sut, 'password_input');
    assertStatusForInput(sut, 'password_confirmation_input');

    assertValueForInput(sut, 'name_input', '');
    assertValueForInput(sut, 'email_input', '');
    assertValueForInput(sut, 'password_input', '');
    assertValueForInput(sut, 'password_confirmation_input', '');
    expect(sut.getByTestId('password_input')).toHaveProp(
      'secureTextEntry',
      true,
    );
    expect(sut.getByTestId('password_confirmation_input')).toHaveProp(
      'secureTextEntry',
      true,
    );
    expect(sut.getByTestId('signup_button')).not.toBeDisabled();
  });

  test('Should change password visibility on password visibility icon tap', async () => {
    const {sut} = makeSut();
    await waitFor(() => {
      fireEvent.press(
        sut.getByTestId('password_input_container').findAllByType(Icon)[1],
      );
    });
    expect(sut.getByTestId('password_input')).toHaveProp(
      'secureTextEntry',
      false,
    );
    expect(
      sut.getByTestId('password_input_container').findAllByType(Icon)[1],
    ).toHaveProp('name', 'eye');
  });

  test('Should change password visibility on password confirmation visibility icon tap', async () => {
    const {sut} = makeSut();
    await waitFor(() => {
      fireEvent.press(
        sut
          .getByTestId('password_confirmation_input_container')
          .findAllByType(Icon)[1],
      );
    });
    expect(sut.getByTestId('password_confirmation_input')).toHaveProp(
      'secureTextEntry',
      false,
    );
    expect(
      sut
        .getByTestId('password_confirmation_input_container')
        .findAllByType(Icon)[1],
    ).toHaveProp('name', 'eye');
  });

  test('Should call navigation goback on SignOut button press ', async () => {
    const {sut, navigationStub} = makeSut();
    const navigateFunctionSpy = jest.spyOn(navigationStub, 'goBack');
    await waitFor(() => {
      fireEvent.press(
        sut.getByTestId('signup_header').findByType(TopNavigationAction),
      );
    });
    expect(navigateFunctionSpy).toHaveBeenCalled();
  });
});
