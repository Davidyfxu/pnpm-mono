import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
  Avatar,
  Button,
  Empty,
  Input,
  List,
  Modal,
  Spin,
  Typography,
} from "@douyinfe/semi-ui";
import _ from "lodash";
import { IllustrationNoResult } from "@douyinfe/semi-illustrations";
import { IconClose, IconLikeHeart, IconSearch } from "@douyinfe/semi-icons";
import { getMealsBySearch, getRandomMeal } from "./apis";
import { IMeal } from "./types";
const { Title, Paragraph } = Typography;
const Meal = (props: {
  meal: IMeal;
  setShowMeal: (v: IMeal) => void;
  setVisible: (v: boolean) => void;
  mealsLs: IMeal[];
  setMealsLs: (v: IMeal[]) => void;
}) => {
  const { meal, setShowMeal, setVisible, mealsLs, setMealsLs } = props;
  return (
    <div className={styles.meal}>
      <div
        className={styles.mealHeader}
        onClick={() => {
          setShowMeal(meal);
          setVisible(true);
        }}
      >
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>
      <div className={styles.mealBody}>
        <Title heading={4}>{meal.strMeal}</Title>
        <Button
          theme="borderless"
          icon={<IconLikeHeart style={{ color: "#E91E63" }} />}
          aria-label="live"
          onClick={() => setMealsLs([...mealsLs, meal])}
        />
      </div>
    </div>
  );
};

const getIngredients = (mealData: IMeal) => {
  const ingredients = [];

  for (let i = 0; i < 20; i++) {
    // @ts-ignore
    if (mealData[`strIngredient${i}`]) {
      ingredients.push(
        // @ts-ignore
        `${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`
      );
    }
  }
  return ingredients;
};

const Recipe = () => {
  const [loading, setLoading] = useState(false);
  const [showMeal, setShowMeal] = useState<IMeal>({} as IMeal);
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [mealsLs, setMealsLs] = useState<IMeal[]>([]);
  const [inputV, setInputV] = useState<string>("");

  const onInputChange = _.debounce((value: string) => {
    setInputV(value);
  }, 500);

  useEffect(() => {
    try {
      setLoading(true);
      if (inputV.length === 0)
        getRandomMeal().then((m: { meals?: IMeal[] }) =>
          setMeals(_.get(m, "meals", []))
        );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [mealsLs]);

  useEffect(() => {
    try {
      setLoading(true);
      if (inputV.length > 0)
        getMealsBySearch(inputV).then((m: { meals?: IMeal[] }) =>
          setMeals(_.get(m, "meals", []))
        );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [inputV]);

  return (
    <div className={styles.body}>
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <Spin spinning={loading}>
            <Input
              onEnterPress={(e: any) => {
                onInputChange(e.target.value);
              }}
              suffix={<IconSearch />}
            />
          </Spin>
        </div>
        <div className={styles.favContainer}>
          <Title heading={3} style={{ margin: "8px 0" }}>
            Favorite Meals
          </Title>
          <div className={styles.favMeals}>
            {mealsLs.map((m: IMeal) => (
              <Avatar
                hoverMask={
                  <div className={styles.hover}>
                    <IconClose color={"white"} />
                  </div>
                }
                style={{ border: "2px solid white" }}
                src={m.strMealThumb}
                alt={""}
                onClick={() =>
                  setMealsLs(mealsLs.filter((i) => i.idMeal === m.idMeal))
                }
              />
            ))}
          </div>
        </div>
        <Spin spinning={loading}>
          <div className="meals">
            {meals ? (
              meals.map((m: IMeal, index: number) => (
                <Meal
                  key={index}
                  meal={m}
                  setShowMeal={setShowMeal}
                  setVisible={setVisible}
                  mealsLs={mealsLs}
                  setMealsLs={setMealsLs}
                />
              ))
            ) : (
              <Empty
                image={
                  <IllustrationNoResult style={{ width: 150, height: 150 }} />
                }
                description={"No search result"}
              />
            )}
          </div>
        </Spin>
      </div>
      <Modal
        className={styles.popup}
        centered
        title={showMeal.strMeal}
        visible={visible}
        onOk={() => setVisible(false)}
        hasCancel={false}
        okText={"Got it!"}
        onCancel={() => setVisible(false)}
      >
        <div>
          <div className={styles.popupAvatar}>
            <Avatar
              src={showMeal.strMealThumb}
              alt=""
              shape={"square"}
              size={"extra-large"}
            />
          </div>
          <Paragraph>{showMeal.strInstructions}</Paragraph>
          <Title heading={3} style={{ margin: "8px 0" }}>
            Ingredients:
          </Title>
          <List
            split={false}
            dataSource={getIngredients(showMeal)}
            renderItem={(item) => (
              <List.Item style={{ margin: 0, padding: 0 }}>{item}</List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Recipe;
