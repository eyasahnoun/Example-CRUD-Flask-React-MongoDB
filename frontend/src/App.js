import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [newItemName, setNewItemName] = useState('');
  const [newName, setNewName] = useState('');
  const [items, setItems] = useState([

  ]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createItem = async () => {
    try {
      await axios.post('http://localhost:5000/items', { name: newItemName });
      getItems();
      setNewItemName('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/items/${itemId}`);
      getItems();
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (itemId, newName) => {
    try {
      await axios.put(`http://localhost:5000/items/${itemId}`, { name: newName });
      getItems();
      setNewName('');
    } catch (error) {
      console.error(error);
    }
    setItems((prevItems) =>
    prevItems.map((item) =>
      item._id === itemId ? { ...item, name: newName } : item
    )
  );
  // Réinitialiser la valeur de newName pour cet élément à une chaîne vide
  setNewName((prevNewNames) => ({ ...prevNewNames, [itemId]: '' }));
};

const handleInputChange = (itemId, value) => {
  setNewName((prevNewNames) => ({ ...prevNewNames, [itemId]: value }));
};
  

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
          </li>
        ))}
      </ul>


      <h2>Ajouter un nouvel élément</h2>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      />
      <button onClick={createItem}>Ajouter</button>

      <h2>Modifier un élément</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
           <div>{item.name}</div> 
            <input
              type="text"
              value={newName[item._id] || ''}
              onChange={(e) => handleInputChange(item._id, e.target.value)}
            />
            <button onClick={() => updateItem(item._id,newName[item._id])}>Mettre à jour</button>
          </li>
        ))}
      </ul>

      <h2>supprimer un élément</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
           <div>{item.name}</div> 
            <button onClick={() => deleteItem(item._id)}>Supprimer</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;
