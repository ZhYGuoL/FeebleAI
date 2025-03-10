import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { toolsData } from "../assets/images";

const OrbContainer = styled.div`
  width: 120%; /* Increased from 100% to 120% to make it wider */
  max-width: 120%; /* Increased from 100% to 120% */
  height: 650px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  margin-left: -10%; /* Added negative margin to extend beyond container */
  margin-right: -10%; /* Added negative margin to extend beyond container */
  margin-bottom: -170px;
  margin-top: -70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10; /* Added z-index to ensure it's above hero text */

  /* Added new breakpoint at 1200px to match Hero container */
  @media (max-width: 1200px) {
    width: 110%; /* Increased from 100% to 110% */
    max-width: 110%; /* Increased from 100% to 110% */
    height: 600px;
    margin-left: -5%; /* Added negative margin to extend beyond container */
    margin-right: -5%; /* Added negative margin to extend beyond container */
    margin-bottom: -120px;
    margin-top: -40px;
  }

  @media (max-width: 992px) {
    width: 105%; /* Increased from 100% to 105% */
    max-width: 105%; /* Increased from 100% to 105% */
    height: 550px;
    margin-left: -2.5%; /* Added negative margin to extend beyond container */
    margin-right: -2.5%; /* Added negative margin to extend beyond container */
    margin-bottom: -100px;
    margin-top: -30px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 500px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: -80px;
    margin-top: -20px;
  }

  @media (max-width: 480px) {
    height: 450px;
    margin-bottom: -60px;
  }
`;

// Add a new styled component for the canvas wrapper
const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* Added z-index to ensure it's above hero text */

  /* Ensure the canvas doesn't overflow on smaller screens */
  canvas {
    width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
    object-fit: contain;
    z-index: 10; /* Added z-index to ensure canvas is above hero text */
  }
`;

// Move this outside the Canvas to avoid Three.js conflicts
const ToolDescription = styled.div`
  background-color: rgba(10, 10, 15, 0.75);
  color: white;
  padding: 12px 15px;
  border-radius: 12px;
  width: 180px;
  max-width: 180px;
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
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-wrap: break-word;

  @media (max-width: 768px) {
    width: 160px;
    max-width: 160px;
    padding: 10px 12px;
    transform: scale(${(props) => props.scale || 1}) translateX(-5px);
  }

  @media (max-width: 480px) {
    width: 140px;
    max-width: 140px;
    padding: 8px 10px;
    transform: scale(${(props) => props.scale || 1}) translateX(0);
  }

  h3 {
    margin: 0 0 6px;
    color: var(--primary);
    font-size: 0.75rem;
    font-weight: 600;
    text-align: right;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 6px;
    letter-spacing: 0.5px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 480px) {
      font-size: 0.7rem;
      padding-bottom: 4px;
      margin-bottom: 4px;
    }
  }

  p {
    margin: 0;
    font-size: 0.68rem;
    line-height: 1.4;
    text-align: left;
    color: rgba(255, 255, 255, 0.9);
    width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;

    @media (max-width: 480px) {
      font-size: 0.65rem;
      line-height: 1.3;
    }
  }
`;

const ToolImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  transform-origin: center center;
  transform: scale(1); /* Base scale */
  transition: transform 0.3s ease;

  @media (max-width: 1200px) {
    width: 85px;
    height: 85px;
    transform: scale(0.95);
  }

  @media (max-width: 992px) {
    width: 80px;
    height: 80px;
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    width: 75px;
    height: 75px;
    transform: scale(0.85);
  }

  @media (max-width: 480px) {
    width: 65px;
    height: 65px;
    transform: scale(0.8);
  }

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
  width: 50px;
  height: 50px;
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

  @media (max-width: 1200px) {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 992px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
  }

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
    width: 65%;
    height: 65%;
    object-fit: contain;
    transition: transform 0.3s ease;
    transform: ${(props) => (props.hovered ? "scale(1.05)" : "scale(1)")};
    image-rendering: auto;
    filter: none;
  }
`;

// Wrapper for the description to prevent it from being cut off
const DescriptionWrapper = styled.div`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 2000;
  pointer-events: none;
  max-width: 180px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    transform: translateX(-10px);
    max-width: 160px;
  }

  @media (max-width: 480px) {
    transform: translateX(-20px);
    max-width: 140px;
  }
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
  const [imageLoaded, setImageLoaded] = useState(false);
  // Add state to track canvas dimensions
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update canvas dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions(); // Initial call

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Calculate initial position on a sphere with constraints to prevent extending too far left
  useEffect(() => {
    const phi = Math.acos(-1 + (2 * index) / totalNodes);
    const theta = Math.sqrt(totalNodes * Math.PI) * phi;

    // Adjust radius based on screen size and container dimensions
    let radius = 2.8; // Keep the same radius

    // Scale radius based on screen width to keep orbs within canvas
    if (window.innerWidth <= 1200) {
      radius = 2.6;
    }
    if (window.innerWidth <= 992) {
      radius = 2.4;
    }
    if (window.innerWidth <= 768) {
      radius = 2.2;
    }
    if (window.innerWidth <= 480) {
      radius = 2.0;
    }

    // Apply a horizontal compression factor to make orbit more oval (narrower in x-axis)
    let horizontalCompressionFactor = 0.9; // Keep the same
    if (window.innerWidth <= 1200) {
      horizontalCompressionFactor = 0.85;
    }
    if (window.innerWidth <= 768) {
      horizontalCompressionFactor = 0.8;
    }
    if (window.innerWidth <= 480) {
      horizontalCompressionFactor = 0.75;
    }

    // Calculate x with compression factor
    let x =
      radius * Math.cos(theta) * Math.sin(phi) * horizontalCompressionFactor;

    // Increase vertical spread by increasing the vertical factor
    let verticalFactor = 0.85; // Increased from 0.7 to spread more vertically
    if (window.innerWidth <= 1200) {
      verticalFactor = 0.8; // Increased from 0.65
    }
    if (window.innerWidth <= 768) {
      verticalFactor = 0.75; // Increased from 0.6
    }
    if (window.innerWidth <= 480) {
      verticalFactor = 0.7; // Increased from 0.55
    }

    const y = radius * Math.sin(theta) * Math.sin(phi) * verticalFactor;
    const z = radius * Math.cos(phi);

    // Center the orbit horizontally with adjustment for screen size
    let horizontalOffset = 0.1; // Keep the same
    if (window.innerWidth <= 1200) {
      horizontalOffset = 0.0;
    }
    if (window.innerWidth <= 768) {
      horizontalOffset = -0.1;
    }
    if (window.innerWidth <= 480) {
      horizontalOffset = -0.2;
    }
    x += horizontalOffset;

    // Apply initial constraints to ensure orbs start within bounds
    // Widen vertical constraints to allow more vertical spread
    let xMin = -2.4,
      xMax = 2.4,
      yMin = -2.2,
      yMax = 2.8; // Increased yMin/yMax range for more vertical spread

    // Tighten constraints for smaller screens
    if (window.innerWidth <= 1200) {
      xMin = -2.2;
      xMax = 2.2;
      yMin = -2.0;
      yMax = 2.6; // Increased yMin/yMax range
    }
    if (window.innerWidth <= 992) {
      xMin = -2.0;
      xMax = 2.0;
      yMin = -1.8;
      yMax = 2.4; // Increased yMin/yMax range
    }
    if (window.innerWidth <= 768) {
      xMin = -1.9;
      xMax = 1.9;
      yMin = -1.6;
      yMax = 2.2; // Increased yMin/yMax range
    }
    if (window.innerWidth <= 480) {
      xMin = -1.7;
      xMax = 1.7;
      yMin = -1.4;
      yMax = 2.0; // Increased yMin/yMax range
    }

    const constrainedX = Math.max(xMin, Math.min(xMax, x));
    const constrainedY = Math.max(yMin, Math.min(yMax, y));

    meshRef.current.position.set(constrainedX, constrainedY, z);
    setRotation([constrainedX, constrainedY, z]);
  }, [index, totalNodes, canvasDimensions]); // Added canvasDimensions as dependency

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = tool.logo;
  }, [tool.logo]);

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
    // Widen vertical constraints to allow more vertical spread
    let xMin = -2.4,
      xMax = 2.4,
      yMin = -2.2,
      yMax = 2.8; // Increased yMin/yMax range for more vertical spread
    let horizontalOffset = 0.1; // Keep the same

    // Tighten constraints for smaller screens
    if (window.innerWidth <= 1200) {
      xMin = -2.2;
      xMax = 2.2;
      yMin = -2.0;
      yMax = 2.6; // Increased yMin/yMax range
      horizontalOffset = 0.0;
    }
    if (window.innerWidth <= 992) {
      xMin = -2.0;
      xMax = 2.0;
      yMin = -1.8;
      yMax = 2.4; // Increased yMin/yMax range
      horizontalOffset = -0.05;
    }
    if (window.innerWidth <= 768) {
      xMin = -1.9;
      xMax = 1.9;
      yMin = -1.6;
      yMax = 2.2; // Increased yMin/yMax range
      horizontalOffset = -0.1;
    }
    if (window.innerWidth <= 480) {
      xMin = -1.7;
      xMax = 1.7;
      yMin = -1.4;
      yMax = 2.0; // Increased yMin/yMax range
      horizontalOffset = -0.2;
    }

    // Apply horizontal compression to make orbit more oval (narrower in x-axis)
    let horizontalCompressionFactor = 0.9; // Keep the same
    if (window.innerWidth <= 1200) {
      horizontalCompressionFactor = 0.85;
    }
    if (window.innerWidth <= 768) {
      horizontalCompressionFactor = 0.8;
    }
    if (window.innerWidth <= 480) {
      horizontalCompressionFactor = 0.75;
    }

    // Apply compression to x position
    const compressedX = x * horizontalCompressionFactor;

    // Constrain x position to stay within bounds
    const constrainedX = Math.max(
      xMin,
      Math.min(xMax, compressedX + horizontalOffset)
    );
    // Constrain y position to stay within bounds but allow more vertical movement
    const constrainedY = Math.max(yMin, Math.min(yMax, y));

    meshRef.current.position.x = constrainedX;
    meshRef.current.position.y = constrainedY;
    meshRef.current.position.z = z;

    // Calculate scale based on z position and screen size
    // Adjust camera distance based on screen size
    let cameraDistance = 9.0; // Keep the same
    if (window.innerWidth <= 1200) {
      cameraDistance = 9.2;
    }
    if (window.innerWidth <= 992) {
      cameraDistance = 9.3;
    }
    if (window.innerWidth <= 768) {
      cameraDistance = 9.5;
    }
    if (window.innerWidth <= 480) {
      cameraDistance = 10.0;
    }

    const distanceFromCamera = cameraDistance - z;

    // COMPLETELY REDESIGNED SCALING LOGIC:
    // 1. Smaller orbs in fullscreen
    // 2. Larger orbs in mobile
    // 3. Almost no size difference between near and far orbs
    let newScale;

    // Base scale values - MUCH smaller range (0.005 difference)
    // Fullscreen: smaller orbs (0.32-0.325)
    if (window.innerWidth > 1200) {
      newScale =
        0.32 + Math.min(0.005, Math.abs(distanceFromCamera - 6) * 0.001);
    }
    // 1200px breakpoint: slightly larger (0.33-0.335)
    else if (window.innerWidth > 992) {
      newScale =
        0.33 + Math.min(0.005, Math.abs(distanceFromCamera - 6) * 0.001);
    }
    // 992px breakpoint: slightly larger (0.34-0.345)
    else if (window.innerWidth > 768) {
      newScale =
        0.34 + Math.min(0.005, Math.abs(distanceFromCamera - 6) * 0.001);
    }
    // 768px breakpoint: larger for tablets (0.36-0.365)
    else if (window.innerWidth > 480) {
      newScale =
        0.36 + Math.min(0.005, Math.abs(distanceFromCamera - 6) * 0.001);
    }
    // 480px breakpoint: largest for mobile (0.38-0.385)
    else {
      newScale =
        0.38 + Math.min(0.005, Math.abs(distanceFromCamera - 6) * 0.001);
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
    if (!imageLoaded) return; // Don't trigger hover effects if image isn't loaded

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
    if (!imageLoaded) return; // Don't trigger hover effects if image isn't loaded

    setHovered(false);

    // Set a timeout to hide the description - reduced from 500ms to 300ms
    timeoutRef.current = setTimeout(() => {
      unregisterNode(tool.name);
    }, 300);
  };

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.7, 32, 32]} />
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
        zIndexRange={[100, 50]}
        pointerEvents="all"
        transform
        key={`tool-${tool.name}`}
        // Add scale factor based on screen size to ensure proper scaling
        scale={
          window.innerWidth <= 480
            ? 0.8
            : window.innerWidth <= 768
            ? 0.85
            : window.innerWidth <= 992
            ? 0.9
            : window.innerWidth <= 1200
            ? 0.95
            : 1
        }
        // Add style to ensure proper containment
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <div
          ref={nodeRef}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <ToolImageWrapper hovered={hovered}>
            <ToolImageContainer
              hovered={hovered}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              data-tool={tool.name}
            >
              {imageLoaded ? (
                <img
                  src={tool.logo}
                  alt={tool.name}
                  draggable="false"
                  loading="eager"
                />
              ) : (
                <div
                  style={{
                    width: "65%",
                    height: "65%",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "50%",
                  }}
                />
              )}
            </ToolImageContainer>
          </ToolImageWrapper>
        </div>
      </Html>
    </mesh>
  );
};

// Component to render all active descriptions
const Descriptions = ({ activeNodes }) => {
  // Add a state to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return Object.entries(activeNodes).map(([id, data]) => {
    if (!data.active || !data.rect) return null;

    const tool = toolsData.find((t) => t.name === id);
    if (!tool) return null;

    // Adjust position for different screen sizes
    let leftPosition = data.rect.rect.left - 10;

    // Ensure the description doesn't go off-screen to the right
    const descriptionWidth =
      windowWidth <= 480 ? 140 : windowWidth <= 768 ? 160 : 180;
    const rightEdge = leftPosition + descriptionWidth;

    if (rightEdge > windowWidth) {
      // If it would go off-screen, adjust position to stay within viewport
      leftPosition = Math.max(0, windowWidth - descriptionWidth - 10);
    }

    // Additional adjustments for mobile
    if (windowWidth <= 768) {
      leftPosition = Math.min(
        leftPosition,
        windowWidth - descriptionWidth - 10
      );
    }
    if (windowWidth <= 480) {
      leftPosition = Math.min(leftPosition, windowWidth - descriptionWidth - 5);
    }

    return (
      <DescriptionWrapper
        key={id}
        top={data.rect.rect.top + data.rect.rect.height / 2}
        left={leftPosition}
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
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight,
  });

  // Add responsive handling for canvas with improved resize handling
  useEffect(() => {
    const handleResize = () => {
      // Get the container dimensions for proper scaling
      const container = document.querySelector(".orb-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        setCanvasSize({
          width: rect.width,
          height: rect.height,
          aspectRatio: rect.width / rect.height,
        });
      } else {
        // Fallback to window dimensions
        setCanvasSize({
          width: window.innerWidth,
          height: window.innerHeight,
          aspectRatio: window.innerWidth / window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    // Initial call after a short delay to ensure DOM is ready
    setTimeout(handleResize, 100);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust camera position and field of view based on screen size and aspect ratio
  const getCameraSettings = () => {
    // Base settings - keep unchanged for larger screens
    let fov = 58;
    let position = [0.1, 0.3, 10];

    // Adjust for screen width
    if (window.innerWidth <= 770) {
      fov = 58;
      position = [0.1, 0.3, 6.25];
    } else if (window.innerWidth <= 1200) {
      // Mobile/tablet version: bring camera closer to orbs
      fov = 55; // Reduced FOV for a more zoomed-in effect
      position = [0.1, 0.3, 7.5 ]; // Significantly reduced z position to zoom in more
    } else {
      // Desktop settings
      fov = 52;
      position = [0.1, 0.3, 9.5];
    }

    return { fov, position };
  };

  return (
    <OrbContainer className="orb-container">
      <CanvasWrapper>
        <Canvas
          camera={getCameraSettings()}
          gl={{
            antialias: true,
            alpha: true,
            precision: "highp",
            powerPreference: "high-performance",
          }}
          pixelRatio={Math.min(2, window.devicePixelRatio)} // Limit pixel ratio to improve performance on mobile
          style={{
            imageRendering: "auto",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            overflow: "hidden",
            boxSizing: "border-box",
            display: "block",
            position: "relative",
            zIndex: 10, // Added z-index to ensure it's above hero text
          }}
          // Add onCreated handler to ensure proper initialization
          onCreated={({ gl, scene, camera }) => {
            // Ensure camera is looking at the center
            camera.lookAt(0, 0, 0);
            // Set clear color to transparent
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {/* Adjusted group position to center orbs and account for increased vertical spread */}
          <group position={[0.1, 0.3, 0]}>
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
      </CanvasWrapper>

      {/* Uncomment descriptions to make them active */}
      <Descriptions activeNodes={activeNodes} />
    </OrbContainer>
  );
};

export default ToolsOrb;
