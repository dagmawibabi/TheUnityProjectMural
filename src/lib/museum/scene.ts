import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { artistHref, type WallPiece } from '$lib/artwork';
import { getPrimaryArtistLink } from '$lib/utils';

export type MuseumHooks = {
	onProgress?: (ratio: number) => void;
	onReady?: () => void;
	onLockChange?: (locked: boolean) => void;
	onHoverArt?: (name: string | null) => void;
};

export type MuseumHandle = {
	dispose: () => void;
	enter: () => void;
};

const TEAK = 0x3a2416;
const TEAK_DARK = 0x24150d;
const BRASS = 0xb0894f;
const WALNUT = 0x4a2f1a;
const CEILING = 0xe7d7c1;
const EMERALD = 0x34d399;

function woodTexture() {
	const c = document.createElement('canvas');
	c.width = 512;
	c.height = 512;
	const ctx = c.getContext('2d')!;
	ctx.fillStyle = '#2b1a10';
	ctx.fillRect(0, 0, 512, 512);
	for (let x = 0; x < 512; x += 42) {
		ctx.fillStyle = x % 84 === 0 ? '#3d2618' : '#332013';
		ctx.fillRect(x, 0, 40, 512);
		ctx.strokeStyle = 'rgba(0,0,0,0.28)';
		ctx.beginPath();
		ctx.moveTo(x + 40, 0);
		ctx.lineTo(x + 40, 512);
		ctx.stroke();
		for (let y = 0; y < 512; y += 8) {
			ctx.strokeStyle = `rgba(90,55,30,${0.04 + Math.random() * 0.06})`;
			ctx.beginPath();
			ctx.moveTo(x + 2, y);
			ctx.lineTo(x + 38, y + 3);
			ctx.stroke();
		}
	}
	const tex = new THREE.CanvasTexture(c);
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

function plasterTexture() {
	const c = document.createElement('canvas');
	c.width = 256;
	c.height = 256;
	const ctx = c.getContext('2d')!;
	ctx.fillStyle = '#d2c0a4';
	ctx.fillRect(0, 0, 256, 256);
	for (let i = 0; i < 1200; i++) {
		ctx.fillStyle = `rgba(90,70,40,${Math.random() * 0.05})`;
		ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
	}
	const tex = new THREE.CanvasTexture(c);
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

function nameplateTexture(name: string) {
	const c = document.createElement('canvas');
	c.width = 1024;
	c.height = 192;
	const ctx = c.getContext('2d')!;
	const g = ctx.createLinearGradient(0, 0, 0, 192);
	g.addColorStop(0, '#c4a36a');
	g.addColorStop(0.4, '#8d6b35');
	g.addColorStop(1, '#6d5228');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 1024, 192);
	ctx.strokeStyle = '#f0d9a4';
	ctx.lineWidth = 8;
	ctx.strokeRect(10, 10, 1004, 172);
	ctx.font = '600 72px "Palatino Linotype", Palatino, "Times New Roman", serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.lineJoin = 'round';
	ctx.strokeStyle = 'rgba(42, 28, 12, 0.55)';
	ctx.lineWidth = 8;
	ctx.strokeText(name.toUpperCase(), 512, 100, 920);
	ctx.fillStyle = '#efe6d4';
	ctx.fillText(name.toUpperCase(), 512, 100, 920);
	const tex = new THREE.CanvasTexture(c);
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

function titleTexture() {
	const c = document.createElement('canvas');
	c.width = 2048;
	c.height = 512;
	const ctx = c.getContext('2d')!;
	ctx.clearRect(0, 0, 2048, 512);
	ctx.fillStyle = '#1a120a';
	ctx.textAlign = 'center';
	ctx.font = '600 120px "Palatino Linotype", Palatino, serif';
	ctx.fillText('THE UNITY PROJECT', 1024, 200);
	ctx.font = '500 72px "Palatino Linotype", Palatino, serif';
	ctx.fillStyle = '#0f766e';
	ctx.fillText('MUSEUM', 1024, 320);
	const tex = new THREE.CanvasTexture(c);
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

function makeFrame(art: WallPiece, texture: THREE.Texture) {
	const group = new THREE.Group();
	const w = 1.45;
	const h = 1.45;
	const t = 0.07;

	const walnut = new THREE.MeshStandardMaterial({ color: WALNUT, roughness: 0.55, metalness: 0.08 });
	const brass = new THREE.MeshStandardMaterial({
		color: BRASS,
		roughness: 0.35,
		metalness: 0.72
	});

	const outer = new THREE.Mesh(new THREE.BoxGeometry(w + 0.16, h + 0.16, t), walnut);
	outer.position.z = -0.02;
	group.add(outer);

	const inner = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, h + 0.06, t * 0.45), brass);
	inner.position.z = 0.01;
	group.add(inner);

	const painting = new THREE.Mesh(
		new THREE.PlaneGeometry(w, h),
		new THREE.MeshStandardMaterial({
			map: texture,
			roughness: 0.72,
			metalness: 0.02
		})
	);
	painting.position.z = 0.04;
	const href = artistHref(art);
	const label = getPrimaryArtistLink(art).label;
	const name = art.artist || label || 'Unknown artist';
	painting.userData = { href, name, art: true };
	group.add(painting);

	const plate = new THREE.Mesh(
		new THREE.BoxGeometry(w * 0.92, 0.14, 0.03),
		new THREE.MeshStandardMaterial({
			map: nameplateTexture(name),
			roughness: 0.4,
			metalness: 0.55
		})
	);
	plate.position.set(0, -h / 2 - 0.18, 0.03);
	plate.userData = { href, name, art: true };
	group.add(plate);

	return { group, clickable: [painting, plate] };
}

export async function mountMuseum(
	canvas: HTMLCanvasElement,
	pieces: WallPiece[],
	hooks: MuseumHooks = {}
): Promise<MuseumHandle> {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
	const width = canvas.clientWidth || window.innerWidth;
	const height = canvas.clientHeight || window.innerHeight;
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setSize(width, height, false);
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.05;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x1c140e);
	scene.fog = new THREE.Fog(0x2a2118, 24, 58);

	const camera = new THREE.PerspectiveCamera(62, width / Math.max(height, 1), 0.08, 80);
	camera.position.set(0, 1.62, 0);

	const controls = new PointerLockControls(camera, canvas);
	scene.add(controls.object);

	const spacing = 2.35;
	const perSide = Math.max(1, Math.ceil(pieces.length / 2));
	const hallLength = Math.max(18, perSide * spacing + 6);
	const hallWidth = 8.4;
	const hallHeight = 4.6;
	const halfL = hallLength / 2;
	const halfW = hallWidth / 2;

	camera.position.z = halfL - 2.2;

	const floorTex = woodTexture();
	floorTex.repeat.set(hallWidth / 0.42, hallLength / 6);
	const wallTex = plasterTexture();
	wallTex.repeat.set(hallLength / 5, 2);

	const floor = new THREE.Mesh(
		new THREE.PlaneGeometry(hallWidth, hallLength),
		new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.38, metalness: 0.04 })
	);
	floor.rotation.x = -Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);

	const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.9, metalness: 0 });
	const ceilingMat = new THREE.MeshStandardMaterial({ color: CEILING, roughness: 0.85, metalness: 0 });

	const sideWallGeo = new THREE.BoxGeometry(0.36, hallHeight, hallLength + 0.36);
	const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
	leftWall.position.set(-halfW - 0.18, hallHeight / 2, 0);
	scene.add(leftWall);
	const rightWall = leftWall.clone();
	rightWall.position.x = halfW + 0.18;
	scene.add(rightWall);

	const endGeo = new THREE.BoxGeometry(hallWidth + 0.72, hallHeight, 0.36);
	const farWall = new THREE.Mesh(endGeo, wallMat);
	farWall.position.set(0, hallHeight / 2, -halfL - 0.18);
	scene.add(farWall);
	const nearWall = farWall.clone();
	nearWall.position.z = halfL + 0.18;
	scene.add(nearWall);

	const ceiling = new THREE.Mesh(
		new THREE.BoxGeometry(hallWidth + 0.72, 0.22, hallLength + 0.72),
		ceilingMat
	);
	ceiling.position.y = hallHeight + 0.11;
	scene.add(ceiling);

	const beamMat = new THREE.MeshStandardMaterial({ color: TEAK_DARK, roughness: 0.55, metalness: 0.05 });
	for (const x of [-1.15, 1.15]) {
		const beam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, hallLength), beamMat);
		beam.position.set(x, hallHeight - 0.08, 0);
		scene.add(beam);
	}
	const crossCount = Math.max(4, Math.round(hallLength / 4.5));
	for (let i = 0; i < crossCount; i++) {
		const z = -halfL + 1.5 + (i + 0.5) * ((hallLength - 3) / crossCount);
		const rib = new THREE.Mesh(new THREE.BoxGeometry(hallWidth - 0.2, 0.12, 0.14), beamMat);
		rib.position.set(0, hallHeight - 0.14, z);
		scene.add(rib);
	}

	const skylight = new THREE.Mesh(
		new THREE.PlaneGeometry(1.05, hallLength * 0.62),
		new THREE.MeshStandardMaterial({
			color: 0xcff5e8,
			emissive: EMERALD,
			emissiveIntensity: 0.45,
			roughness: 0.2,
			metalness: 0.1,
			side: THREE.DoubleSide
		})
	);
	skylight.rotation.x = Math.PI / 2;
	skylight.position.y = hallHeight - 0.02;
	scene.add(skylight);

	const railMat = new THREE.MeshStandardMaterial({ color: WALNUT, roughness: 0.5, metalness: 0.1 });
	for (const x of [-halfW + 0.02, halfW - 0.02]) {
		const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, hallLength), railMat);
		rail.position.set(x, 3.05, 0);
		scene.add(rail);
		const base = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, hallLength), railMat);
		base.position.set(x, 0.09, 0);
		scene.add(base);
	}

	const title = new THREE.Mesh(
		new THREE.PlaneGeometry(6.4, 1.6),
		new THREE.MeshStandardMaterial({ map: titleTexture(), transparent: true, roughness: 0.6 })
	);
	title.position.set(0, 2.6, -halfL + 0.16);
	scene.add(title);

	scene.add(new THREE.HemisphereLight(0xf0e6d6, 0x3a2416, 0.55));
	const sun = new THREE.DirectionalLight(0xfff3dd, 0.55);
	sun.position.set(0, 10, 4);
	sun.castShadow = true;
	sun.shadow.mapSize.set(1024, 1024);
	scene.add(sun);
	scene.add(new THREE.AmbientLight(0x2a2118, 0.22));

	const brassMat = new THREE.MeshStandardMaterial({ color: BRASS, roughness: 0.35, metalness: 0.7 });
	const glowMat = new THREE.MeshStandardMaterial({
		color: 0xfff1d0,
		emissive: 0xffd9a0,
		emissiveIntensity: 1.35
	});
	const lampCount = Math.max(3, Math.round(hallLength / 7));
	for (let i = 0; i < lampCount; i++) {
		const z = -halfL + 3 + (i + 0.5) * ((hallLength - 6) / lampCount);
		const fixture = new THREE.Group();
		const canopy = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 16), brassMat);
		canopy.position.y = hallHeight;
		const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.42, 8), brassMat);
		rod.position.y = hallHeight - 0.22;
		const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.14, 16, 1, true), brassMat);
		shade.position.y = hallHeight - 0.48;
		const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), glowMat);
		bulb.position.y = hallHeight - 0.48;
		fixture.add(canopy, rod, shade, bulb);
		fixture.position.z = z;
		scene.add(fixture);
		const light = new THREE.PointLight(0xffe6c4, 12, 11, 2);
		light.position.set(0, hallHeight - 0.5, z);
		scene.add(light);
	}

	const benchMat = new THREE.MeshStandardMaterial({ color: TEAK, roughness: 0.5 });
	for (let i = 0; i < Math.max(1, Math.floor(hallLength / 9)); i++) {
		const z = -halfL + 5 + i * 9;
		const bench = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.42, 0.48), benchMat);
		bench.position.set(0, 0.21, z);
		bench.castShadow = true;
		scene.add(bench);
	}

	const clickable: THREE.Object3D[] = [];
	const loader = new THREE.LoadingManager();
	loader.onProgress = (_u, loaded, total) => hooks.onProgress?.(total ? loaded / total : 1);
	loader.onLoad = () => hooks.onReady?.();
	const texLoader = new THREE.TextureLoader(loader);

	const hang = (art: WallPiece, texture: THREE.Texture, side: -1 | 1, index: number) => {
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.minFilter = THREE.LinearMipmapLinearFilter;
		texture.anisotropy = 8;
		const { group, clickable: hits } = makeFrame(art, texture);
		const z = -halfL + 3.4 + index * spacing;
		group.position.set(side * (halfW - 0.12), 1.78, z);
		group.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;
		scene.add(group);
		clickable.push(...hits);
	};

	if (pieces.length === 0) hooks.onReady?.();

	pieces.forEach((art, i) => {
		const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
		const index = Math.floor(i / 2);
		texLoader.load(art.image, (texture) => hang(art, texture, side, index));
	});

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();
	let locked = false;
	let ignoreClick = false;
	let hovered: string | null = null;

	controls.addEventListener('lock', () => {
		locked = true;
		ignoreClick = true;
		hooks.onLockChange?.(true);
	});
	controls.addEventListener('unlock', () => {
		locked = false;
		hooks.onLockChange?.(false);
		hooks.onHoverArt?.(null);
	});

	const keys: Record<string, boolean> = {};
	const onKeyDown = (e: KeyboardEvent) => {
		keys[e.code] = true;
	};
	const onKeyUp = (e: KeyboardEvent) => {
		keys[e.code] = false;
	};

	const pick = (clientX?: number, clientY?: number) => {
		if (locked) {
			pointer.set(0, 0);
		} else if (clientX != null && clientY != null) {
			const rect = canvas.getBoundingClientRect();
			pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
			pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
		} else return [];
		raycaster.setFromCamera(pointer, camera);
		return raycaster.intersectObjects(clickable, false);
	};

	const onMouseMove = (e: MouseEvent) => {
		if (locked) {
			const hits = pick();
			const name = (hits[0]?.object.userData.name as string) ?? null;
			if (name !== hovered) {
				hovered = name;
				hooks.onHoverArt?.(name);
				canvas.style.cursor = name ? 'pointer' : 'none';
			}
			return;
		}
		const hits = pick(e.clientX, e.clientY);
		const name = (hits[0]?.object.userData.name as string) ?? null;
		if (name !== hovered) {
			hovered = name;
			hooks.onHoverArt?.(name);
			canvas.style.cursor = name ? 'pointer' : 'default';
		}
	};

	const onClick = (e: MouseEvent) => {
		if (ignoreClick) {
			ignoreClick = false;
			return;
		}
		const hits = pick(locked ? undefined : e.clientX, locked ? undefined : e.clientY);
		const href = hits[0]?.object.userData.href as string | undefined;
		if (href) {
			window.open(href, '_blank', 'noopener,noreferrer');
			return;
		}
		if (!locked) controls.lock();
	};

	const velocity = new THREE.Vector3();
	const direction = new THREE.Vector3();
	const clock = new THREE.Clock();

	let raf = 0;
	const loop = () => {
		const dt = Math.min(0.05, clock.getDelta());
		direction.set(0, 0, 0);
		if (keys.KeyW || keys.ArrowUp) direction.z += 1;
		if (keys.KeyS || keys.ArrowDown) direction.z -= 1;
		if (keys.KeyA || keys.ArrowLeft) direction.x -= 1;
		if (keys.KeyD || keys.ArrowRight) direction.x += 1;
		const moving = direction.lengthSq() > 0;
		if (moving) direction.normalize();
		const sprint = keys.ShiftLeft || keys.ShiftRight ? 2.15 : 1;
		const accel = moving ? 18 * sprint : 10;
		velocity.x -= velocity.x * accel * dt;
		velocity.z -= velocity.z * accel * dt;
		if (moving && locked) {
			velocity.z -= direction.z * 32 * sprint * dt;
			velocity.x -= direction.x * 32 * sprint * dt;
		}
		controls.moveRight(-velocity.x * dt);
		controls.moveForward(-velocity.z * dt);

		const obj = controls.object;
		obj.position.y = 1.62;
		obj.position.x = THREE.MathUtils.clamp(obj.position.x, -halfW + 0.55, halfW - 0.55);
		obj.position.z = THREE.MathUtils.clamp(obj.position.z, -halfL + 0.7, halfL - 0.7);

		if (locked) {
			const hits = pick();
			const name = (hits[0]?.object.userData.name as string) ?? null;
			if (name !== hovered) {
				hovered = name;
				hooks.onHoverArt?.(name);
			}
		}

		renderer.render(scene, camera);
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);

	const onResize = () => {
		const w = canvas.clientWidth;
		const h = Math.max(canvas.clientHeight, 1);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h, false);
	};
	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
	canvas.addEventListener('click', onClick);
	canvas.addEventListener('mousemove', onMouseMove);

	return {
		enter: () => {
			try {
				controls.lock();
			} catch {
				canvas.requestPointerLock();
			}
		},
		dispose: () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
			canvas.removeEventListener('click', onClick);
			canvas.removeEventListener('mousemove', onMouseMove);
			controls.unlock();
			renderer.dispose();
			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh) {
					obj.geometry.dispose();
					const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
					for (const m of mats) {
						m.map?.dispose();
						m.dispose();
					}
				}
			});
		}
	};
}
