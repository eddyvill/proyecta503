// 1. Cuenta Regresiva
const launchDate = new Date("2026-09-01T00:00:00").getTime();
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector(".countdown").innerHTML = '<div style="color: #3b82f6; font-weight: 700;">¡YA ESTAMOS EN LÍNEA!</div>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}, 1000);

// 2. ESCENA 3D CON THREE.JS
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0a0e1a'); // Fondo oscuro de la marca

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Material Wireframe Azul
const material = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 });

// Geometría: Cubos Wireframe
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Crear múltiples cubos
const cubes = [];
for (let i = 0; i < 20; i++) {
    const cube = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), material);
    
    // Posición aleatoria
    cube.position.x = (Math.random() - 0.5) * 15;
    cube.position.y = (Math.random() - 0.5) * 15;
    cube.position.z = (Math.random() - 0.5) * 10 - 5;
    
    // Tamaño aleatorio
    const scale = Math.random() * 2 + 0.5;
    cube.scale.set(scale, scale, scale);
    
    // Rotación aleatoria
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    
    scene.add(cube);
    cubes.push({
        mesh: cube,
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01
    });
}

camera.position.z = 6;

// Interacción con Mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animación Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotación suave de los cubos
    cubes.forEach(c => {
        c.mesh.rotation.x += c.rotSpeedX;
        c.mesh.rotation.y += c.rotSpeedY;
    });

    // Movimiento de cámara sutil con el mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Responsive: Ajustar al redimensionar ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});