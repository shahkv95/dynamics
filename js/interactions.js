window.Interactions = (() => {
    let mouseX = 0, mouseY = 0;

    function init(camera) {
        document.addEventListener("mousemove", e => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
        });

        document.addEventListener("wheel", e => {
            camera.position.z = THREE.MathUtils.clamp(
                camera.position.z + e.deltaY * 0.01,
                5,
                30
            );
        });

        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            SceneManager.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.getElementById("explore-btn")?.addEventListener("click", () => {
            camera.position.z = 8;
        });
    }

    return {
        init,
        get mouseX() { return mouseX; },
        get mouseY() { return mouseY; }
    };
})();
