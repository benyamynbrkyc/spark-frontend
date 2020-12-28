export default async (store: any, router: any, signedOutToast: any) => {
  await store.commit('setUser', {});
  await store.commit('setToken', '');
  signedOutToast();
  router.go();
};
