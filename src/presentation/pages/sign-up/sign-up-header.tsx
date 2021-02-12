import {DefaultI18n, translate} from '@/locale';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {SignUpScreenNavigationProp} from './sign-up';

export type SignUpHeaderProps = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpHeader: React.FC<SignUpHeaderProps> = ({navigation}) => {
  return (
    <TopNavigation
      testID="signup_header"
      title={translate(DefaultI18n.back)}
      accessoryLeft={() => (
        <TopNavigationAction
          testID="signup_header_back_button"
          onPress={() => navigation.goBack()}
          icon={(props) => <Icon {...props} name="arrow-back" />}
        />
      )}
    />
  );
};

export default SignUpHeader;
