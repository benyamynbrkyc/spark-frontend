<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <ion-page>
    <ion-header>
      <navbar></navbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list id="productsList">
        <h1 id="cartTitle">My &nbsp; Cart</h1>

        <ion-item v-for="(product, index) in cart" :key="index">
          <ion-avatar slot="start">
            <img :src="product.img_url" />
          </ion-avatar>
          <ion-label>
            <h2>
              <b>{{ product.name }}</b>
            </h2>
            <h3>{{ product.vendor }}</h3>
            <!-- <ion-input v-model="quantity"></ion-input> -->

            <p id="quantitySelector">
              Quantity: {{ product.quantity }}
              <ion-button color="dark" fill="clear" @click="qPlus(product)"
                ><ion-icon
                  slot="icon-only"
                  :icon="addCircleOutline"
                ></ion-icon></ion-button
              ><ion-button @click="qMinus(product)" color="dark" fill="clear"
                ><ion-icon
                  slot="icon-only"
                  :icon="removeCircleOutline"
                ></ion-icon
              ></ion-button>
              <br />
              <span style="font-weight: bold;"
                >{{ (product.price * product.quantity).toFixed(2) }} KM</span
              >
            </p>
          </ion-label>
          <ion-buttons>
            <ion-button @click="removeFromCart(product)">
              <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-item>
      </ion-list>
      <ion-item id="order">
        <ion-label>Total</ion-label>
        <p slot="end">{{ orderTotal }} KM</p>
      </ion-item>
      <form @submit.prevent="placeOrder">
        <ion-item>
          <ion-label position="floating">Your Address</ion-label>
          <ion-input required type="text" v-model="deliveryAddress"></ion-input>
        </ion-item>
        <ion-button type="submit">
          PLACE ORDER
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonLabel,
  IonAvatar,
  IonItem,
  // IonListHeader,
  IonButtons,
  IonButton,
  // IonToolbar,
  IonIcon,
  IonInput
  // alertController
} from '@ionic/vue';
import {
  closeOutline,
  removeCircleOutline,
  addCircleOutline
} from 'ionicons/icons';
import Navbar from '@/components/Navbar.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import axios from 'axios';
import baseURL from '@/utils/baseURL';
import { orderPlacedToast } from '@/utils/toasts';

export default defineComponent({
  name: 'Cart',
  components: {
    IonPage,
    IonHeader,
    IonContent,
    Navbar,
    IonList,
    IonLabel,
    IonAvatar,
    IonItem,
    // IonListHeader,
    IonButtons,
    IonButton,
    // IonToolbar,
    IonIcon,
    IonInput
    // alertController
  },
  setup() {
    const cart = ref([]);
    const deliveryAddress = ref('');
    const router = useRouter();

    onMounted(async () => {
      const storeCart = await store.getters.getCartContents;

      cart.value = storeCart;
    });

    const total = () => {
      let sum = 0;
      store.getters.getCartContents.forEach((product: any) => {
        sum += product.price * product.quantity;
      });
      return sum.toFixed(2);
    };

    const orderTotal: any = ref(0);
    orderTotal.value = total();

    const removeFromCart = (productToDelete: any) => {
      store.commit('removeFromCart', productToDelete);

      cart.value = cart.value.filter(
        (product: any) => product._id !== productToDelete._id
      );
    };

    const qPlus = async (product: any) => {
      await store.commit('incrementQuantity', product);
      orderTotal.value = total();
    };

    const qMinus = async (product: any) => {
      await store.commit('decrementQuantity', product);
      orderTotal.value = total();
    };

    const placeOrder = async () => {
      if (store.getters.getCartContents.length === 0) {
        window.alert('Cannot place an empty order.');
        return;
      }
      try {
        await axios.post(`${baseURL}/order/new`, {
          order: {
            created_at: new Date(),
            cost: orderTotal.value,
            delivery_address: deliveryAddress.value,
            customer_id: store.getters.getUser._id,
            products: store.getters.getCartContents
          },
          userId: store.getters.getUser._id
        });

        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(futureDate.getDate() + 7);

        await axios.post(`${baseURL}/shipment/new`, {
          shipment: {
            created_at: new Date(),
            delivered_at: futureDate,
            delivery_address: deliveryAddress.value,
            customer_id: store.getters.getUser._id,
            products: store.getters.getCartContents
          },
          userId: store.getters.getUser._id
        });
        await store.commit('resetCart');
        router.push('/');
        orderPlacedToast();
      } catch (err) {
        window.alert(err);
      }
    };

    return {
      // func
      removeFromCart,
      qPlus,
      qMinus,
      placeOrder,
      // vars
      cart,
      orderTotal,
      deliveryAddress,
      // icons
      closeOutline,
      removeCircleOutline,
      addCircleOutline
    };
  }
});
</script>

<style lang="scss" scoped>
#cartTitle {
  font-family: 'Cyberpunk';
  text-align: center;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 40px;
}
#productsList {
  max-width: 1000px;
  margin: auto;
}
#quantitySelector {
  ion-button {
    margin-top: -7px;
  }
}
#order {
  max-width: 1000px;
  margin: auto;
  font-size: 20px;
}
form {
  max-width: 500px;
  margin: auto;
  margin-top: 50px;

  ion-button {
    margin-top: 30px;
  }
}
</style>
