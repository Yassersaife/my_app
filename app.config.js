import 'dotenv/config';


export default
{
  "expo": {
    "name": "App-Fitness",
    "slug": "App-fitness",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yasser.APP-FITNESS"


    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yasser.saife.rnFitness"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra:{
      apiKey:process.env.api_key,
  authDomain:process.env.auth_Domain,
  projectId:process.env.project_Id,
  storageBucket:process.env.storage_Bucket,
  messagingSenderId:process.env.messaging_Sender_Id,
  appId:process.env.app_Id
    }
  }
}
