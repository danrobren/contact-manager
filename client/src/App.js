import React, { useState, useEffect } from "react"
import './App.css';
import Header from "./components/Header"
import AddContact from "./components/AddContact"
import ContactList from "./components/ContactList"

function App() {
  const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState([])
  const x = 1

  const addContactHandler = (contact) => {
	  console.log(contact)
	  setContacts([...contacts, contact])
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))  
    if(retriveContacts) {
      setContacts(retriveContacts)
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  },[contacts])

  const postContact = (contact) => {
    fetch('/post-contact', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const getContact = async () => {
    const response = await fetch('/get-contact');
    const body = await response.json();
    console.log(body);
  }

  return (
    <div className="ui container">
    	<Header />
    	<AddContact addContactHandler={addContactHandler}/>
    	<ContactList contacts={contacts}/>
      <button onClick={() => postContact({test: {email: 'a@b.ca', phone: '2509832323'}})}>
        Save to Backend
      </button>
      <button onClick={() => getContact()}>
        Get from Backend
      </button>
    </div>
  );
}

export default App;