import { useState, useEffect } from 'react';
import './FlowerCards.css';
import { flowersAPI, authAPI } from '../services/api';

const FlowerCards = ({ onLogout }) => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = async () => {
    try {
      setLoading(true);
      const response = await flowersAPI.getAll();
      if (response.success) {
        setCards(response.data);
      }
    } catch (err) {
      console.error('Error fetching flowers:', err);
      setError('Failed to load flowers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      onLogout();
    } catch (err) {
      console.error('Logout error:', err);
      // Still logout on frontend even if API call fails
      onLogout();
    }
  };

  if (loading) {
    return (
      <div className="flower-cards-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading flowers...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flower-cards-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchFlowers}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flower-cards-container">
      <header className="flower-header">
        <h1>🌸 My Flower Cards Gallery</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flower-card"
            style={{ borderColor: card.color }}
            onClick={() => handleCardClick(card)}
          >
            <div className="flower-emoji">{card.emoji}</div>
            <div className="flower-name">{card.name}</div>
            <div className="flower-number">#{card.id}</div>
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-flower-emoji">{selectedCard.emoji}</div>
            <h2>{selectedCard.name}</h2>
            <p>Card #{selectedCard.id}</p>
            {selectedCard.description && (
              <p style={{ fontStyle: 'italic', margin: '10px 0' }}>
                {selectedCard.description}
              </p>
            )}
            <div className="modal-color" style={{ background: selectedCard.color }}>
              Color Theme
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowerCards;
