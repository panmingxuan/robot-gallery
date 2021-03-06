import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import logo from './assets/images/logo.svg';
import Robot from './components/Robot';
import RobotDiscount from './components/RobotDiscount';
import ShoppingCart from './components/ShoppingCart';

const App: React.FC = (props) => {
  //tuple元组
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    document.title = `点击${count}次`;
  }, [count]);

  //数组为空，相当于 componentDidMount 只会在组件加载的时候执行一次
  //第二个参数为空，相当于 componentDidUpdate,组件渲染结束时会被调用
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setRobotGallery(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt='robot' />
        <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
      </div>
      <button
        onClick={() => {
          //异步方法，无法重载
          setCount(count + 1);
          //setState()是异步更新，同步执行的。
          //setState可以接受两个回调函数
          // this.setState(
          //   (preState, preProps) => {
          //     return { count: preState.count + 1 };
          //   },
          //   () => {
          //     console.log('count', this.state.count);
          //   }
          // );
        }}
      >
        Click
      </button>
      <span>count:{count}</span>
      <ShoppingCart />
      {!error || (error !== '' && <div>网站出错:{error}</div>)}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) =>
            index % 2 === 0 ? (
              <RobotDiscount key={r.id} id={r.id} email={r.email} name={r.name} />
            ) : (
              <Robot key={r.id} id={r.id} email={r.email} name={r.name} />
            )
          )}
        </div>
      ) : (
        <h2>loading 加载中</h2>
      )}
    </div>
  );
};

export default App;
