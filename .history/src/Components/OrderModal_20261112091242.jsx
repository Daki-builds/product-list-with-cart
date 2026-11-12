import { useEffect, useRef } from "react";

export default function OrderModal({ open, items, onClose, onNewOrder }) {
  const ref = useRef(null);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <img src="/assets/images/icon-order-confirmed.svg" alt="" />
      <h2 id="modal-title">Order Confirmed</h2>
      <p className="modal-sub">We hope you enjoy your food!</p>

      <div className="modal-summary">
        <ul>
          {items.map((item) => (
            <li key={item.name} className="modal-item">
              <img src={item.image.thumbnail} alt="" />
              <div className="modal-info">
                <p className="modal-name">{item.name}</p>
                <p className="cart-item-meta">
                  <span className="qty">{item.qty}x</span>
                  <span className="unit">@ ${item.price.toFixed(2)}</span>
                </p>
              </div>
              <span className="modal-line">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <p className="cart-total">
          <span>Order Total</span>
          <strong>${total.toFixed(2)}</strong>
        </p>
      </div>

      <button className="btn-primary" onClick={onNewOrder}>
        Start New Order
      </button>
    </dialog>
  );
}
