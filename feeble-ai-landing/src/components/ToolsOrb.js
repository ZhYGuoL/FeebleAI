import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { toolsData } from "../assets/images";

const OrbContainer = styled.div`
  width: 120%;
  max-width: none;
  height: 600px;
  margin: 0;
  position: relative;
  overflow: visible;
  margin-left: -15%;
  margin-right: -15%;
  margin-bottom: -100px;

  @media (max-width: 768px) {
    height: 600px;
    width: 100%;
    margin-left: 0;
    margin-bottom: -50px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
      ${(props) => (props.hovered ? "scale(1.2)" : "scale(1)")};
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: all 0.4s ease;
    z-index: -1;
    opacity: ${(props) => (props.hovered ? 1 : 0.7)};
    box-shadow: ${(props) =>
      props.hovered ? "0 0 12px 3px rgba(255, 255, 255, 0.6)" : "none"};
  }
`;

const ToolImageContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  transform: ${(props) => (props.hovered ? "scale(1.05)" : "scale(1)")};
  cursor: pointer;
  position: relative;
  z-index: 1;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1),
    -6px -6px 12px rgba(255, 255, 255, 0.8),
    inset 2px 2px 4px rgba(255, 255, 255, 0.9),
    inset -2px -2px 4px rgba(0, 0, 0, 0.05);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    border-radius: 50%;
    background: transparent;
    border: 1px solid
      rgba(255, 255, 255, ${(props) => (props.hovered ? 0.9 : 0.6)});
    transition: all 0.3s ease;
    z-index: -1;
  }

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    transition: transform 0.3s ease;
    transform: ${(props) => (props.hovered ? "scale(1.05)" : "scale(1)")};
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

  // Calculate initial position on a sphere with constraints to prevent extending too far left
  useEffect(() => {
    const phi = Math.acos(-1 + (2 * index) / totalNodes);
    const theta = Math.sqrt(totalNodes * Math.PI) * phi;

    // Restore original radius for proper orbit rotation
    const radius = 2.8;
    let x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    // Center the orbit horizontally
    x += 0.3;

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

    // Apply rotation with constraints
    const x = rotation[0] * Math.cos(time) - rotation[2] * Math.sin(time);
    const z = rotation[0] * Math.sin(time) + rotation[2] * Math.sin(time);

    // Restore original y rotation calculation
    const y = rotation[1];

    // Apply position with constraints to prevent going too far in any direction
    // Constrain x position to stay within bounds
    const constrainedX = Math.max(-2.5, Math.min(2.5, x + 0.3));
    // Constrain y position to stay within bounds but allow more movement
    const constrainedY = Math.max(-2.5, Math.min(2.5, y));

    meshRef.current.position.x = constrainedX;
    meshRef.current.position.y = constrainedY;
    meshRef.current.position.z = z;

    // Calculate scale based on z position with improved scaling logic
    // When z is closer to the camera (larger value), make the tool smaller
    const distanceFromCamera = 9 - z; // Camera is at z=9

    // New scaling logic:
    // - Tools close to camera (small distance) will be scaled down more aggressively
    // - Tools far from camera maintain their normal size
    let newScale = 0.85; // Keep the smaller scale for better appearance

    if (distanceFromCamera < 6) {
      // Far from camera - maintain smaller size (0.75-0.85)
      newScale = Math.max(
        0.75,
        Math.min(0.85, 0.85 - (distanceFromCamera - 5) * 0.02)
      );
    } else {
      // Close to camera - scale down more aggressively (0.6-0.75)
      newScale = Math.max(0.6, 0.75 - (distanceFromCamera - 6) * 0.1);
    }

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
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#FFFFFF" : "#F8F8F8"}
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
      <Canvas camera={{ position: [0.3, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <group position={[0.3, 0, 0]}>
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

      {/* Temporarily commented out descriptions */}
      {/* <Descriptions activeNodes={activeNodes} /> */}
    </OrbContainer>
  );
};

export default ToolsOrb;
