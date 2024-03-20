import axios from "axios";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  orderData: [],
  amount: 0,
  pay: 0
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderAction: (state, action) => {
      const selectedProduct = state.orderData.find((item) => item.id == action.payload.id);

      if (selectedProduct == null) {
        const product = {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
          subtotal: 0
        }

        product.subtotal = product.price * product.quantity;

        state.orderData.push(product);

        state.amount = 0;
        state.orderData.forEach((item) => {
          state.amount += item.subtotal;
        });
      }
    },
    qtyIncreaseAction: (state, action) => {
      const selectedProduct = state.orderData.find((item) => item.id == action.payload.id);

      if (selectedProduct != null) {
        selectedProduct.quantity += 1;
        selectedProduct.subtotal += selectedProduct.price;

        state.amount = 0;
        state.orderData.forEach((item) => {
          state.amount += item.subtotal;
        });
      }
    },
    qtyDecreaseAction: (state, action) => {
      const selectedProduct = state.orderData.find((item) => item.id == action.payload.id);

      if (selectedProduct != null) {
        if (selectedProduct.quantity > 1) {
          selectedProduct.quantity -= 1;
          selectedProduct.subtotal -= selectedProduct.price;

          state.amount = 0;
          state.orderData.forEach((item) => {
            state.amount += item.subtotal;
          });
        } else if (selectedProduct.quantity == 1) {
          state.orderData.splice(state.orderData.indexOf(selectedProduct), 1);

          state.amount = 0;
          state.orderData.forEach((item) => {
            state.amount += item.subtotal;
          });
        }
      }
    },
    removeOrderAction: (state, action) => {
      const selectedProduct = state.orderData.find((item) => item.id == action.payload.id);

      if (selectedProduct != null) {
        state.orderData.splice(state.orderData.indexOf(selectedProduct), 1);

        state.amount = 0;
        state.orderData.forEach((item) => {
          state.amount += item.subtotal;
        });
      }
    },
    emptyStateAction: (state) => {
      state.orderData.forEach((item) => {
        state.orderData = state.orderData.filter(
          (filteredItem) => current(filteredItem) == item
        );
      });

      state.amount = 0;
    }
  }
});

// const recountAmountAction = () =>

export const { addOrderAction, qtyIncreaseAction, qtyDecreaseAction, removeOrderAction, emptyStateAction } = orderSlice.actions;

export default orderSlice.reducer;