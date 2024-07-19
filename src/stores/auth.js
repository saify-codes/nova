import { reactive } from "vue";
import { defineStore } from "pinia";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const auth = getAuth();
  const authSession = reactive({
    token: null,
    user: null,
    status: "unauthenticated",
  });

  function authenticated() {
    return authSession.status === "authenticated";
  }

  function getUser() {
    return authSession.user;
  }

  function getToken() {
    return authSession.token;
  }

  function signin() {}

  async function signup(email, password) {
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        return 'account created';

    } catch (error) {

        if (error.code == 'auth/email-already-in-use') {
            return Promise.reject('email exists')
        }

        /*add more error logics here*/
    }
  }

  return { authenticated, getUser, getToken, signup };
});
