import React, { useState, useCallback } from "react";
import ReactFlow, { addEdge, Background, Controls } from "react-flow-renderer";
import axios from "axios";

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

  const addNode = (type) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: type },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveFlowchart = async () => {
    const flowchartData = { nodes, edges };
    try {
      await axios.post("http://localhost:5000/api/flowchart", flowchartData);
      alert("Flowchart saved successfully!");
    } catch (error) {
      console.error("Error saving flowchart:", error);
    }
  };

  const onNodeClick = useCallback((event, node) => {
    const confirmDelete = window.confirm(`Delete node ${node.data.label}?`);
    if (confirmDelete) {
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((edge) => edge.source !== node.id && edge.target !== node.id));
    }
  }, []);
  

  return (
    <div style={{ height: "100vh" }}>
      <div>
        <button onClick={() => addNode("Cold Email")}>Add Cold Email</button>
        <button onClick={() => addNode("Wait/Delay")}>Add Wait/Delay</button>
        <button onClick={() => addNode("Lead Source")}>Add Lead Source</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
      <button onClick={saveFlowchart}>Save Flowchart</button>
    </div>
  );
};

export default FlowChart;
