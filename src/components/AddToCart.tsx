import React, { useContext } from 'react';
import { appSetStateContext } from '../AppState';
import { RobotProps } from './Robot';

//HOC高阶组件
//Hoc最大的问题就是组件层级多，来源不清晰，每一个hoc包裹组件都要经历创建之类的周期
export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>) => {
  return (props) => {
    const setState = useContext(appSetStateContext);
    const addToCart = (id, name) => {
      if (setState) {
        setState((state) => {
          return {
            ...state,
            shoppingCart: {
              items: [...state.shoppingCart.items, { id, name }],
            },
          };
        });
      }
    };
    return <ChildComponent {...props} addToCart={addToCart} />;
  };
};

//自定义hook
//hooks是比较无痛的，很好分离了状态和视图
export const useAddToCart = () => {
  const setState = useContext(appSetStateContext);
  const addToCart = (id, name) => {
    if (setState) {
      setState((state) => {
        return {
          ...state,
          shoppingCart: {
            items: [...state.shoppingCart.items, { id, name }],
          },
        };
      });
    }
  };
  return addToCart;
};
