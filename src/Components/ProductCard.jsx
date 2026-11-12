export default function ProductCard({
  product,
  qty,
  onAdd,
  onIncrease,
  onDecrease,
}) {
  const { name, category, price, image } = product;

  return (
    <article className="card">
      <picture>
        <source media="(min-width: 1024px)" srcSet={image.desktop} />
        <source media="(min-width: 640px)" srcSet={image.tablet} />
        <img
          className={`card-img ${qty > 0 ? "card-img-active" : ""}`}
          src={image.mobile}
          alt={name}
        />
      </picture>

      <div className="card-action">
        {qty === 0 ? (
          <button className="btn-add" onClick={() => onAdd(name)}>
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className="btn-qty">
            <button
              aria-label={`Decrease quantity of ${name}`}
              onClick={() => onDecrease(name)}
            >
              <img src="/assets/images/icon-decrement-quantity.svg" alt="" />
            </button>
            <span aria-live="polite">{qty}</span>
            <button
              aria-label={`Increase quantity of ${name}`}
              onClick={() => onIncrease(name)}
            >
              <img src="/assets/images/icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        )}
      </div>

      <p className="card-category">{category}</p>
      <h2 className="card-name">{name}</h2>
      <p className="card-price">${price.toFixed(2)}</p>
    </article>
  );
}
