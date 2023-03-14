import React, { useState } from 'react';

function LinkForm() {
  const [links, setLinks] = useState([]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const linkInput = event.target.elements.linkInput;
    const response = await fetch('http://localhost:3001/api/process-links', {
      method: 'POST',
      body: JSON.stringify({ links: linkInput.value }),
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    setLinks(result.links);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Paste links here:
        <input type="text" name="linkInput" />
      </label>
      <button type="submit">Submit</button>
      {links.map((link) => (
        <div key={link}>
          <a href={link}>{link}</a>
        </div>
      ))}
    </form>
  );
}

export default LinkForm;
