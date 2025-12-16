window.SceneManager = (() => {
    let scene, camera, renderer;
    let hero, particles, rings = [];

    function initScene() {
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, APP_CONFIG.fogDensity);

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = APP_CONFIG.cameraZ;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById("canvas-container").appendChild(renderer.domElement);

        addLights();
        addHero();
        addRings();
        addParticles();
    }

    function addLights() {
        scene.add(new THREE.AmbientLight(0x404040, 2));

        const light1 = new THREE.PointLight(0x00ffff, 2, 50);
        light1.position.set(5, 5, 5);

        const light2 = new THREE.PointLight(0xff00ff, 2, 50);
        light2.position.set(-5, -5, 5);

        scene.add(light1, light2);
        scene.userData.lights = { light1, light2 };
    }

    function addHero() {
        const geo = new THREE.IcosahedronGeometry(3, 1);
        const mat = new THREE.MeshPhongMaterial({
            color: 0x111111,
            emissive: 0x222222,
            shininess: 100,
            flatShading: true
        });

        hero = new THREE.Mesh(geo, mat);

        const wire = new THREE.LineSegments(
            new THREE.WireframeGeometry(geo),
            new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 0.3, transparent: true })
        );

        hero.add(wire);
        scene.add(hero);
    }

    function addRings() {
        const geo = new THREE.TorusGeometry(6, 0.05, 16, 100);
        const mat = new THREE.MeshBasicMaterial({ color: 0x444444, opacity: 0.2, transparent: true });

        for (let i = 0; i < 3; i++) {
            const ring = new THREE.Mesh(geo, mat);
            ring.rotation.x = Math.PI / 2;
            ring.rotation.y = i === 1 ? Math.PI / 3 : i === 2 ? -Math.PI / 3 : 0;
            rings.push(ring);
            scene.add(ring);
        }
    }

    function addParticles() {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(APP_CONFIG.particleCount * 3);
        const col = new Float32Array(APP_CONFIG.particleCount * 3);

        for (let i = 0; i < pos.length; i += 3) {
            pos[i] = (Math.random() - 0.5) * 50;
            pos[i + 1] = (Math.random() - 0.5) * 50;
            pos[i + 2] = (Math.random() - 0.5) * 50;

            const c = new THREE.Color(
                APP_CONFIG.colors[Math.floor(Math.random() * APP_CONFIG.colors.length)]
            );
            col.set([c.r, c.g, c.b], i);
        }

        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

        particles = new THREE.Points(
            geo,
            new THREE.PointsMaterial({
                size: APP_CONFIG.particleSize,
                vertexColors: true,
                transparent: true,
                blending: THREE.AdditiveBlending
            })
        );

        scene.add(particles);
    }

    return {
        initScene,
        get scene() { return scene; },
        get camera() { return camera; },
        get renderer() { return renderer; },
        get hero() { return hero; },
        get particles() { return particles; },
        get rings() { return rings; }
    };
})();
