import { useState } from 'react';
import './FlowerCards.css';

const FlowerCards = ({ onLogout }) => {
  const flowerTypes = [
    { name: 'Rose', emoji: '🌹', color: '#ff6b9d' },
    { name: 'Sunflower', emoji: '🌻', color: '#ffd93d' },
    { name: 'Tulip', emoji: '🌷', color: '#ff6b9d' },
    { name: 'Cherry Blossom', emoji: '🌸', color: '#ffb7c5' },
    { name: 'Hibiscus', emoji: '🌺', color: '#ff1744' },
    { name: 'Blossom', emoji: '🌼', color: '#fff176' },
    { name: 'Lotus', emoji: '💮', color: '#f8bbd0' },
    { name: 'Bouquet', emoji: '💐', color: '#ff4081' },
    { name: 'Daisy', emoji: '🌼', color: '#ffeb3b' },
    { name: 'Lily', emoji: '🌷', color: '#e91e63' }
  ];

  // Generate 100 cards (20 rows × 5 columns)
  const generateCards = () => {
    const cards = [];
    for (let i = 0; i < 100; i++) {
      const flower = flowerTypes[i % flowerTypes.length];
      cards.push({
        id: i + 1,
        ...flower
      });
    }
    return cards;
  };

  const [cards] = useState(generateCards());
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="flower-cards-container">
      <header className="flower-header">
        <h1>🌸 My Flower Cards Gallery</h1>
        <button onClick={onLogout} className="logout-button">
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
