import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // ለፍለጋ የተጨመረ ስቴት

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // እቃዎችን በስም ለመፈለግ ያጣራል (Filter ያደርጋል)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', margin: 0 }}>
      {/* Navigation Bar */}
      <nav style={{ backgroundColor: '#232f3e', padding: '15px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#f90' }}>My E-commerce Store</h2>
        
        {/* Search Bar የተጨመረበት ቦታ */}
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '40%', padding: '8px 15px', borderRadius: '5px', border: 'none', fontSize: '16px' }}
        />

        <div style={{ fontWeight: 'bold' }}>🛒 Cart ({cart.length})</div>
      </nav>

      <div style={{ padding: '30px' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Featured Products</h1>
        
        {/* Products Grid */}
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{ backgroundColor: 'white', border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '250px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <img 
                src={product.id === 1 ? '/tshirt.jpg' : '/shoes.jpg'} 
                alt={product.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} 
              />
              <h3 style={{ color: '#333', margin: '15px 0 5px 0' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', height: '40px', overflow: 'hidden' }}>{product.description}</p>
              <p style={{ fontWeight: 'bold', color: '#B12704', fontSize: '18px', margin: '10px 0' }}>${product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                style={{ backgroundColor: '#f0c14b', border: '1px solid #a88734', color: '#111', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        {cart.length > 0 && (
          <div style={{ marginTop: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #ddd', maxWidth: '500px', margin: '40px auto 0 auto' }}>
            <h3>Order Summary</h3>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                <span>{item.name}</span>
                <strong>${item.price}</strong>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '18px', fontWeight: 'bold' }}>
              <span>Total Price:</span>
              <span style={{ color: '#B12704' }}>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;