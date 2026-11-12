import { money } from "../format";
import { getImage } from "../images";
import { RemoveIcon, TreeIcon } from "../icons";

export default function Cart({ items, onRemove, onConfirm }) {
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <aside className="cart" aria-label="Shopping cart">
      <h2 className="cart__title">Your Cart ({count})</h2>

      {items.length === 0 ? (
        <div className="cart__empty">
          <img src={getImage("illustration-empty-cart.svg")} alt="" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="cart__list">
            {items.map((item) => (
              <li key={item.name} className="cart__item">
                <div>
                  <p className="cart__item-name">{item.name}</p>
                  <p className="cart__item-meta">
                    <span className="qty">{item.qty}x</span>
                    <span className="unit">@ {money(item.price)}</span>
                    <span className="sub">{money(item.price * item.qty)}</span>
                  </p>
                </div>
                <button
                  className="btn-remove"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => onRemove(item.name)}
                >
                  <RemoveIcon />
                </button>
              </li>
            ))}
          </ul>

          <p className="cart__total">
            <span>Order Total</span>
            <strong>{money(total)}</strong>
          </p>

          <p className="cart__neutral">
            <TreeIcon />
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
