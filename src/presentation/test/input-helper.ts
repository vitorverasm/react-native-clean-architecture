import {fireEvent, RenderAPI} from '@testing-library/react-native';
import {InputProps} from '@ui-kitten/components';
import faker from 'faker';
import {ReactTestInstance} from 'react-test-renderer';

export const getInputCaptionByContainer = (
  inputContainer: ReactTestInstance,
): string | null => {
  const inputWrapper = inputContainer.children[0] as ReactTestInstance;
  if (inputWrapper && inputWrapper.children.length > 0) {
    const inputProps = inputWrapper.props as InputProps;
    if (inputProps.caption) {
      return inputProps.caption.toString();
    }
    return null;
  }
};

export const fillInputs = (
  sut: RenderAPI,
  email = faker.internet.email(),
  password = faker.internet.password(),
): void => {
  const {getByTestId} = sut;
  const emailInput = getByTestId('email_input');
  const passwordInput = getByTestId('password_input');
  const loginButton = getByTestId('login_button');

  fireEvent.changeText(emailInput, email);
  fireEvent.changeText(passwordInput, password);
  fireEvent(emailInput, 'onSubmitEditing');
  fireEvent(passwordInput, 'onSubmitEditing');
  fireEvent.press(loginButton);
};

export const fillInputByTestID = (
  sut: RenderAPI,
  inputTestID: string,
  value: string = faker.random.word(),
  submit: boolean = false,
): void => {
  const {getByTestId} = sut;
  const input = getByTestId(inputTestID);

  fireEvent.changeText(input, value);
  if (submit) {
    fireEvent(input, 'onSubmitEditing');
  }
};

export const assertStatusForInput = (
  sut: RenderAPI,
  inputTestID: string,
  validationError?: any,
): void => {
  const assertStatus = validationError ? 'danger' : 'basic';
  expect(sut.getByTestId(inputTestID)).toHaveProp('status', assertStatus);
  if (!validationError) {
    expect(
      getInputCaptionByContainer(sut.getByTestId(`${inputTestID}_container`)),
    ).toBeNull();
  } else {
    expect(
      getInputCaptionByContainer(sut.getByTestId(`${inputTestID}_container`)),
    ).toBe(validationError[inputTestID.split('_')[0]]);
  }
};

export const assertValueForInput = (
  sut: RenderAPI,
  inputTestID: string,
  expectedValue: string,
): void => {
  expect(sut.getByTestId(inputTestID)).toHaveProp('value', expectedValue);
};
