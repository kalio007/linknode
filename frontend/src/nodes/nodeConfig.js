// nodeConfig.js
export const nodeConfig = [
    {
        type: 'llm',
        title: 'LLM',
        handles: [
            { type: 'target', position: 'left', id: 'system', style: { top: '33%' } },
            { type: 'target', position: 'left', id: 'prompt', style: { top: '67%' } },
            { type: 'source', position: 'right', id: 'response' }
        ],
        style: { backgroundColor: '#f0f0f0' },
        content: (data) => (
            <div>
                <span>{data.description || 'This is an LLM.'}</span>
            </div>
        )
    },
    {
        type: 'output',
        title: 'Output',
        handles: [
            { type: 'target', position: 'left', id: 'value' }
        ],
        style: { backgroundColor: '#e0e0e0' },
        content: (data) => (
            <div>
                <label>
                    Name:
                    <input type="text" value={data.name || ''} onChange={data.onNameChange} />
                </label>
                <label>
                    Type:
                    <select value={data.type || 'Text'} onChange={data.onTypeChange}>
                        <option value="Text">Text</option>
                        <option value="File">Image</option>
                    </select>
                </label>
            </div>
        )
    },
];
