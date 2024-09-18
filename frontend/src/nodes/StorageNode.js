// llmNode.js
import BaseNode from '../components/BaseNode';
import { Text } from '@chakra-ui/react';
import { Handle, Position } from 'reactflow';

export const StorageNode = ({ id, data }) => {

    return (
        <BaseNode
            id={id}
            title="Storage"
            handles={[
                { type: "target", position: Position.Left, id: `${id}-system` },
                { type: "target", position: Position.Left, id: `${id}-prompt` },
                { type: "source", position: Position.Right, id: `${id}-response` }
            ]}
        >
            <Text>This is a Storage.</Text>
        </BaseNode>
    );
}
