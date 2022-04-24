import './cart-item.scss';

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='item-details'>
        <h2 className='name'>{name}</h2>
        <span>{quantity} X ${price}</span>
      </div>
    </div>
  );
}

export default CartItem;