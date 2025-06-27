import create from 'zustand';

export const useAuthStore = create((set) => ({
    auth : {
        username : '',
        active : false
    },
    setUsername : (name) => set((state) => ({ auth : { ...state.auth, username : name }})) 
}))




export const useChallengeStore = create((set) => ({
    auth: {
      ChallengeName: '',
    },
    setChallengeName: (challengeName) =>
      set((state) => ({ auth: { ...state.auth, ChallengeName: challengeName } })),
  }));
  