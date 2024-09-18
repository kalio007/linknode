import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from '../components/BaseNode';
import { Text, Box, Select, Input } from '@chakra-ui/react';

export const TransformNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
    const [inputType, setInputType] = useState(data.inputType || 'Text');


    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    const handleTypeChange = (e) => {
        setInputType(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="Input"
            handles={[
                { type: "source", position: Position.Right, id: `${id}-value` }
            ]}
        >
            <Box>
                <label>
                    Name:
                    <Input
                        type="text"
                        value={currName}
                        onChange={handleNameChange}
                    />
                </label>
                <label>
                    Type:
                    <Select value={inputType} onChange={handleTypeChange}>
                        <option value="Text">Text</option>
                        <option value="File">File</option>
                    </Select>
                </label>
            </Box>
        </BaseNode>
    );
}
