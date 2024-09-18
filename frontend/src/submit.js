import { Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react";
import axios from 'axios';
import { useState, } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useDisclosure } from "@chakra-ui/react";
import SuccessDialog from './components/SuccessDialog';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = ({ }) => {
    const {
        nodes,
        edges,
    } = useStore(selector, shallow);

    //would save this in state and submit it to the backend 
    // console.log("Number of nodes:", nodes.length);
    // console.log("Number of nodes:", edges.length);

    const data = `${nodes.length},${edges.length}`;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const url = process.env.REACT_APP_BACKEND_URL;

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        setResponseData(null);

        try {
            const formData = new URLSearchParams();
            console.log(data);

            formData.append('pipeline', data);

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const { num_nodes, num_edges, is_dag } = response.data;

            console.log("================================================")
            console.log(num_nodes, num_edges)

            setResponseData({ num_nodes, num_edges, is_dag });
            onOpen();
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while submitting the request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onClick={handleClick}
                isLoading={loading}
                loadingText="Submitting"
                colorScheme="teal"
                fontWeight="bold"
            >
                Submit
            </Button>

            {error && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Submission Failed!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError(null)} />
                </Alert>
            )}
            <SuccessDialog isOpen={isOpen} onClose={onClose} responseData={responseData} />
        </div>
    );
};
