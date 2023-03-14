import React, { useState } from 'react';
import './LinkForm.css'

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
  <div className='container'>

<center>
       <h2>Review Hub</h2>
<form onSubmit={handleSubmit}>
      <label>
       <h3>Insert links to pages with reviews here </h3>
        <input type="text" name="linkInput" />
      
      {links.map((link) => (
        <div key={link}>
          <a href={link}>{link}</a>
        </div>
      ))}
        <div className='design'>
        <h4>Customer pains:</h4> <br></br>
      <h5>Questions:</h5> 
      <h6>Ideas:</h6>
        </div>
      <button type='submit'>START</button>
      </label>
     
    </form>
   </center>
  </div>
  );
}

export default LinkForm;
