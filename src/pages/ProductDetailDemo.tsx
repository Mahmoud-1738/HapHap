import React from 'react';
import ProductDetailPage from './ProductDetailPage';

const mockProduct = {
  image: '/assets/images/Breakfast/sample.jpg', // Pas aan naar een bestaand pad
  name: 'MUNCHKIN BOX B',
  price: 8.95,
  calories: 400,
  description: 'Een box met verschillende mini donuts, perfect om te delen',
  nutrition: {
    calories: 400,
    protein: 6,
    carbs: 58,
    fat: 16,
    fiber: 3,
    sugar: 35,
  },
  allergens: ['Gluten', 'Eieren', 'Melk'],
};

const ProductDetailDemo: React.FC = () => {
  const handleAddToCart = () => {
    alert('Toegevoegd aan winkelwagen!');
  };

  return (
    <div style={{ background: '#f6f6f6', minHeight: '100vh', padding: 32 }}>
      <ProductDetailPage {...mockProduct} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductDetailDemo;
