import './App.css';
// import { Link } from 'react-router-dom';
import React, { useState} from 'react';
import user from "./user.png";
import user_preview from "./user_removebg-preview.png";
import arrow from "./white_arrow.png";

function App() {
  const [image, setImage] = useState(null)
  const [bgremove, setBgremove] = useState(null)


  const handleChangebg = () => {
    const apikey = "s2JHbGQJbMu3ocTSrkk6VMvq"
    const url = "https://api.remove.bg/v1.0/removebg"
    const formData = new FormData()
    formData.append("image-file", image, image.name)
    formData.append("size", "auto")

    fetch(url, {
      method: "POST",
      headers: {
        'X-Api-Key': apikey,
      },
      body : formData
    }).then((res)=>res.blob()).then((blob)=>{
      const reader = new FileReader();
      reader.onloadend = () =>setBgremove(reader.result)
      reader.readAsDataUrl(blob);
    }).catch((error)=>console.error(error))
  
  }
  return (
    <div className="Home">
      <center id='Header'>
        Image Background Remover
      </center>
      <div className='main-div'>
        <div className='preview'>
          <img src={user} alt='user'></img>
          <img id='arrow' src={arrow} alt='user'></img>
          <img src={user_preview} alt='user'></img>
        </div>
        <div className='app'>
        <center id="message">Remove Background of your image for FREE!!!</center>
            <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
              <br></br>
            <button onClick={handleChangebg} type='submit'>Remove</button>
        </div>
        <div>
          {
            bgremove && <img src={bgremove} alt="without background" ></img>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
