import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * SphereImageGrid - Interactive 3D Image Sphere Component
 *
 * A React TypeScript component that displays images arranged in a 3D sphere layout.
 * Images are distributed using Fibonacci sphere distribution for optimal coverage.
 * Supports drag-to-rotate, momentum physics, auto-rotation, and modal image viewing.
 *
 * Features:
 * - 3D sphere layout with Fibonacci distribution for even image placement
 * - Smooth drag-to-rotate interaction with momentum physics
 * - Auto-rotation capability with configurable speed
 * - Dynamic scaling based on position and visibility
 * - Collision detection to prevent image overlap
 * - Modal view for enlarged image display
 * - Touch support for mobile devices
 * - Customizable appearance and behavior
 * - Performance optimized with proper z-indexing and visibility culling
 *
 * Usage:
 * ```tsx
 * <SphereImageGrid
 *   images={imageArray}
 *   containerSize={600}
 *   sphereRadius={200}
 *   autoRotate={true}
 *   dragSensitivity={0.8}
 * />
 * ```
 */

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Position3D {
    x: number;
    y: number;
    z: number;
}

export interface SphericalPosition {
    theta: number;  // Azimuth angle in degrees
    phi: number;    // Polar angle in degrees
    radius: number; // Distance from center
}

export interface WorldPosition extends Position3D {
    scale: number;
    zIndex: number;
    isVisible: boolean;
    fadeOpacity: number;
    originalIndex: number;
}

export interface ImageData {
    id: string;
    src: string;
    alt: string;
    title?: string;
    description?: string;
}

export interface SphereImageGridProps {
    images?: ImageData[];
    containerSize?: number;
    sphereRadius?: number;
    dragSensitivity?: number;
    momentumDecay?: number;
    maxRotationSpeed?: number;
    baseImageScale?: number;
    hoverScale?: number;
    perspective?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    className?: string;
    hoveredId?: string | null;
    onHoverChange?: (id: string | null) => void;
}

interface RotationState {
    x: number;
    y: number;
    z: number;
}

interface VelocityState {
    x: number;
    y: number;
}

interface MousePosition {
    x: number;
    y: number;
}

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================

const SPHERE_MATH = {
    degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
    radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

    sphericalToCartesian: (radius: number, theta: number, phi: number): Position3D => ({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta)
    }),

    calculateDistance: (pos: Position3D, center: Position3D = { x: 0, y: 0, z: 0 }): number => {
        const dx = pos.x - center.x;
        const dy = pos.y - center.y;
        const dz = pos.z - center.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },

    normalizeAngle: (angle: number): number => {
        while (angle > 180) angle -= 360;
        while (angle < -180) angle += 360;
        return angle;
    }
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
    images = [],
    containerSize = 400,
    sphereRadius = 200,
    dragSensitivity = 0.5,
    momentumDecay = 0.95,
    maxRotationSpeed = 5,
    baseImageScale = 0.12,
    hoverScale = 1.2,
    perspective = 1000,
    autoRotate = false,
    autoRotateSpeed = 0.3,
    className = '',
    hoveredId = null,
    onHoverChange
}) => {

    // ==========================================
    // STATE & REFS
    // ==========================================

    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
    const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
    const animationFrame = useRef<number | null>(null);

    // ==========================================
    // COMPUTED VALUES
    // ==========================================

    const actualSphereRadius = sphereRadius || containerSize * 0.5;
    const baseImageSize = containerSize * baseImageScale;

    // ==========================================
    // DEVISE DETECTABLE & DETERMINISTIC SPHERE LAYOUT
    // ==========================================

    const imagePositions = React.useMemo((): SphericalPosition[] => {
        const positions: SphericalPosition[] = [];
        const imageCount = images.length;
        if (imageCount === 0) return [];

        // Use Fibonacci sphere distribution for even coverage
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const angleIncrement = 2 * Math.PI / goldenRatio;

        for (let i = 0; i < imageCount; i++) {
            // Fibonacci sphere distribution
            const t = i / imageCount;
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = angleIncrement * i;

            // Convert to degrees and focus on front hemisphere
            let phi = inclination * (180 / Math.PI);
            let theta = (azimuth * (180 / Math.PI)) % 360;

            // Better pole coverage - reach poles but avoid extreme mathematical issues
            const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35; // Moderate boost toward poles
            if (phi < 90) {
                phi = Math.max(5, phi - poleBonus); // Reach closer to top pole (15° minimum)
            } else {
                phi = Math.min(175, phi + poleBonus); // Reach closer to bottom pole (165° maximum)
            }

            // Map to fuller vertical range - covers poles but avoids extremes
            phi = 15 + (phi / 180) * 150; // Map to 15-165 degrees for pole coverage with stability

            // Add slight deterministic pseudo-randomization to prevent perfect patterns
            const randomOffset = ((i * 9301 + 49297) % 233280) / 233280 * 20 - 10;
            theta = (theta + randomOffset) % 360;
            const randomPhiOffset = ((i * 139968 + 29573) % 375660) / 375660 * 10 - 5;
            phi = Math.max(0, Math.min(180, phi + randomPhiOffset));

            positions.push({
                theta: theta,
                phi: phi,
                radius: actualSphereRadius
            });
        }

        return positions;
    }, [images, actualSphereRadius]);

    const worldPositions = React.useMemo((): WorldPosition[] => {
        const positions = imagePositions.map((pos, index) => {
            // Apply rotation using proper 3D rotation matrices
            const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
            const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
            const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
            const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

            // Initial position on sphere
            let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
            let y = pos.radius * Math.cos(phiRad);
            let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

            // Apply Y-axis rotation (horizontal drag)
            const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
            const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
            x = x1;
            z = z1;

            // Apply X-axis rotation (vertical drag)
            const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
            const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
            y = y2;
            z = z2;

            // Apply screen-space vertical floating (ups and downs) after rotation
            const time = typeof window !== 'undefined' ? performance.now() / 1000 : 0;
            const bobSpeed = 1.2;
            const bobAmplitude = 12; // vertical displacement of 12px
            const bobOffset = Math.sin(time * bobSpeed + index * 0.8) * bobAmplitude;
            y += bobOffset;

            const worldPos: Position3D = { x, y, z };

            const isVisible = true;

            // Calculate fade opacity based on Z-depth (front is 1.0, back is 0.3)
            const zRatio = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius); // 0 to 1
            const fadeOpacity = 0.3 + zRatio * 0.7;

            // Scale based on depth (front is 1.15, back is 0.75)
            const scale = 0.75 + zRatio * 0.4;

            return {
                ...worldPos,
                scale,
                zIndex: Math.round(1000 + worldPos.z),
                isVisible,
                fadeOpacity,
                originalIndex: index
            };
        });

        // Apply collision detection to prevent overlaps
        const adjustedPositions = [...positions];

        for (let i = 0; i < adjustedPositions.length; i++) {
            const pos = adjustedPositions[i];
            if (!pos.isVisible) continue;

            let adjustedScale = pos.scale;
            const imageSize = baseImageSize * adjustedScale;

            // Check for overlaps with other visible images
            for (let j = 0; j < adjustedPositions.length; j++) {
                if (i === j) continue;

                const other = adjustedPositions[j];
                if (!other.isVisible) continue;

                const otherSize = baseImageSize * other.scale;

                // Calculate 2D distance between images on screen
                const dx = pos.x - other.x;
                const dy = pos.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Minimum distance to prevent overlap (with more generous padding)
                const minDistance = (imageSize + otherSize) / 2 + 25;

                if (distance < minDistance && distance > 0) {
                    // Reduce scale to prevent overlap
                    const overlap = minDistance - distance;
                    const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
                    adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
                }
            }

            adjustedPositions[i] = {
                ...pos,
                scale: Math.max(0.55, adjustedScale) // Ensure minimum scale
            };
        }

        return adjustedPositions;
    }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

    const clampRotationSpeed = useCallback((speed: number): number => {
        return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
    }, [maxRotationSpeed]);

    // ==========================================
    // PHYSICS & MOMENTUM
    // ==========================================

    const updateMomentum = useCallback(() => {
        if (isDragging) return;

        setVelocity(prev => {
            if (hoveredId) return { x: 0, y: 0 };
            const newVelocity = {
                x: prev.x * momentumDecay,
                y: prev.y * momentumDecay
            };

            // Stop animation if velocity is too low and auto-rotate is off
            if (!autoRotate && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
                return { x: 0, y: 0 };
            }

            return newVelocity;
        });

        setRotation(prev => {
            let newX = prev.x;
            let newY = prev.y;

            const hoverIndex = hoveredId ? images.findIndex(img => img.id === hoveredId) : -1;
            
            if (hoverIndex !== -1 && imagePositions[hoverIndex]) {
                const pos = imagePositions[hoverIndex];
                // Target rotation to bring the hovered icon to the front center
                let targetX = 90 - pos.phi;
                let targetY = pos.theta - 90;

                // Normalize targetY relative to prev.y to take the shortest path
                let diffY = targetY - prev.y;
                while (diffY > 180) diffY -= 360;
                while (diffY < -180) diffY += 360;
                targetY = prev.y + diffY;

                let diffX = targetX - prev.x;
                while (diffX > 180) diffX -= 360;
                while (diffX < -180) diffX += 360;
                targetX = prev.x + diffX;

                // Smoothly interpolate towards target (lerp factor 0.08)
                newX += diffX * 0.08;
                newY += diffY * 0.08;
            } else {
                // Add auto-rotation to both X and Y axes (horizontal and vertical) when no hover
                if (autoRotate) {
                    newY += autoRotateSpeed;
                    newX += autoRotateSpeed * 0.4; // slow vertical rotation
                }
                // Add momentum-based rotation
                newX += clampRotationSpeed(velocity.x);
                newY += clampRotationSpeed(velocity.y);
            }

            return {
                x: SPHERE_MATH.normalizeAngle(newX),
                y: SPHERE_MATH.normalizeAngle(newY),
                z: prev.z
            };
        });
    }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed, hoveredId, images, imagePositions]);

    // ==========================================
    // EVENT HANDLERS
    // ==========================================

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setVelocity({ x: 0, y: 0 });
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        const rotationDelta = {
            x: -deltaY * dragSensitivity,
            y: deltaX * dragSensitivity
        };

        setRotation(prev => ({
            x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
            y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
            z: prev.z
        }));

        // Update velocity for momentum
        setVelocity({
            x: clampRotationSpeed(rotationDelta.x),
            y: clampRotationSpeed(rotationDelta.y)
        });

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    }, [isDragging, dragSensitivity, clampRotationSpeed]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        setIsDragging(true);
        setVelocity({ x: 0, y: 0 });
        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();

        const touch = e.touches[0];
        const deltaX = touch.clientX - lastMousePos.current.x;
        const deltaY = touch.clientY - lastMousePos.current.y;

        const rotationDelta = {
            x: -deltaY * dragSensitivity,
            y: deltaX * dragSensitivity
        };

        setRotation(prev => ({
            x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
            y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
            z: prev.z
        }));

        setVelocity({
            x: clampRotationSpeed(rotationDelta.x),
            y: clampRotationSpeed(rotationDelta.y)
        });

        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }, [isDragging, dragSensitivity, clampRotationSpeed]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // ==========================================
    // EFFECTS & LIFECYCLE
    // ==========================================

    useEffect(() => {
        setIsMounted(true);
    }, []);


    useEffect(() => {
        const animate = () => {
            updateMomentum();
            animationFrame.current = requestAnimationFrame(animate);
        };

        if (isMounted) {
            animationFrame.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [isMounted, updateMomentum]);

    useEffect(() => {
        if (!isMounted) return;

        const container = containerRef.current;
        if (!container) return;

        // Mouse events
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Touch events
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    // ==========================================
    // RENDER HELPERS
    // ==========================================


    const renderImageNode = useCallback((image: ImageData, index: number) => {
        const position = worldPositions[index];

        if (!position || !position.isVisible) {
            console.log("Image", image.id, "hidden because position is:", position);
            return null;
        }

        const imageSize = baseImageSize * position.scale;
        if (index === 0) {
            console.log("DIAGNOSTIC: Index 0 rendering info - position:", position, "imageSize:", imageSize, "left:", containerSize / 2 + position.x, "top:", containerSize / 2 + position.y);
        }
        const isHovered = hoveredId ? (image.id === hoveredId) : (hoveredIndex === index);
        const finalScale = isHovered ? Math.min(1.35, 1.4 / position.scale) : 1;

        return (
            <div
                key={image.id}
                className="absolute cursor-pointer select-none transition-all duration-300 ease-out flex items-center justify-center"
                style={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    left: `${containerSize / 2 + position.x}px`,
                    top: `${containerSize / 2 + position.y}px`,
                    opacity: isHovered ? 1.0 : (hoveredId ? 0.35 : position.fadeOpacity),
                    transform: `translate(-50%, -50%) scale(${finalScale})`,
                    zIndex: isHovered ? 9999 : position.zIndex
                }}
                onMouseEnter={() => {
                    setHoveredIndex(index);
                    if (onHoverChange) onHoverChange(image.id);
                }}
                onMouseLeave={() => {
                    setHoveredIndex(null);
                    if (onHoverChange) onHoverChange(null);
                }}
                onClick={() => setSelectedImage(image)}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 ${image.title?.toLowerCase() === 'github' ? 'dark:invert' : ''}`}
                    draggable={false}
                    loading={index < 3 ? 'eager' : 'lazy'}
                />
            </div>
        );
    }, [worldPositions, baseImageSize, containerSize, hoveredIndex, hoveredId, onHoverChange]);

    const renderSpotlightModal = () => {
        if (!selectedImage) return null;

        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
                onClick={() => setSelectedImage(null)}
                style={{
                    animation: 'fadeIn 0.3s ease-out'
                }}
            >
                <div
                    className="bg-white rounded-xl max-w-md w-full overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        animation: 'scaleIn 0.3s ease-out'
                    }}
                >
                    <div className="relative aspect-square">
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full text-white flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {(selectedImage.title || selectedImage.description) && (
                        <div className="p-6">
                            {selectedImage.title && (
                                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                            )}
                            {selectedImage.description && (
                                <p className="text-gray-600">{selectedImage.description}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // ==========================================
    // EARLY RETURNS
    // ==========================================

    if (!isMounted) {
        return (
            <div
                className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center"
                style={{ width: containerSize, height: containerSize }}
            >
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    if (!images.length) {
        return (
            <div
                className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
                style={{ width: containerSize, height: containerSize }}
            >
                <div className="text-gray-400 text-center">
                    <p>No images provided</p>
                    <p className="text-sm">Add images to the images prop</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // MAIN RENDER
    // ==========================================

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes scaleIn {
                  from { transform: scale(0.85); opacity: 0; }
                  to { transform: scale(1); opacity: 1; }
                }
            `}</style>

            <div
                ref={containerRef}
                className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
                style={{
                    width: containerSize,
                    height: containerSize,
                    perspective: `${perspective}px`
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >

                <div className="relative w-full h-full" style={{ zIndex: 10 }}>
                    {images.map((image, index) => renderImageNode(image, index))}
                </div>
            </div>

            {renderSpotlightModal()}
        </>
    );
};

export default SphereImageGrid;
