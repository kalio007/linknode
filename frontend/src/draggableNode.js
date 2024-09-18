// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        width: 'auto',             // Adjust the width to be auto
        height: '35px',            // Set a fixed height
        padding: '10px 20px',      // Padding around the content (top/bottom, left/right)
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#38B2AC', 
        justifyContent: 'center',
        flexDirection: 'column',
        boxSizing: 'border-box',   // Ensure padding and height are respected
      }}
      draggable
    >
      <span style={{ color: '#fff', }}>{label}</span>  {/* Bold text */}
    </div>
  );
};
