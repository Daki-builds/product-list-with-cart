import { useEffect, useState } from "react";
import products from "./data.json";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import OrderModal from "./components/OrderModal";
import "./App.css";

const STORAGE_KEY = "dessert-cart";

// cart shape: { [productName]: quantity }
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function removeKey(obj, key) {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => k !== key));
}

export default function App() {
  const [cart, setCart] = useState(loadCart);
  const [confirmed, setConfirmed] = useState(false);

  // keep localStorage in sync with the cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable: the cart still works in memory */
    }
  }, [cart]);

  const addItem = (name) => setCart((c) => ({ ...c, [name]: 1 }));
  const increase = (name) => setCart((c) => ({ ...c, [name]: c[name] + 1 }));
  const decrease = (name) =>
    setCart((c) => {
      if (c[name] <= 1) return removeKey(c, name);
      return { ...c, [name]: c[name] - 1 };
    });
  const removeItem = (name) => setCart((c) => removeKey(c, name));
  const clearCart = () => {
    setCart({});
    setConfirmed(false);
  };

  // derive the cart lines from the product list
  const items = products
    .filter((p) => cart[p.name])
    .map((p) => ({ ...p, qty: cart[p.name] }));

  return (
    <main className="layout">
      <section>
        <h1>Desserts</h1>
        <div className="products">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              qty={cart[product.name] || 0}
              onAdd={addItem}
              onIncrease={increase}
              onDecrease={decrease}
            />
          ))}
        </div>
      </section>

      <Cart
        items={items}
        onRemove={removeItem}
        onConfirm={() => setConfirmed(true)}
      />

      <OrderModal
        open={confirmed}
        items={items}
        onClose={() => setConfirmed(false)}
        onNewOrder={clearCart}
      />
    </main>
  );
}
