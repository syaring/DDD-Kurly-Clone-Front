import { render, screen, fireEvent } from '@testing-library/react';

import OrderProduct from './OrderProduct';

describe('OrderProduct', () => {
  const handleClick = jest.fn();

  const product = {
    id: 1,
    name: '샤인토마토',
    price: 7980,
    quantity: 1,
  };

  context('with products', () => {
    it('renders order product information', () => {
      render((
        <OrderProduct
          product={product}
          onClick={handleClick}
        />
      ));

      const { name, price, quantity } = product;

      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(`${price} 원`)).toBeInTheDocument();
      expect(screen.getByText(`${quantity} 개`)).toBeInTheDocument();
    });

    it('renders total price of order products ', () => {
      render((
        <OrderProduct
          product={product}
          onClick={handleClick}
        />
      ));

      expect(screen.getByText(`${product.price} 원`)).toBeInTheDocument();
    });
  });

  it('calls handleClick to process order', () => {
    render((
      <OrderProduct
        product={product}
        onClick={handleClick}
      />
    ));

    fireEvent.click(screen.getByRole('button', {
      name: /주문 하기/,
    }));

    expect(handleClick).toBeCalledTimes(1);
  });
});
