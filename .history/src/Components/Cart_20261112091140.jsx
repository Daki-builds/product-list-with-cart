export default function Cart({ items, onRemove, onConfirm }) {
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <aside className="cart" aria-label="Shopping cart">
      <h2 className="cart-title">Your Cart ({count})</h2>

      {items.length === 0 ? (
        <div className="cart-empty">
          <img src="/assets/images/illustration-empty-cart.svg" alt="" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.name} className="cart-item">
                <div>
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-meta">
                    <span className="qty">{item.qty}x</span>
                    <span className="unit">@ ${item.price.toFixed(2)}</span>
                    <span className="sub">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  className="btn-remove"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => onRemove(item.name)}
                >
                  <img src="/assets/images/icon-remove-item.svg" alt="" />
                </button>
              </li>
            ))}
          </ul>

          <p className="cart-total">
            <span>Order Total</span>
            <strong>${total.toFixed(2)}</strong>
          </p>

          <p className="cart-neutral">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <span>
              This is a <strong>carbon-neutral</strong> delivery
            </span>
          </p>

          <button className="btn-primary" onClick={onConfirm}>
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
}
