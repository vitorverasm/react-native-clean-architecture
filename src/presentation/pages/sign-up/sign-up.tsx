import {DefaultI18n, SignUpI18n, translate} from '@/locale';
import {KeyboardDismiss} from '@/presentation/components';
import {RootStackParamList} from '@/presentation/routes';
import {GlobalStyles} from '@/presentation/styles';
import {AddAccountFormValues} from '@/presentation/types';
import {Validation} from '@/validation/protocols';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SignUpHeader from './sign-up-header';

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export type SignUpProps = {
  navigation: SignUpScreenNavigationProp;
  validation: Validation;
};

const SignUp: React.FC<SignUpProps> = ({navigation, validation}) => {
  const theme = useTheme();

  const initialValues: AddAccountFormValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const toggleSecureEntry1 = () => {
    setSecureTextEntry1((prevSecuryTextEntry) => !prevSecuryTextEntry);
  };

  const toggleSecureEntry2 = () => {
    setSecureTextEntry2((prevSecuryTextEntry) => !prevSecuryTextEntry);
  };

  const onSubmit = async (values: AddAccountFormValues): Promise<void> => {
    console.log(values);
    setLoading(true);
  };

  return (
    <>
      <SafeAreaView
        style={[
          GlobalStyles.topSafeArea,
          {backgroundColor: theme['background-basic-color-4']},
        ]}
      />
      <SafeAreaView
        style={[
          GlobalStyles.bottomSafeArea,
          {backgroundColor: theme['background-basic-color-1']},
        ]}>
        <KeyboardDismiss>
          <Layout style={GlobalStyles.container} testID="signup_page_container">
            <SignUpHeader navigation={navigation} />
            <Formik
              validateOnMount={false}
              validateOnChange
              validateOnBlur
              initialValues={initialValues}
              validate={(values) => {
                return validation.validate({
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  passwordConfirmation: values.passwordConfirmation,
                });
              }}
              onSubmit={onSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
                setFieldTouched,
              }) => (
                <Layout testID="form_container" style={styles.formContainer}>
                  <Text category="h1">{translate(SignUpI18n.title)}</Text>
                  <Text category="s1" appearance="hint" style={styles.subtitle}>
                    {translate(SignUpI18n.subtitle)}
                  </Text>
                  <View testID="name_input_container">
                    <Input
                      ref={nameRef}
                      testID="name_input"
                      autoCapitalize="none"
                      size="large"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      accessoryLeft={(props) => (
                        <Icon {...props} name="person-outline" />
                      )}
                      style={[styles.inputs, styles.nameInput]}
                      label={translate(DefaultI18n.name)}
                      placeholder="Ex: John Doe"
                      onSubmitEditing={() => {
                        setFieldTouched('name', true);
                        emailRef?.current.focus();
                      }}
                      status={touched.name && errors.name ? 'danger' : 'basic'}
                      captionIcon={
                        touched.name && errors.name
                          ? (props) => <Icon {...props} name="info-outline" />
                          : null
                      }
                      caption={touched.name && errors.name ? errors.name : null}
                    />
                  </View>
                  <View testID="email_input_container">
                    <Input
                      ref={emailRef}
                      testID="email_input"
                      autoCapitalize="none"
                      size="large"
                      style={styles.inputs}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      accessoryLeft={(props) => (
                        <Icon {...props} name="email-outline" />
                      )}
                      label={translate(DefaultI18n.email)}
                      placeholder="Ex: john@doe.com"
                      onSubmitEditing={() => {
                        setFieldTouched('email', true);
                        passwordRef?.current.focus();
                      }}
                      status={
                        touched.email && errors.email ? 'danger' : 'basic'
                      }
                      captionIcon={
                        touched.email && errors.email
                          ? (props) => <Icon {...props} name="info-outline" />
                          : null
                      }
                      caption={
                        touched.email && errors.email ? errors.email : null
                      }
                    />
                  </View>
                  <View testID="password_input_container">
                    <Input
                      ref={passwordRef}
                      testID="password_input"
                      size="large"
                      autoCapitalize="none"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      accessoryLeft={(props) => (
                        <Icon {...props} name="lock-outline" />
                      )}
                      accessoryRight={(props) => (
                        <TouchableWithoutFeedback
                          testID="visibility_touchable1"
                          onPress={toggleSecureEntry1}>
                          <Icon
                            testID="visibility_icon"
                            {...props}
                            name={secureTextEntry1 ? 'eye-off' : 'eye'}
                          />
                        </TouchableWithoutFeedback>
                      )}
                      style={styles.inputs}
                      label={translate(DefaultI18n.password)}
                      placeholder="**********"
                      secureTextEntry={secureTextEntry1}
                      onSubmitEditing={() => {
                        setFieldTouched('password', true);
                        passwordConfirmationRef?.current.focus();
                      }}
                      status={
                        touched.password && errors.password ? 'danger' : 'basic'
                      }
                      captionIcon={
                        touched.password && errors.password
                          ? (props) => <Icon {...props} name="info-outline" />
                          : null
                      }
                      caption={
                        touched.password && errors.password
                          ? errors.password
                          : null
                      }
                    />
                  </View>
                  <View testID="password_confirmation_input_container">
                    <Input
                      ref={passwordConfirmationRef}
                      testID="password_confirmation_input"
                      size="large"
                      autoCapitalize="none"
                      value={values.passwordConfirmation}
                      onChangeText={handleChange('passwordConfirmation')}
                      onBlur={handleBlur('passwordConfirmation')}
                      accessoryLeft={(props) => (
                        <Icon {...props} name="lock-outline" />
                      )}
                      accessoryRight={(props) => (
                        <TouchableWithoutFeedback
                          testID="visibility_touchable2"
                          onPress={toggleSecureEntry2}>
                          <Icon
                            testID="visibility_icon"
                            {...props}
                            name={secureTextEntry2 ? 'eye-off' : 'eye'}
                          />
                        </TouchableWithoutFeedback>
                      )}
                      style={styles.inputs}
                      label={translate(SignUpI18n.passwordConfirmation)}
                      placeholder="**********"
                      secureTextEntry={secureTextEntry2}
                      onSubmitEditing={() =>
                        setFieldTouched('passwordConfirmation', true)
                      }
                      status={
                        touched.passwordConfirmation &&
                        errors.passwordConfirmation
                          ? 'danger'
                          : 'basic'
                      }
                      captionIcon={
                        touched.passwordConfirmation &&
                        errors.passwordConfirmation
                          ? (props) => <Icon {...props} name="info-outline" />
                          : null
                      }
                      caption={
                        touched.passwordConfirmation &&
                        errors.passwordConfirmation
                          ? errors.passwordConfirmation
                          : null
                      }
                    />
                  </View>
                  <Layout
                    testID="buttons_container"
                    style={styles.buttonsContainer}>
                    <Button
                      accessoryLeft={
                        loading ? () => <Spinner testID="spinner" /> : null
                      }
                      disabled={!!errors.email || !!errors.password || loading}
                      testID="signup_button"
                      size="large"
                      onPress={handleSubmit}>
                      {translate(SignUpI18n.signUp)}
                    </Button>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      testID="goback_button"
                      style={styles.goToSignIn}>
                      <Text
                        testID="already_have_account_text"
                        category="s1"
                        appearance="hint">
                        {translate(SignUpI18n.alreadyHaveAccount)}
                      </Text>
                      <Text
                        testID="sign_in_text"
                        category="s1"
                        style={styles.signInText}>
                        {translate(SignUpI18n.signIn)}
                      </Text>
                    </TouchableOpacity>
                  </Layout>
                </Layout>
              )}
            </Formik>
          </Layout>
        </KeyboardDismiss>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  formContainer: {
    flex: 7,
    padding: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  subtitle: {marginTop: 8},
  nameInput: {marginTop: 45},
  inputs: {marginTop: 20},
  buttonsContainer: {marginTop: 60},
  signupButton: {marginTop: 45},
  goToSignIn: {
    marginTop: 15,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  signInText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default SignUp;
