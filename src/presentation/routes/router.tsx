import {Home, SignUp} from '@/presentation/pages';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '.';

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  makeLogin: React.FC;
};

const Router: React.FC<Props> = ({makeLogin}) => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Login" component={makeLogin} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: true,
        }}
      />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Router;
