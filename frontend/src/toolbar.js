// toolbar.js

import AddNode from './components/AddNode';
import ToggleButton from './components/ToggleButton';
import { DraggableNode } from './draggableNode';

const toolbarItems = [
    { type: 'customInput', label: 'Input' },
    { type: 'llm', label: 'LLM' },
    { type: 'customOutput', label: 'Output' },
    { type: 'text', label: 'Text' },
    { type: 'storage', label: 'Storage' },
    { type: 'data', label: 'Data' },
    { type: 'analytics', label: 'Analytic' },
    { type: 'notification', label: 'Nofitcation' },
    { type: 'transform', label: 'Transform' },

];

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: "40%" }}>
                {toolbarItems.map((item) => (
                    <DraggableNode key={item.type} type={item.type} label={item.label} />
                ))}
                <AddNode />
            </div>
            <div style={{ marginTop: '20px' }}>
                <ToggleButton />
            </div>
        </div>
    );
};
