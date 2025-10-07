import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeader } from './authUtils';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8081/api/products', {
        headers: getAuthHeader()
      });
      setProducts(response.data);
      setFilteredProducts(response.data);
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

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const categories = [...new Set(products.map(product => product.category))];

  const handleAddToCart = (product) => {
    alert(`Added "${product.name}" to cart! (Cart feature coming soon)`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <h2>Browse Products</h2>

      {/* Search and Filter Section */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{ minWidth: '150px' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}
          style={{
            padding: '10px 15px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>

      {/* Results Count */}
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No products found matching your search criteria.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map((product) => {
            const stockCount = Number(product.stock);
            const inStock = stockCount > 0;

            return (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Product Image */}
                <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        backgroundColor: '#f0f0f0'
                      }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/280x200?text=No+Image'; }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666'
                    }}>
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>
                  {product.name}
                </h3>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                  {product.description && product.description.length > 100
                    ? product.description.substring(0, 100) + '...'
                    : product.description || 'No description available'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{
                    backgroundColor: '#e9ecef',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#495057'
                  }}>
                    {product.category}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: inStock ? '#28a745' : '#dc3545'
                  }}>
                    {inStock ? `${stockCount} in stock` : 'Out of stock'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!inStock}
                    style={{
                      padding: '10px 15px',
                      backgroundColor: inStock ? '#28a745' : '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: inStock ? 'pointer' : 'not-allowed',
                      fontSize: '14px'
                    }}
                  >
                    {inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;
