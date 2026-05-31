const images = Array(23).fill({ id: 'test' });
const containerSize = 420;
const sphereRadius = 165;
const actualSphereRadius = sphereRadius || containerSize * 0.5;

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

        const randomOffset = 0; // omit random for deterministic check
        theta = (theta + randomOffset) % 360;
        phi = Math.max(0, Math.min(180, phi));

        positions.push({
            theta: theta,
            phi: phi,
            radius: actualSphereRadius
        });
    }
    return positions;
}

const imagePositions = generateSpherePositions();

function degreesToRadians(degrees) { return degrees * (Math.PI / 180); }

function calculateWorldPositions() {
    const rotation = { x: 15, y: 15, z: 0 };
    return imagePositions.map((pos, index) => {
        const thetaRad = degreesToRadians(pos.theta);
        const phiRad = degreesToRadians(pos.phi);
        const rotXRad = degreesToRadians(rotation.x);
        const rotYRad = degreesToRadians(rotation.y);

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

        return { x, y, z };
    });
}

const worldPositions = calculateWorldPositions();
console.log("worldPositions length:", worldPositions.length);
console.log("First position:", worldPositions[0]);
console.log("All positions:\n", worldPositions.map((w, i) => `${i}: x=${w.x.toFixed(2)}, y=${w.y.toFixed(2)}`).join('\n'));
