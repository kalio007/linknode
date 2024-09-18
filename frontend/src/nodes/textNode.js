import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Textarea, Text, useColorMode } from '@chakra-ui/react';
import BaseNode from '../components/BaseNode';

export const TextNode = ({ id, data }) => {
  const { colorMode } = useColorMode();

  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 80 });
  const [handlePositions, setHandlePositions] = useState([]);
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);

    // Regex to find all occurrences of {{input}} in the text
    const regex = /{{\s*\w+\s*}}/g;
    const matches = text.match(regex);

    if (matches) {
      const positions = matches.map((_, index) => {
        const relativePosition = ((index + 1) / (matches.length + 1)) * 100;
        return relativePosition;
      });
      setHandlePositions(positions);
    } else {
      setHandlePositions([]);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scroll height

      // Update node size based on textarea size
      const newHeight = textareaRef.current.scrollHeight + 60; // Add padding
      const newWidth = Math.max(200, currText.length > 50 ? 300 : 200); // Change width if length > 50 characters

      setNodeSize({
        width: newWidth,
        height: newHeight
      });
    }
  }, [currText]);

  return (
    <Box
      width={`${nodeSize.width}px`}
      height={`${nodeSize.height}px`}
      border="1px solid black"
      padding="10px"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      overflow="hidden"
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
    >
      <Text fontWeight="bold" mb={2}>
        Text
      </Text>
      <Textarea
        padding={1}
        ref={textareaRef}
        size="sm"
        placeholder="Enter text"
        value={currText}
        onChange={handleTextChange}
        resize="none"
        rows={1}
        overflow="hidden"
      />

      {handlePositions.map((position, index) => (
        <Handle
          key={`${id}-input-${index}`}
          type="source"
          position={Position.Left}
          id={`${id}-input-${index}`}
          style={{ top: `${position}%` }}
        />
      ))}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />
    </Box>
  );
};
