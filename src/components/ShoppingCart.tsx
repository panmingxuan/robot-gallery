import React, { Component } from 'react';
import styles from './ShoppingCart.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { appContext } from '../AppState';

//定义props数据
interface Props {}

//定义state数据
interface State {
  isOpen: boolean;
}

class ShoppingCart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  //:
  handleClick = (e: React.MouseEvent) => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <appContext.Consumer>
        {(value) => {
          return (
            <div className={styles.cartContainer}>
              <button className={styles.button} onClick={this.handleClick}>
                <FiShoppingCart />
                <span>购物车 {value.shoppingCart.items.length} (件)</span>
              </button>
              <div className={styles.cartDropDown} style={{ display: this.state.isOpen ? 'block' : 'none' }}>
                <ul>
                  {value.shoppingCart.items.map((i) => (
                    <li>{i.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }}
      </appContext.Consumer>
    );
  }
}

export default ShoppingCart;
