<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <ion-page>
    <ion-header>
      <navbar></navbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h3 v-if="showErr">No products</h3>
      <ion-list id="productsList">
        <ion-list-header>
          <ion-toolbar id="adminToolbar" color="light">
            <b>Products</b>
            <ion-buttons slot="end">
              <ion-button @click="openCreateAlert">
                <ion-icon :icon="add"></ion-icon>
                &nbsp;Add
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-list-header>

        <ion-item v-for="(product, index) in products" :key="index">
          <ion-avatar slot="start">
            <img :src="product.img_url" />
          </ion-avatar>
          <ion-label>
            <h2>
              <b>{{ product.name }}</b>
            </h2>
            <h3>{{ product.vendor }}</h3>
            <p>{{ product.price }} KM</p>
          </ion-label>
          <ion-buttons>
            <ion-button color="primary" @click="openEditAlert(product)">
              Edit
            </ion-button>
            <ion-button
              color="danger"
              @click="openDeleteAlert(product._id, product.name)"
            >
              Delete
            </ion-button>
          </ion-buttons>
        </ion-item>
      </ion-list>
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
  IonListHeader,
  IonButtons,
  IonButton,
  IonToolbar,
  IonIcon,
  alertController
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { defineComponent, onMounted, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import store from '@/store';
import axios from 'axios';
import baseURL from '@/utils/baseURL';

export default defineComponent({
  name: 'Dashboard',
  components: {
    IonPage,
    IonHeader,
    Navbar,
    IonContent,
    IonList,
    IonLabel,
    IonAvatar,
    IonItem,
    IonListHeader,
    IonButtons,
    IonButton,
    IonToolbar,
    IonIcon
  },
  setup() {
    const products: any = ref([]);
    const showErr = ref(false);

    interface Product {
      _id: string;
      name: string;
      quantity: number;
      vendor: string;
    }

    onMounted(async () => {
      try {
        const response = await axios.get(`${baseURL}/products/`);
        response.data.forEach((product: Product) => {
          products.value.push(product);
        });
      } catch (err) {
        showErr.value = true;
      }
    });

    const openCreateAlert = async () => {
      const alert = await alertController.create({
        header: 'Add new product',
        inputs: [
          {
            label: 'Name',
            name: 'name',
            placeholder: 'Product name'
          },
          {
            label: 'Vendor',
            name: 'vendor',
            placeholder: 'Vendor name'
          },
          {
            label: 'Price',
            name: 'price',
            placeholder: 'Price'
          },
          {
            label: 'Image URL',
            name: 'img_url',
            placeholder: 'https://.../.jpg'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: async (data: any) => {
              try {
                await axios.post(`${baseURL}/products/new`, {
                  newProduct: data,
                  userId: store.getters.getUser._id
                });
                products.value.push(data);
                alertController.dismiss();
              } catch (err) {
                window.alert(err);
              }
            }
          }
        ]
      });

      return alert.present();
    };

    const openEditAlert = async (product: any) => {
      const alert = await alertController.create({
        header: `Edit Product: ${product.name}`,
        inputs: [
          {
            label: 'Name',
            name: 'name',
            placeholder: 'Product name',
            value: product.name
          },
          {
            label: 'Vendor',
            name: 'vendor',
            placeholder: 'Vendor name',
            value: product.vendor
          },
          {
            label: 'Price',
            name: 'price',
            placeholder: 'Price'
          },
          {
            label: 'Image URL',
            name: 'img_url',
            placeholder: 'https://.../.jpg',
            value: product.img_url
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: async (data: any) => {
              try {
                await axios.patch(`${baseURL}/products/edit`, {
                  changedProduct: {
                    name: data.name,
                    vendor: data.vendor,
                    quantity: data.quantity,
                    img_url: data.img_url,
                    _id: product._id
                  },
                  userId: store.getters.getUser._id
                });
                alertController.dismiss();
                location.reload();
              } catch (err) {
                window.alert(err);
              }
            }
          }
        ]
      });

      return alert.present();
    };

    const openDeleteAlert = async (id: string, productName: string) => {
      const alert = await alertController.create({
        header: `Delete ${productName}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: async () => {
              try {
                await axios.delete(`${baseURL}/products/delete`, {
                  data: {
                    productToDeleteId: id,
                    userId: store.getters.getUser._id
                  }
                });
                location.reload();
              } catch (err) {
                window.alert(err);
              }
            }
          }
        ]
      });
      return alert.present();
    };

    return {
      // vars
      products,
      // controllers
      showErr,
      // icons
      add,
      // func
      openCreateAlert,
      openEditAlert,
      openDeleteAlert
    };
  }
});
</script>

<style lang="scss" scoped>
#productsList {
  max-width: 1000px;
  margin: auto;
}
#adminToolbar {
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 5px;
}
</style>
