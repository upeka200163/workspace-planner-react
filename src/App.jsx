import React, { useState } from 'react';
import './App.css';

function App() {
  const [headings, setHeadings] = useState([]);
  const [newHeading, setNewHeading] = useState('');

  const addHeading = () => {
    if (!newHeading.trim()) return;
    const headingObject = {
      id: Date.now(),
      title: newHeading,
      items: [],
      itemInput: ''
    };
    setHeadings([...headings, headingObject]);
    setNewHeading('');
  };

  const deleteHeading = (headingId) => {
    setHeadings(headings.filter(h => h.id !== headingId));
  };

  const handleItemInputChange = (headingId, value) => {
    setHeadings(headings.map(h => h.id === headingId ? { ...h, itemInput: value } : h));
  };

  const addItem = (headingId) => {
    setHeadings(headings.map(h => {
      if (h.id === headingId) {
        if (!h.itemInput.trim()) return h;
        return {
          ...h,
          items: [...h.items, { id: Date.now(), text: h.itemInput }],
          itemInput: ''
        };
      }
      return h;
    }));
  };

  const deleteItem = (headingId, itemId) => {
    setHeadings(headings.map(h => {
      if (h.id === headingId) {
        return {
          ...h,
          items: h.items.filter(item => item.id !== itemId)
        };
      }
      return h;
    }));
  };

  return (
    <div className="app-container">
      {/* 1. Cyberpunk Grid Overlay Line System */}
      <div className="tech-grid-overlay"></div>

      {/* 2. Glowing Neon Background Orbs */}
      <div className="neon-orb orb-cyan"></div>
      <div className="neon-orb orb-purple"></div>
      <div className="neon-orb orb-pink"></div>

      {/* 3. Floating 3D Emojis with Ambient Shadows */}
      <div className="floating-tech-icon element-1">✏️</div>
      <div className="floating-tech-icon element-2">📅</div>
      <div className="floating-tech-icon element-3">✅</div>
      <div className="floating-tech-icon element-4">🔭</div>

      {/* Central Interface Card */}
      <div className="todo-box">
        {/* Header Section */}
        <div className="todo-header">
          <h1 className="main-title">Workspace Planner</h1>
          <p className="sub-title">Organize your tasks neatly into categories</p>
        </div>
        
        {/* Input Bar */}
        <div className="heading-input-container">
          <input
            type="text"
            placeholder="e.g., Projects, Daily Routine..."
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHeading()}
          />
          <button className="btn-add-heading" onClick={addHeading}>
            Create Category
          </button>
        </div>

        {/* Categories List */}
        <div className="headings-list">
          {headings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No categories yet</h3>
              <p>Add a new heading above to start organizing your list.</p>
            </div>
          ) : (
            headings.map((h) => (
              <div key={h.id} className="heading-card">
                <div className="heading-header">
                  <div className="title-badge-group">
                    <h2>{h.title}</h2>
                    <span className="task-count">
                      {h.items.length} {h.items.length === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>
                  <button className="btn-delete-heading" onClick={() => deleteHeading(h.id)}>
                    Remove
                  </button>
                </div>
                
                <div className="item-input-container">
                  <input
                    type="text"
                    placeholder="Add a new item to this list..."
                    value={h.itemInput || ''}
                    onChange={(e) => handleItemInputChange(h.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addItem(h.id)}
                  />
                  <button className="btn-add-item" onClick={() => addItem(h.id)}>
                    Add Task
                  </button>
                </div>

                <ul className="items-list">
                  {h.items.map((item) => (
                    <li key={item.id} className="item-row">
                      <div className="item-content">
                        <span className="bullet-point"></span>
                        <span>{item.text}</span>
                      </div>
                      <button className="btn-delete-item" onClick={() => deleteItem(h.id, item.id)}>
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;