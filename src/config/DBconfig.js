export default {
  PORT: process.env.PORT || 8080,
  mongoRemote: {
    client: "mongodb",
    cnxStr:
      "mongodb+srv://FrancoDev:FrancoDev@cluster0.dl6ll.mongodb.net/Clase26?retryWrites=true&w=majority",
  },
  firebaseRemote: {
    apiKey: "AIzaSyBMZz1d9xpbMqAI-ZspKiD4LhiIrkChHYU",
    authDomain: "clase-22-16ecd.firebaseapp.com",
    projectId: "clase-22-16ecd",
    storageBucket: "clase-22-16ecd.appspot.com",
    messagingSenderId: "599805989690",
    appId: "1:599805989690:web:bf835b0d45757bf40b3603",
  },
};
