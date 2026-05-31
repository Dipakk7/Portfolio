const MathProps = {
    degreesToRadians: (degrees) => degrees * (Math.PI / 180),
    radiansToDegrees: (radians) => radians * (180 / Math.PI),
    normalizeAngle: (angle) => {
        while (angle > 180) angle -= 360;
        while (angle < -180) angle += 360;
        return angle;
    }
};

const images = Array.from({ length: 23 }, (_, i) => ({ id: `img-${i}` }));
const containerSize = 420;
const sphereRadius = 165;
const rotation = { x: 15, y: 15, z: 0 };
const baseImageScale = 0.18;

const actualSphereRadius = sphereRadius || containerSize * 0.5;
const baseImageSize = containerSize * baseImageScale;

function generateSpherePositions() {
    const positions = [];
    const imageCount = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
        const t = i / imageCount;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = angleIncrement * i;

        let phi = inclination * (180 / Math.PI);
        let theta = (azimuth * (180 / Math.PI)) % 360;

        const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
        if (phi < 90) {
            phi = Math.max(5, phi - poleBonus);
        } else {
            phi = Math.min(175, phi + poleBonus);
        }

        phi = 15 + (phi / 180) * 150;

        // Note: Math.random() is mocked for consistency in output
        const randomOffset = 0; 
        theta = (theta + randomOffset) % 360;
        phi = Math.max(0, Math.min(180, phi + 0));

        positions.push({
            theta: theta,
            phi: phi,
            radius: actualSphereRadius
        });
    }
    return positions;
}

const imagePositions = generateSpherePositions();

function calculateWorldPositions() {
    const positions = imagePositions.map((pos, index) => {
        const thetaRad = MathProps.degreesToRadians(pos.theta);
        const phiRad = MathProps.degreesToRadians(pos.phi);
        const rotXRad = MathProps.degreesToRadians(rotation.x);
        const rotYRad = MathProps.degreesToRadians(rotation.y);

        let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
        let y = pos.radius * Math.cos(phiRad);
        let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

        const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
        const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
        x = x1;
        z = z1;

        const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
        const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
        y = y2;
        z = z2;

        const worldPos = { x, y, z };
        const isVisible = true;
        const zRatio = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
        const fadeOpacity = 0.3 + zRatio * 0.7;
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

    const adjustedPositions = [...positions];

    for (let i = 0; i < adjustedPositions.length; i++) {
        const pos = adjustedPositions[i];
        let adjustedScale = pos.scale;
        const imageSize = baseImageSize * adjustedScale;

        for (let j = 0; j < adjustedPositions.length; j++) {
            if (i === j) continue;
            const other = adjustedPositions[j];
            const otherSize = baseImageSize * other.scale;

            const dx = pos.x - other.x;
            const dy = pos.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (imageSize + otherSize) / 2 + 25;

            if (distance < minDistance && distance > 0) {
                const overlap = minDistance - distance;
                const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
                adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
            }
        }

        adjustedPositions[i] = {
            ...pos,
            scale: Math.max(0.55, adjustedScale)
        };
    }

    return adjustedPositions;
}

console.log("actualSphereRadius:", actualSphereRadius);
console.log("baseImageSize:", baseImageSize);
const worldPositions = calculateWorldPositions();
console.log("First 5 world positions:");
console.log(worldPositions.slice(0, 5));
