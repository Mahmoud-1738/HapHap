import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';
import { MENU_ITEMS } from '../data/menu';

interface ProductDetailRouteProps {
  onAddItem: (itemId: string) => void;
}

const ProductDetailRoute: React.FC<ProductDetailRouteProps> = ({ onAddItem }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = MENU_ITEMS.find((item) => item.id === productId);

  if (!product) {
    return <div>Product niet gevonden.</div>;
  }

  const nutrition = {
    calories: product.kcal,
    protein: product.protein ?? 0,
    carbs: product.carbs ?? 0,
    fat: product.fat ?? 0,
    fiber: product.fiber ?? 0,
    sugar: product.sugar ?? 0,
  };

  const handleAddToCart = () => {
    onAddItem(product.id);
    navigate(-1);
  };

  return (
    <ProductDetailPage
      image={product.image}
      name={product.name}
      price={product.price}
      calories={product.kcal}
      description={product.description}
      nutrition={nutrition}
      allergens={product.allergens || []}
      onAddToCart={handleAddToCart}
    />
  );
};

export default ProductDetailRoute;
