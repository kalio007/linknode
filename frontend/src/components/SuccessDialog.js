import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";

const SuccessDialog = ({ isOpen, onClose, responseData }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pipeline Submitted Successfully</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div>
                        <p><strong>Number of nodes:</strong> {responseData?.num_nodes}</p>
                        <p><strong>Number of edges:</strong> {responseData?.num_edges}</p>
                        <p><strong>Is DAG:</strong> {responseData?.is_dag ? "Yes" : "No"}</p>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose} variant='outline'>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SuccessDialog;
