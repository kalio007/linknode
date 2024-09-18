import React, { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, IconButton } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const AddNode = ({ onCreateNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nodeType, setNodeType] = useState('input');
    const [nodeTitle, setNodeTitle] = useState('');
    const [nodeData, setNodeData] = useState('');
    const [nodeName, setNodeName] = useState('');
    const [selectedFields, setSelectedFields] = useState([]); // State to track selected input types

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setNodeTitle('');
        setNodeData('');
        setNodeName('');
        setSelectedFields([]); // Reset selected fields on close
    };

    const handleFieldSelection = (fieldType) => {
        if (!selectedFields.includes(fieldType)) {
            setSelectedFields([...selectedFields, fieldType]);
        }
    };

    const handleRemoveField = (fieldType) => {
        setSelectedFields(selectedFields.filter((field) => field !== fieldType));
    };

    const handleSubmit = () => {
        const newNode = {
            id: uuidv4(),
            type: nodeType,
            data: { title: nodeTitle, data: nodeData, name: nodeName }
        };
        onCreateNode(newNode);
        handleClose();
    };

    return (
        <div>
            <Button onClick={handleOpen} leftIcon={<AddIcon />} colorScheme="blue" variant='outline' height="35px">
                Add Node
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Node</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Node Name Input */}
                        <FormControl id="node-name" mb={4}>
                            <FormLabel>Node Name</FormLabel>
                            <Input
                                placeholder="Enter a node name"
                                value={nodeName}
                                onChange={(e) => setNodeName(e.target.value)}
                            />
                        </FormControl>

                        <p>Select input fields:</p>
                        <div style={{ marginBottom: '20px' }}>
                            <Button onClick={() => handleFieldSelection('name')} colorScheme="blue" mr={2} leftIcon={<AddIcon />}>Name</Button>
                            <Button onClick={() => handleFieldSelection('text')} colorScheme="blue" mr={2} leftIcon={<AddIcon />}>Text</Button>
                            <Button onClick={() => handleFieldSelection('select')} colorScheme="green" leftIcon={<AddIcon />}>Type</Button>
                        </div>

                        {/* Conditionally render the Name field */}
                        {selectedFields.includes('name') && (
                            <FormControl id="node-name-field" mb={4} display="flex" alignItems="center">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder="Enter name"
                                    value={nodeName}
                                    onChange={(e) => setNodeName(e.target.value)}
                                />
                                <IconButton
                                    aria-label="Remove name field"
                                    icon={<MinusIcon />}
                                    colorScheme="red"
                                    onClick={() => handleRemoveField('name')}
                                    ml={2}
                                />
                            </FormControl>
                        )}

                        {/* Conditionally render the Text field */}
                        {selectedFields.includes('text') && (
                            <FormControl id="node-text-field" mb={4} display="flex" alignItems="center">
                                <FormLabel>Text</FormLabel>
                                <Input
                                    placeholder="Enter text"
                                    value={nodeData}
                                    onChange={(e) => setNodeData(e.target.value)}
                                />
                                <IconButton
                                    aria-label="Remove text field"
                                    icon={<MinusIcon />}
                                    colorScheme="red"
                                    onClick={() => handleRemoveField('text')}
                                    ml={2}
                                />
                            </FormControl>
                        )}

                        {/* Conditionally render the Select Options (Type) field */}
                        {selectedFields.includes('select') && (
                            <FormControl id="node-select-field" mb={4} display="flex" alignItems="center">
                                <FormLabel>Type</FormLabel>
                                <Select onChange={(e) => setNodeData(e.target.value)} placeholder="Select an option">
                                    <option value="image">Image</option>
                                    <option value="text">Text</option>
                                </Select>
                                <IconButton
                                    aria-label="Remove select field"
                                    icon={<MinusIcon />}
                                    colorScheme="red"
                                    onClick={() => handleRemoveField('select')}
                                    ml={2}
                                />
                            </FormControl>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSubmit} variant='outline'>
                            Create Node
                        </Button>
                        <Button variant="ghost" onClick={handleClose} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddNode;
