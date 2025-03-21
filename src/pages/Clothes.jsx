import React, { useState, useEffect } from 'react';
import Layout from '../component/Layout';
import { useCart } from '../component/context/CartContext'; // Import useCart
import CartModal from '../component/CartModal'; // Import CartModal

const Clothes = () => {
  const [clothes, setClothes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const { addToCart } = useCart(); // Use cart context

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories/1/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setClothes(data);
      } catch (error) {
        console.error('Error fetching clothes:', error);
      }
    };

    fetchClothes();
  }, []);

  // Filter clothes based on search term
  const filteredClothes = clothes.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartModalOpen(true); // Open modal after adding to cart
  };

  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);

  return (
    <Layout>
      {/* Search Bar */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '90%',
            maxWidth: '500px',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '600',
        margin: '20px 0',
        paddingLeft: '2rem',
        color: '#333',
        textAlign: 'left'
      }}>
        Clothes
      </h1>

      {/* No products found */}
      {filteredClothes.length === 0 ? (
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#777',
          marginTop: '20px',
        }}>
          No matching products found.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          padding: '0 2rem',
        }}>
          {filteredClothes.map((product) => (
            <div key={product.id} style={{
              border: '1px solid #eee',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease-in-out',
              cursor: 'pointer',
              backgroundColor: '#fafafa',
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Product Image */}
              <div style={{ position: 'relative' }}>
                <img 
                  src={product.images?.[0]} 
                  alt={product.title} 
                  style={{ 
                    width: '100%', 
                    height: '180px', 
                    objectFit: 'cover' 
                  }} 
                />

                {/* Category Name */}
                <span style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  backgroundColor: '#ffffff',
                  color: '#333',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}>
                  Clothes
                </span>

                {/* Add to Cart Icon */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#fff',
                    color: '#555',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '18px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                >
                  🛒
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: '16px' }}>
                <h3 style={{
                  fontSize: '18px', 
                  fontWeight: '600', 
                  marginBottom: '8px', 
                  color: '#333'
                }}>
                  {product.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#777',
                  marginBottom: '8px',
                  height: '40px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {product.description.length > 100 
                    ? product.description.slice(0, 100) + '...' 
                    : product.description}
                </p>

                {/* Price */}
                <p style={{
                  fontSize: '16px', 
                  fontWeight: '500', 
                  color: '#555', 
                  marginBottom: '12px'
                }}>
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Modal */}
      <CartModal 
        isCartModalOpen={isCartModalOpen} 
        toggleCartModal={toggleCartModal} 
      />
    </Layout>
  );
};

export default Clothes;
