import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from './authUtils';

function ProductForm({ existingProduct, onSave, onCancel }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: '',
    sellerId: 1 // We'll improve this later to get from logged-in user
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => (
      { 
        ...prev,
        [name]:
          name === 'price' 
          ? parseFloat(value)||0
          : name === 'stock'
          ? parseInt(value,10)||0
          :value
      }
      ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!product.name || !product.price || !product.stock || !product.category) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      if (product.id) {
        // Update existing product
        await axios.put(
          `http://localhost:8081/api/products/${product.id}`,
          product,
          { headers: getAuthHeader() }
        );
        alert('Product updated successfully!');
      } else {
        // Create new product
        await axios.post(
          'http://localhost:8081/api/products',
          product,
          { headers: getAuthHeader() }
        );
        alert('Product created successfully!');
      }
      
      if (onSave) onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{product.id ? 'Edit Product' : 'Add New Product'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Price *</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Stock Quantity *</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Category *</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : (product.id ? 'Update Product' : 'Add Product')}
          </button>
          
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px' 
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
