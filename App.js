import 'react-native-gesture-handler';

import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { LogBox } from 'react-native';
import i18n from './languages/index';//don't remove this line
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './components/loadingScreen';
import OnboardingScreen from './screens/onBoarding/onboardingScreen';
import SplashScreen from './screens/splashScreen';
import SigninScreen from './screens/auth/signinScreen';
import SignupScreen from './screens/auth/signupScreen';
import ForgotPasswordScreen from './screens/auth/forgotPasswordScreen';
import OtpVerificationScreen from './screens/auth/otpVerification';
import NewPasswordScreen from './screens/auth/newPasswordScreen';
import LevelSelectionScreen from './screens/levelSelection/levelSelectionScreen';
import GenderSelectionScreen from './screens/genderSelection/genderSelectionScreen';
import RegstierSelectionScreen from './screens/auth/RegstierSelectionScreen.js';
import GoalSelectionScreen from './screens/goalSelection/goalSelectionScreen';
import BottomTabs from './components/BottomTabs';
import ShopScreen from './screens/shop/ShopScreen';
import ProductInfo from './screens/shop/ProductInfo';
import HomeScreen from './screens/home/homeScreen';
import clubsScreen from './screens/clubsScreen/clubs';
import ClubInfo from './screens/clubsScreen/clubsDetail';
import MealCategoryVideoScreen from './screens/mealCategoryVideo/mealCategoryVideoScreen';
import DietCategoriesScreen from './screens/diet/dietCategoriesScreen';
import DietCategoryDetailScreen from './screens/diet/dietCategoryDetailScreen';
import DietDetailScreen from './screens/diet/dietDetailScreen';
import TrainerProfileScreen from './screens/trainers/trainerProfileScreen';
import TrainersScreen from './screens/trainers/trainersScreen';
import SignupTraninerScreen from './screens/auth/signupTraniner';
import maps from './screens/maps/MapsScreen';
import BmiResult from './components/bmi/BmiResult';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import WorkoutCategoryDetailScreen from './screens/workoutCategoryDetail/workoutCategoryDetailScreen';
import VideosScreen from './screens/videos/videosScreen';
import UserProgramScreen from './screens/userProgram/userProgramScreen';
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
    
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >

<Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Selection" component={RegstierSelectionScreen} />
        <Stack.Screen name="Signuptr" component={SignupTraninerScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="GenderSelection" component={GenderSelectionScreen} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      <Stack.Screen name="m" component={maps} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="ProductInfo" component={ProductInfo}/>
        <Stack.Screen name="Clubs" component={clubsScreen}/>
        <Stack.Screen name="ClubInfo" component={ClubInfo}/>
        <Stack.Screen name="DietCategories" component={DietCategoriesScreen} />
        <Stack.Screen name="MealCategoryVideo" component={MealCategoryVideoScreen} />
        <Stack.Screen name="DietCategoryDetail" component={DietCategoryDetailScreen} />
        <Stack.Screen name="DietDetail" component={DietDetailScreen} />
        <Stack.Screen name="TrainerProfile" component={TrainerProfileScreen} />
        <Stack.Screen name="Trainers" component={TrainersScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="WorkoutCategoryDetail" component={WorkoutCategoryDetailScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
        <Stack.Screen name="UserProgram" component={UserProgramScreen} />


      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(Route);

export default App = () => {
  return (
    <ReloadAppOnLanguageChange />
  );
}