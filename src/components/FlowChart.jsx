import React, { useState, useCallback } from "react";
import ReactFlow, { addEdge, Background, Controls } from "react-flow-renderer";

const initialNodes = [
  { id: "1", data: { label: "Start" }, position: { x: 250, y: 5 } },
];

const FlowChart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => nds.map((node) => ({ ...node, ...changes })));
  }, []);

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => addEdge(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
