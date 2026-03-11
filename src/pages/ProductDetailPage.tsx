import React from 'react';
import './ProductDetailPage.css';

interface ProductDetailProps {
  image: string;
  name: string;
  price: number;
  calories: number;
  description: string;
  allergens: string[];
  onAddToCart: () => void;
  onRequestClose?: () => void;
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({
  image,
  name,
  price,
  calories,
  description,
  allergens,
  onAddToCart,
  onRequestClose,
}) => {
  return (
    <div
      className="product-detail-overlay"
      onClick={onRequestClose}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="product-detail-modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="product-detail-header">
          <span className="product-detail-title">Product Details</span>
          {onRequestClose && (
            <span className="product-detail-close" onClick={onRequestClose} style={{cursor:'pointer'}}>×</span>
          )}
        </div>
        <div className="product-detail-image-container">
          <img src={image} alt={name} className="product-detail-image" />
        </div>
        <div className="product-detail-content">
          <h2 className="product-detail-name">{name}</h2>
          <div className="product-detail-tags">
            <span className="product-detail-price">€ {price.toFixed(2)}</span>
            <span className="product-detail-calories">{calories} cal</span>
          </div>
          <p className="product-detail-description">{description}</p>
          <div className="product-detail-allergens">
            <span className="allergen-title">⚠ Allergen Information</span>
            <div className="allergen-list">{allergens.join(', ')}</div>
          </div>
        </div>
        <button className="product-detail-addtocart" onClick={onAddToCart}>
          + Add to Cart - € {price.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
