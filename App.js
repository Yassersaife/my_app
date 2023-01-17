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
import clubsScreen from './screens/clubsScreen/clubs';
import ClubInfo from './screens/clubsScreen/clubsDetail';
import MealCategoryVideoScreen from './screens/mealCategoryVideo/mealCategoryVideoScreen';
import DietCategoriesScreen from './screens/diet/dietCategoriesScreen';
import DietCategoryDetailScreen from './screens/diet/dietCategoryDetailScreen';
import DietDetailScreen from './screens/diet/dietDetailScreen';
import TrainerProfileScreen from './screens/trainers/trainerProfileScreen';
import TrainersScreen from './screens/trainers/trainersScreen';
import SignupTraninerScreen from './screens/auth/signupTraniner';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import WorkoutCategoryDetailScreen from './screens/workoutCategoryDetail/workoutCategoryDetailScreen';
import VideosScreen from './screens/videos/videosScreen';
import UserProgramScreen from './screens/userProgram/userProgramScreen';
import BottomTabs2 from './components/BottomTabs2';
import ClubworkInfo from './screens/trainerpages/clubsDetail';
import ClientScreen from './screens/trainerpages/ClientScreen';
import SpecialitySelectionScreen from './screens/trainerpages/SpecialityScreen';
import FavoriteScreen from './screens/favorite/favoriteScreen';
import HelpScreen from './screens/help/helpScreen';
import UserSubscriptionScreen from './screens/userSubscription/userSubscriptionScreen';
import NotificationScreen from './screens/notification/notificationScreen';
import ChooseTimeScreen from './screens/chooseTime/chooseTimeScreen';
import SelectPaymentMethodScreen from './screens/selectPaymentMethod/selectPaymentMethodScreen';
import SuccessPaymentScreen from './screens/successPayment/successPaymentScreen';
import AboutScreen from './screens/about/aboutScreen';
import ProfileTrainerScreen from './screens/trainerpages/profileScreen';
import VideosTrainerScreen from './screens/trainerpages/videosScreen';
import MapTestScreen from './screens/maps/MapsScreen';
import HomeScreen from './screens/home/homeScreen';
import { AuthProvider } from './constants/AuthContext';
import EditProfileTScreen from './screens/trainerpages/editProfileTScreen';
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
        <Stack.Screen name="BottomTabs2" component={BottomTabs2} options={{ ...TransitionPresets.DefaultTransition }} />
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
        <Stack.Screen name="EditProfileTrainer" component={EditProfileTScreen} />
        <Stack.Screen name="WorkoutCategoryDetail" component={WorkoutCategoryDetailScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
        <Stack.Screen name="UserProgram" component={UserProgramScreen} />
        <Stack.Screen name="ClubworkInfo" component={ClubworkInfo}/>
        <Stack.Screen name="client" component={ClientScreen}/>
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="UserSubscription" component={UserSubscriptionScreen} />
        <Stack.Screen name="Speciality" component={SpecialitySelectionScreen}/>
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="SubscriptionDetail" component={UserSubscriptionScreen} />
        <Stack.Screen name="ChooseTime" component={ChooseTimeScreen} />
        <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethodScreen} />
        <Stack.Screen name="SuccessPayment" component={SuccessPaymentScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="ProfileTrainer" component={ProfileTrainerScreen} />
        <Stack.Screen name="videosTrainer" component={VideosTrainerScreen} />
        <Stack.Screen name="maps" component={MapTestScreen} />

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
    <AuthProvider>
    <Route />

    </AuthProvider>
  );
}