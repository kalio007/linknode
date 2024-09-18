// llmNode.js
import BaseNode from '../components/BaseNode';
import { Text } from '@chakra-ui/react';
import { Handle, Position } from 'reactflow';

export const AnalyticNode = ({ id, data }) => {

    return (
        <BaseNode
            id={id}
            title="Analytics"
            handles={[
                { type: "target", position: Position.Left, id: `${id}-system` },
                { type: "target", position: Position.Left, id: `${id}-prompt` },
                { type: "source", position: Position.Right, id: `${id}-response` }
            ]}
        >
            <Text>This is a Analytics Node.</Text>
        </BaseNode>
    );
}
