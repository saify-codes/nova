import { reactive } from "vue";
import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { FireStore } from "@/utils";

export const useAuthStore = defineStore("auth", () => {
  const auth = getAuth();
  const db = new FireStore();

  const authSession = reactive({
    token: null,
    user: null,
    status: "loading",
  });

  function authenticated() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (userCredential) => {
        resolve(!!userCredential);
        setTimeout(() => {}, 3000);
      });
    });
  }

  function getUser() {
    return authSession.user;
  }

  function getToken() {
    return authSession.token;
  }

  function getSessionStatus() {
    return authSession.status;
  }

  function createAuthSession(
    token = null,
    user = null,
    status = "unauthenticated"
  ) {
    authSession.token = token;
    authSession.user = user;
    authSession.status = status;
  }

  function destroyAuthSession() {
    authSession.token = null;
    authSession.user = null;
    authSession.status = "unauthenticated";
  }

  function initAuthSession() {
    onAuthStateChanged(auth, async (userCredential) => {
      if (userCredential) {
        const user = await db.getRecordById("users", userCredential.uid);
        createAuthSession(userCredential.accessToken, user, "authenticated");
      } else {
        createAuthSession();
        setTimeout(() => {}, 5000);
      }
    });
  }

  async function signin(email, password, remember = false) {
    try {
      let persistency = remember
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistency);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = await db.getRecordById("users", userCredential.user.uid);
      createAuthSession(userCredential.accessToken, user, "authenticated");

      return "user logged in";
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        return Promise.reject("Invalid email or password");
      }

      if (error.code == "auth/network-request-failed") {
        return Promise.reject("Check internet connectivity");
      }

      if (error.code == "auth/user-disabled") {
        return Promise.reject("Account disabled");
      }

      /*add more error logics here*/
    }
  }

  async function signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        return Promise.reject("Email already exists");
      }
      if (error.code == "auth/network-request-failed") {
        return Promise.reject("Check internet connectivity");
      }
      /*add more error logics here*/
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (error.code == "auth/network-request-failed") {
        return Promise.reject("Check internet connectivity");
      }
      /*add more error logics here*/
    }
  }

  async function signout() {
    try {
      await signOut(auth);
      destroyAuthSession();
      return "user logged out";
    } catch (error) {
      return Promise.reject("Something went wrong");
    }
  }

  return {
    authSession,
    authenticated,
    getUser,
    getToken,
    getSessionStatus,
    signup,
    signin,
    signout,
    resetPassword,
    initAuthSession,
    createAuthSession,
  };
});
