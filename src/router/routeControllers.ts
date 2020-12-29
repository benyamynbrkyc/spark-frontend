import { useRouter } from 'vue-router';

export default () => {
  const router = useRouter();

  const pushLogin = () => {
    router.push('/login');
  };

  const pushSignUp = () => {
    router.push('/signup');
  };

  const pushHome = () => {
    router.push('/');
  };

  const pushDash = () => {
    router.push('/dashboard');
  };

  const pushCart = () => {
    router.push('/cart');
  };

  return {
    pushLogin,
    pushSignUp,
    pushHome,
    pushDash,
    pushCart
  };
};
