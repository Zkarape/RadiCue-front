import React, { useState, useEffect } from 'react';
import { Button, Paper, TextField, IconButton } from '@mui/material';
import myImage from './imgsforfront/log-out-03.png'
import myLogo from './imgsforfront/logo.png'
// import edit from './imgsforfront/edit.png'
import searchicon from './imgsforfront/search.png'

function TwoColumnPage() {
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  useEffect(() => {
    // Fetch the generated text from the backend (replace with your API call or data source)
    const fetchGeneratedText = async () => {
      try {
        const response = await fetch('/api/generate-text'); // Replace with your API endpoint
        const data = await response.json();
        setGeneratedText(data.text); // Assuming the response contains the generated text in the "text" field
      } catch (error) {
        console.error('Error fetching generated text:', error);
      }
    };

    fetchGeneratedText();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleGenerateButtonClick = async () => {
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST', // Replace with the appropriate HTTP method (GET, POST, etc.)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput, // Assuming the userInput state contains the text you want to send to the backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate text');
      }

      const data = await response.json();
      setGeneratedText(data.text);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div>
      {/* Box above the page */}
      <Paper sx={{ display: 'flex', padding: '5px', backgroundColor: '#576db6', borderRadius: 0, boxShadow: 'none' }}>
        {/* Add content for the box here */}
        <img
          src={myLogo}
          alt="Icon"
          style={{ width: 'auto', height: '60px', marginRight: '900px'}}
        />
        <img
          src={myImage}
          alt="Icon"
          style={{ width: '40px', height: '40px', marginLeft: '350px', marginTop: '10px'}}
        />
      </Paper>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
        {/* Search box with search icon */}
        <div
          style={{
            justifyContent: 'row',
            width: '500px',
            marginTop: '70px',
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '5px',
              backgroundColor: '#e4e4ee',
              borderRadius: '5',
              boxShadow: 'none',
              marginBottom: '10px',
              marginLeft: '40px',
              width: '400px',
            }}
          >
            <TextField
              label="Keywords"
              fullWidth
              border="2px solid #4357a3"
            >
            </TextField>
            <IconButton
              color="primary"
              style={{ backgroundColor: '#e4e4ee', marginTop: "-43px", width: '30px', height: '30px', marginLeft: '350px' }}
            >
              <img
                src={searchicon}
                alt="Icon"
                style={{ width: '30px', height: '30px' }}
              />
            </IconButton>
          </Paper>
          {/* Left column with input box */}
          <Paper sx={{ display: 'flex', flexDirection: 'column', flex: 2, padding: '20px', marginRight: '40px', marginLeft: '40px', marginTop: '365px', height: '485px', borderRadius: 5 }}>
            <TextField
              label="Enter your text here"
              multiline
              rows={15.3}
              fullWidth
              value={userInput}//to go to backend
              onChange={handleUserInputChange}
            />
            <Button variant="contained" type="submit" color="primary" style={{ backgroundColor: '#4357a3', marginTop: "45px", border: '2px solid #4357a3' }} onClick={handleGenerateButtonClick}>
              Generate
            </Button>
          </Paper>
        </div>
        {/* Right column with generated text */}
        <Paper sx={{ flex: 1, padding: '20px', height: '985px', marginBottom: '35px', marginRight: '40px', borderRadius: 5 }}>
          <TextField
            label="Generated Text"
            multiline
            rows={37}
            fullWidth
            variant="outlined"
            value={generatedText}
            disabled
          />
          <Button type="submit" color="primary" style={{ width: "100px", marginTop: "45px", border: '2px solid #576db6', marginRight: '15px', color: "#4357a3" }}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" color="primary" style={{ width: "100px", backgroundColor: '#4357a3', marginTop: "45px", border: '2px solid #4357a3' }}>
            Save
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default TwoColumnPage;