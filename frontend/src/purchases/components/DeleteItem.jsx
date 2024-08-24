import { useDispatch } from "react-redux";
import Button from "../../shared/components/UIElements/Button";
import { deleteItem } from "../../shared/store/cartSlice";

function DeleteItem({ movieId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(movieId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
