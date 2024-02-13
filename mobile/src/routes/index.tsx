import { useContext } from 'react';

import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from '@hooks/useAuth';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from '@components/Loading';

const linking = {
  prefixes: ["ignite-rn-03-ignite-gym://", "com.anonymous.ignitern03ignitegym://", "exp+ignite-rn-03-ignite-gym://" ],
  config: {
    screens: {
      exercise: {
        path: "exercise/:exerciseId",
        parse: {
          exerciseId: (exerciseId: string) => `${exerciseId}`
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();

  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if(isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}