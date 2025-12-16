SceneManager.initScene();
Interactions.init(SceneManager.camera);

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    const { hero, rings, particles, camera, scene, renderer } = SceneManager;

    hero.rotation.y += 0.005;
    hero.rotation.x += 0.002;

    rings.forEach((r, i) => r.rotation.z += i % 2 ? -0.002 : 0.002);

    particles.rotation.y = -t * 0.05;
    particles.rotation.x = Interactions.mouseY * 0.5;

    camera.position.x += (Interactions.mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-Interactions.mouseY * 5 - camera.position.y) * 0.05;

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

animate();
