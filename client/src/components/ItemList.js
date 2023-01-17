import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { CART_ITEM_COUNT } from "../redux/pos/pos.action";

const { Meta } = Card;
const ItemList = ({ item }) => {
  let dispatch = useDispatch();
  const handleAddtoCart = () => {
    dispatch({
      type: CART_ITEM_COUNT,
      payload: { ...item, quantity: 1 },
    });
  };
  return (
    <>
      <Card
        style={{ width: 240 }}
        cover={
          <img alt={item.image} src={item.image} style={{ height: 250 }} />
        }
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button onClick={() => handleAddtoCart()} className="button">
            Add To Cart
          </Button>
        </div>
      </Card>
    </>
  );
};
export default ItemList;
