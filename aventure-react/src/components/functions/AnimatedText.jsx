import React, { useEffect, useState } from 'react';

const AnimatedText = ({text, ms}) => {
    const [displayedText, setDisplayedText] = useState("");
    
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const writeText = async (text, delayMs = 100) => {
      for (let i = 0 ; i < text.length ; i++) {
        setDisplayedText(text.slice(0,i+1));
        await delay(delayMs);
      }
    }

    useEffect(() => {
        const animateText = async () => {
            await writeText(text, ms);
        }
        animateText();
    }, [text])

    return (
        <p>{displayedText}</p>
    );
};

export default AnimatedText;