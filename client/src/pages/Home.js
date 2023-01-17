import { useEffect, useState } from "react";
import Axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import ItemList from "../components/ItemList";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/pos/pos.action";
const Home = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectdCategory, setSelectedCategory] = useState("drinks");
  const catgories = [
    {
      name: "drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
    },
    {
      name: "rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
    },
    {
      name: "noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
    },
  ];
  useEffect(() => {
    getAllitems();
  }, []);
  const dispatch = useDispatch();

  const getAllitems = async () => {
    try {
      dispatch({ type: SHOW_LOADING });
      const { data } = await Axios.get(
        "http://localhost:8080/api/items/get-item"
      );
      setItemsData(data);
      dispatch({ type: HIDE_LOADING });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex">
        {catgories.map((category) => (
          <div
            key={category.name}
            className={`d-flex catgory ${
              selectdCategory === category.name && "catgory-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectdCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item._id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};
export default Home;
