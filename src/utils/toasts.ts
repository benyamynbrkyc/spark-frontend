import { toastController } from '@ionic/vue';

const loggedInToast = async () => {
  const toast = await toastController.create({
    message: 'Successfully logged in',
    duration: 2000,
    position: 'bottom'
  });
  return toast.present();
};

const signedOutToast = async () => {
  const toast = await toastController.create({
    message: 'Signing out...',
    duration: 2000,
    position: 'bottom'
  });
  return toast.present();
};

export { loggedInToast, signedOutToast };
