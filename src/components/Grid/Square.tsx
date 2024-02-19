import React, { useState } from 'react';

interface SquareProps {
    value: string | null;
    col: number;
  }

const Square: React.FC<SquareProps> = ({ value, col }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        ...colContainer,
        ...(isHovered ? { backgroundColor: 'lightblue' } : null),
      }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => { handleClick(col); }}
        >
        {value && (<img src={`../src/assets/${value}.svg`} alt={value} />)}
        </Box>
  );
};

export default Square;