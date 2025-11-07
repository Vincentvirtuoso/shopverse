import React, { createContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  savedForLater: [], // replaced savedForLater
  coupon: null,
  discount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, item.maxUnits || 1),
                }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: 1,
            maxUnits: action.payload.stockCount || 1,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.maxUnits || 1),
              }
            : item
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
              : item
          )
          .filter((i) => i.quantity > 0),
      };

    // ❤️ Toggle favorite item
    case "TOGGLE_FAVORITE": {
      const exists = state.savedForLater.find(
        (i) => i.id === action.payload.id
      );

      console.log(exists);
      console.log(state);

      return exists
        ? {
            ...state,
            savedForLater: state.savedForLater.filter(
              (f) => f.id !== action.payload.id
            ),
          }
        : { ...state, savedForLater: [...state.savedForLater, action.payload] };
    }

    // 🧾 Coupon logic
    case "APPLY_COUPON": {
      const { code } = action.payload;
      const coupons = { SHOPVERSE10: 10, WELCOME20: 20, ESTATE5: 5 };
      const discount = coupons[code.toUpperCase()] || 0;
      return {
        ...state,
        coupon: discount ? code.toUpperCase() : null,
        discount,
      };
    }

    case "CLEAR_COUPON":
      return { ...state, coupon: null, discount: 0 };

    case "CLEAR_CART":
      return { ...initialState };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const saved = localStorage.getItem("shopverse_cart_state");
    return saved ? JSON.parse(saved) : initial;
  });

  // UI state that shouldn't be persisted
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const toggleCart = () => setCartOpen((s) => !s);

  useEffect(() => {
    localStorage.setItem("shopverse_cart_state", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const incrementQuantity = (id) =>
    dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  const decrementQuantity = (id) =>
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // ❤️ Favorite
  const toggleFavorite = (item) =>
    dispatch({ type: "TOGGLE_FAVORITE", payload: item });

  const applyCoupon = (code) =>
    dispatch({ type: "APPLY_COUPON", payload: { code } });
  const clearCoupon = () => dispatch({ type: "CLEAR_COUPON" });

  const subtotal = state.items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );
  const total = subtotal - (subtotal * state.discount) / 100;
  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        // UI helpers
        cartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        toggleFavorite,
        applyCoupon,
        clearCoupon,
        subtotal,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
