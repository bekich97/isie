import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { DoubleSide } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';
import { makeNoise4D } from 'open-simplex-noise';

const Morph = () => {
    const ref = useRef(null);
    
    // Scene
    let scene = new THREE.Scene();
    // Camera
    let camera = new THREE.PerspectiveCamera( 78, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(1.5, -0.5, 6);
    // Renderer
    let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    // Append our renderer to the webpage. Basically, this appends the `canvas` to our webpage.
    useEffect(() => {
        // const elem = document.getElementById("tuto1").appendChild(renderer.domElement);
        const elem = ref.current;
        elem.appendChild(renderer.domElement);
    }, []);

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Create our geometry
    let sphereGeometry = new THREE.SphereGeometry(1.5, 100, 100);

    // This section is about accessing our geometry vertices and their locations
    sphereGeometry.positionData = [];
    let v3 = new THREE.Vector3();
    for (let i = 0; i < sphereGeometry.attributes.position.count; i++){
        v3.fromBufferAttribute(sphereGeometry.attributes.position, i);
        sphereGeometry.positionData.push(v3.clone());
    }

    // A `normal` material uses the coordinates of an object to calculate its color
    let sphereMesh = new THREE.MeshNormalMaterial();

    // Combine both, and add it to the scene.
    let sphere = new THREE.Mesh(sphereGeometry, sphereMesh);
    scene.add(sphere);

    let noise = makeNoise4D(Date.now());
    let clock = new THREE.Clock();

    window.addEventListener("resize", () => { 
        camera.aspect = window.innerWidth / window.innerHeight; 
        camera.updateProjectionMatrix(); 
        renderer.setSize(window.innerWidth, window.innerHeight)
    });

    renderer.setAnimationLoop( () => {
    let t = clock.getElapsedTime() / 1.;
        sphereGeometry.positionData.forEach((p, idx) => {
            let setNoise = noise(p.x, p.y, p.z, t * 0.3);
            v3.copy(p).addScaledVector(p, setNoise);
            sphereGeometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
        })
        sphereGeometry.computeVertexNormals();
        sphereGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    })

    return (
        <div ref={ref} style={{position: 'absolute', top: "50%", right: '-400px', transform: "translateY(-50%)"}}>
        </div>
    );
}

export default Morph;
