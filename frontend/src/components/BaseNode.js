// BaseNode.js

import { Box, Text, useColorMode } from '@chakra-ui/react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ id, title, children, handles }) => {
    const { colorMode } = useColorMode();
    return (
        <Box
            minWidth="200px"
            minHeight="auto"
            border="1px solid"
            borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
            borderRadius="md"
            padding="10px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            overflow="hidden"
            bg={colorMode === 'dark' ? 'gray.700' : 'white'}
        >
            <Text fontWeight="bold" mb={2}>
                {title}
            </Text>
            {children}
            {handles.map(({ type, position, id }) => (
                <Handle
                    key={id}
                    type={type}
                    position={position}
                    id={id}
                    style={{ top: `${100 / 3}%` }}
                />
            ))}
        </Box>
    );
};

export default BaseNode;
