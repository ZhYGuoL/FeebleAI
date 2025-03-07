import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { toolsData } from "../assets/images";

const OrbContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  overflow: visible;

  @media (max-width: 768px) {
    height: 500px;
  }
`;

// Move this outside the Canvas to avoid Three.js conflicts
const ToolDescription = styled.div`
  background-color: rgba(10, 10, 15, 0.75);
  color: white;
  padding: 12px 15px;
  border-radius: 12px;
  width: 180px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-out;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transform: scale(${(props) => props.scale || 1}) translateX(-10px);
  transform-origin: right center;

  h3 {
    margin: 0 0 6px;
    color: var(--primary);
    font-size: 0.75rem;
    font-weight: 600;
    text-align: right;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 6px;
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    font-size: 0.68rem;
    line-height: 1.4;
    text-align: left;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ToolImageWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 214, 51, 0) 0%,
      rgba(255, 214, 51, 0) 50%,
      rgba(255, 214, 51, 0) 100%
    );
    transition: all 0.4s ease;
    z-index: -1;
    opacity: ${(props) => (props.hovered ? 1 : 0)};
    transform: scale(${(props) => (props.hovered ? 1.5 : 1)});
    box-shadow: ${(props) =>
      props.hovered ? "0 0 20px 5px rgba(255, 214, 51, 0.6)" : "none"};
  }
`;

const ToolImageContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: ${(props) => (props.hovered ? "scale(1.1)" : "scale(1)")};
  cursor: pointer;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: transparent;
    border: 2px solid
      rgba(255, 214, 51, ${(props) => (props.hovered ? 0.8 : 0)});
    transition: all 0.3s ease;
    z-index: -1;
  }

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    transition: transform 0.3s ease;
    transform: ${(props) => (props.hovered ? "scale(1.1)" : "scale(1)")};
  }
`;

// Wrapper for the description to prevent it from being cut off
const DescriptionWrapper = styled.div`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 2000;
  pointer-events: none;
`;

// Store active node information
const useToolNodeStore = () => {
  const [activeNodes, setActiveNodes] = useState({});

  const registerNode = (id, rect) => {
    setActiveNodes((prev) => ({
      ...prev,
      [id]: { rect, active: true },
    }));
  };

  const unregisterNode = (id) => {
    setActiveNodes((prev) => {
      const newState = { ...prev };
      if (newState[id]) {
        newState[id] = { ...newState[id], active: false };
      }
      return newState;
    });

    // Clean up after animation completes - reduced from 500ms to 300ms
    setTimeout(() => {
      setActiveNodes((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 300);
  };

  return { activeNodes, registerNode, unregisterNode };
};

const ToolNode = ({
  position,
  tool,
  index,
  totalNodes,
  registerNode,
  unregisterNode,
}) => {
  const meshRef = useRef();
  const nodeRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState(1);
  const timeoutRef = useRef(null);

  // Calculate initial position on a sphere
  useEffect(() => {
    const phi = Math.acos(-1 + (2 * index) / totalNodes);
    const theta = Math.sqrt(totalNodes * Math.PI) * phi;
    const x = 3 * Math.cos(theta) * Math.sin(phi);
    const y = 3 * Math.sin(theta) * Math.sin(phi);
    const z = 3 * Math.cos(phi);

    meshRef.current.position.set(x, y, z);
    setRotation([x, y, z]);
  }, [index, totalNodes]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Rotate around the center but don't rotate the mesh itself
  // Also calculate scale based on z position (distance from camera)
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.1;
    const x = rotation[0] * Math.cos(time) - rotation[2] * Math.sin(time);
    const z = rotation[0] * Math.sin(time) + rotation[2] * Math.sin(time);

    meshRef.current.position.x = x;
    meshRef.current.position.z = z;

    // Calculate scale based on z position
    // When z is closer to the camera (larger value), make the description smaller
    const distanceFromCamera = 8 - z; // Camera is at z=8
    // Increase the minimum scale to 0.85 (was 0.7)
    const newScale = Math.max(
      0.85,
      Math.min(1, 1 - (distanceFromCamera - 5) * 0.05)
    );
    setScale(newScale);

    // Update description position if node is hovered
    if (hovered && nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      registerNode(tool.name, {
        rect,
        scale: newScale,
      });
    }
  });

  // Handle hover with debounce to prevent flickering
  const handleMouseEnter = () => {
    setHovered(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Update position immediately on hover
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      registerNode(tool.name, {
        rect,
        scale,
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);

    // Set a timeout to hide the description - reduced from 500ms to 300ms
    timeoutRef.current = setTimeout(() => {
      unregisterNode(tool.name);
    }, 300);
  };

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#FFD633" : "#FFFFFF"}
        transparent
        opacity={0}
      />

      {/* Tool image in HTML element */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={10}
        zIndexRange={[100, 0]}
        pointerEvents="all"
        transform
        key={`tool-${tool.name}`}
      >
        <div ref={nodeRef}>
          <ToolImageWrapper hovered={hovered}>
            <ToolImageContainer
              hovered={hovered}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              data-tool={tool.name}
            >
              <img src={tool.logo} alt={tool.name} />
            </ToolImageContainer>
          </ToolImageWrapper>
        </div>
      </Html>
    </mesh>
  );
};

// Component to render all active descriptions
const Descriptions = ({ activeNodes }) => {
  return Object.entries(activeNodes).map(([id, data]) => {
    if (!data.active || !data.rect) return null;

    const tool = toolsData.find((t) => t.name === id);
    if (!tool) return null;

    return (
      <DescriptionWrapper
        key={id}
        top={data.rect.rect.top + data.rect.rect.height / 2}
        left={data.rect.rect.left - 10}
      >
        <ToolDescription visible={true} scale={data.rect.scale}>
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>
        </ToolDescription>
      </DescriptionWrapper>
    );
  });
};

const ToolsOrb = () => {
  const { activeNodes, registerNode, unregisterNode } = useToolNodeStore();

  return (
    <OrbContainer>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <group>
          {toolsData.map((tool, index) => (
            <ToolNode
              key={tool.name}
              tool={tool}
              index={index}
              totalNodes={toolsData.length}
              registerNode={registerNode}
              unregisterNode={unregisterNode}
            />
          ))}
        </group>
      </Canvas>

      {/* Render descriptions outside the Canvas */}
      <Descriptions activeNodes={activeNodes} />
    </OrbContainer>
  );
};

export default ToolsOrb;
