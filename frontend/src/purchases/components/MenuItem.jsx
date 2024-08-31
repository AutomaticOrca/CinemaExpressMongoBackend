import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../../shared/store/cartSlice";

function MenuItem({ ticket }) {
  const dispatch = useDispatch();

  const { type, unitPrice } = ticket;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const handleAddToCart = () => {
    const newItem = {
      type,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };
  return (
    <li>
      <p>
        {type} ${unitPrice}
      </p>
    </li>
  );
}

export default MenuItem;
