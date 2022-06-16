import './cart-item.scss';

type CartItems = {
  cartItem: {
    imageUrl: string,
    name: string,
    quantity: number,
    price: number
  }
}

const CartItem = ({ cartItem }: CartItems) => {
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