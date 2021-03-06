import React, { useContext } from 'react';
import styles from './Robot.module.css';
import { appContext } from '../AppState';
import { withAddToCart } from './AddToCart';

export interface RobotProps {
  id: number;
  name: string;
  email: string;
  addToCart: (id, name) => void;
}

const Robot: React.FC<RobotProps> = ({ id, name, email, addToCart }) => {
  const value = useContext(appContext);

  return (
    <div className={styles.cardContainer}>
      <img alt='robot' src={`https:robohash.org/${id}`} />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{value.username}</p>
      <button onClick={() => addToCart(id, name)}>加入购物车</button>
    </div>
  );
};

//使用hoc包裹组件，完成业务逻辑的勾入
export default withAddToCart(Robot);
