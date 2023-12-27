import React, { useState, useEffect } from 'react';
import { AuthContext } from '../App';
import  { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function WatchList()
{

    const style={width:"80%", float:"right"
,height:"100vh"
}
const [check,setCheck] = useState(true)
const navigate = useNavigate();

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  const tdStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };
  const tableDiv={

    display:"flex",
    marginTop:'100px'
  }

const [watchLt, setWatchLt] = useState([])
const { isLoggedIn,emaill, login, logout ,mailChange} = useContext(AuthContext);
useEffect(()=>{

    searchWatch()
})
const searchWatch = () => {
    const email= emaill
    const url = `http://127.0.0.1:5000/opers/findall/${email}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWatchLt(data);
     

        
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  };

const test = (e)=>{
const detaile =e.target.previousElementSibling.textContent
const symbole = e.target.previousElementSibling.previousElementSibling.textContent
    alert(detaile + symbole)

    navigate(`/ss/${symbole}/${detaile}`, { state: { symbole, detaile } });




}


  

return(

<div style={style}>

<div style={{maxWidth:"500px"}}><h1>WatchList</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Symbol</th>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Click</th>
              
             
            </tr>
          </thead>
          <tbody>
          {Array.isArray(watchLt) && watchLt.length > 0 ? (
  watchLt.map((loser) => {
    try {
      return (
        <tr key={loser.ide}>
          <td style={tdStyle}>{loser.company}</td>
          <td style={tdStyle}>{loser.timeDetail}</td>
          <td style={tdStyle} key={loser.ide} onClick={test}>
            goto..
          </td>
        </tr>
      );
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle the error or provide a fallback UI
      return null; // Optional: Return a fallback UI element
    }
  })
) : (
  <tr>
    <td colSpan={3}>No Data here</td>
  </tr>
)}

</tbody>
        </table></div>




</div>


)


}

export default WatchList;