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

const mustBeLoggedInToast = async () => {
  const toast = await toastController.create({
    message: 'You must be logged in or an admin to view this page.',
    duration: 2000,
    position: 'top'
  });
  return toast.present();
};

const orderPlacedToast = async () => {
  const toast = await toastController.create({
    message: 'Your order has been placed and your shipment is on the way.',
    duration: 4000,
    position: 'top'
  });
  return toast.present();
};

export { loggedInToast, signedOutToast, mustBeLoggedInToast, orderPlacedToast };
