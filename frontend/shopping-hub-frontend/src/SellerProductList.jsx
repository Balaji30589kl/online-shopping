import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from './authUtils';
import ProductForm from './ProductForm';

function SellerProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch seller's products on component load
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // For now using sellerId = 1, later we'll get from auth
      const response = await axios.get(
        'http://localhost:8081/api/products/seller/1',
        { headers: getAuthHeader() }
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8081/api/products/${productId}`, {
        headers: getAuthHeader(),
      });
      alert('Product deleted successfully!');
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh the list
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Products</h2>
        <button 
          onClick={handleAddProduct}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add New Product
        </button>
      </div>

      {showForm && (
        <ProductForm 
          existingProduct={editingProduct} 
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No products found. Add your first product to get started!</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Stock</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                      />
                    ) : (
                      <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></div>
                    )}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <strong>{product.name}</strong>
                    {product.description && (
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        {product.description.length > 50 
                          ? product.description.substring(0, 50) + '...' 
                          : product.description}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{product.category}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>${product.price}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{product.stock}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <button 
                      onClick={() => handleEditProduct(product)}
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        marginRight: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SellerProductList;
