import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { GamepadIcon, RefreshCwIcon } from './Icons';

declare const THREE: any;
declare const TweenLite: any;
declare const Power1: any;
declare const requestAnimationFrame: any;

const TowerBuilderGame: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameInstance = useRef<any>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const storedHighScore = localStorage.getItem('towerBuilderHighScore');
        if (storedHighScore) {
            setHighScore(parseInt(storedHighScore, 10));
        }
    }, []);

    const handleRestart = () => {
        gameInstance.current?.restartGame();
    };

    useEffect(() => {
        if (!containerRef.current || typeof THREE === 'undefined' || typeof TweenLite === 'undefined') {
            console.warn("Three.js or GSAP not loaded");
            return;
        }

        if (gameInstance.current) return;
        class Stage {
            private container: any; private camera: any; private scene: any; private renderer: any; private light: any; private softLight: any;
            constructor() {
                this.container = containerRef.current;
                this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
                this.renderer.setClearColor(0x000000, 0);
                this.container.appendChild(this.renderer.domElement);
                this.scene = new THREE.Scene();
                let aspect = this.container.clientWidth / this.container.clientHeight; let d = 20;
                this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 1000);
                this.camera.position.x = 2; this.camera.position.y = 2; this.camera.position.z = 2;
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                this.light = new THREE.DirectionalLight(0xffffff, 0.6);
                this.light.position.set(0, 499, 0);
                this.scene.add(this.light);
                const ambient = new THREE.AmbientLight(0x991b1b, 0.5);
                this.scene.add(ambient);
                window.addEventListener('resize', () => this.onResize());
                this.onResize();
            }
            setCamera(y: number, speed: number = 0.3) {
                TweenLite.to(this.camera.position, speed, { y: y + 4, ease: Power1.easeInOut });
                TweenLite.to(this.camera.lookAt, speed, { y: y, ease: Power1.easeInOut });
            }
            onResize() {
                let viewSize = 30;
                if (!this.container) return;
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
                this.camera.left = this.container.clientWidth / -viewSize;
                this.camera.right = this.container.clientWidth / viewSize;
                this.camera.top = this.container.clientHeight / viewSize;
                this.camera.bottom = this.container.clientHeight / -viewSize;
                this.camera.updateProjectionMatrix();
            }
            render = () => { this.renderer.render(this.scene, this.camera); }
            add = (elem: any) => { this.scene.add(elem); }
            remove = (elem: any) => { this.scene.remove(elem); }
        }

        class Block {
            STATES = { ACTIVE: 'active', STOPPED: 'stopped', MISSED: 'missed' }; MOVE_AMOUNT = 12;
            dimension = { width: 0, height: 0, depth: 0 }; position = { x: 0, y: 0, z: 0 };
            mesh: any; state: string; index: number; speed: number; direction: number; color: any; material: any;
            workingPlane: string; workingDimension: string; targetBlock: Block;
            constructor(block: Block, texture?: any) {
                this.targetBlock = block;
                this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
                this.workingPlane = this.index % 2 ? 'x' : 'z';
                this.workingDimension = this.index % 2 ? 'width' : 'depth';
                this.dimension.width = this.targetBlock ? this.targetBlock.dimension.width : 10;
                this.dimension.height = this.targetBlock ? this.targetBlock.dimension.height : 2;
                this.dimension.depth = this.targetBlock ? this.targetBlock.dimension.depth : 10;
                this.position.x = this.targetBlock ? this.targetBlock.position.x : 0;
                this.position.y = this.dimension.height * this.index;
                this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;
                
                const colorVal = 0.4 + (this.index % 10) * 0.06; // Brighter red value
                this.color = new THREE.Color(colorVal, colorVal * 0.2, colorVal * 0.2); // Purer red

                this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED;
                this.speed = -0.1 - (this.index * 0.005);
                if (this.speed < -4) this.speed = -4;
                this.direction = this.speed;
                let geometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
                geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2));
                const materialProps: any = { color: this.color };
                if (texture) {
                    materialProps.map = texture;
                }
                this.material = new THREE.MeshPhongMaterial(materialProps);
                this.mesh = new THREE.Mesh(geometry, this.material);
                this.mesh.position.set(this.position.x, this.position.y, this.position.z);
                if (this.state == this.STATES.ACTIVE) { (this.position as any)[this.workingPlane] = Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT; }
            }
            reverseDirection = () => { this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed); }
            place = () => {
                this.state = this.STATES.STOPPED;
                let overlap = (this.targetBlock.dimension as any)[this.workingDimension] - Math.abs((this.position as any)[this.workingPlane] - (this.targetBlock.position as any)[this.workingPlane]);
                let blocksToReturn: any = { plane: this.workingPlane, direction: this.direction };
                if ((this.dimension as any)[this.workingDimension] - overlap < 0.3) {
                    overlap = (this.dimension as any)[this.workingDimension];
                    blocksToReturn.bonus = true;
                    this.position.x = this.targetBlock.position.x;
                    this.position.z = this.targetBlock.position.z;
                    (this.dimension as any).width = (this.targetBlock.dimension as any).width;
                    (this.dimension as any).depth = (this.targetBlock.dimension as any).depth;
                }
                if (overlap > 0) {
                    let choppedDimensions = { width: this.dimension.width, height: this.dimension.height, depth: this.dimension.depth };
                    (choppedDimensions as any)[this.workingDimension] -= overlap;
                    (this.dimension as any)[this.workingDimension] = overlap;
                    let placedGeometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
                    placedGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2));
                    let placedMesh = new THREE.Mesh(placedGeometry, this.material);
                    let choppedGeometry = new THREE.BoxGeometry((choppedDimensions as any).width, (choppedDimensions as any).height, (choppedDimensions as any).depth);
                    choppedGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation((choppedDimensions as any).width / 2, (choppedDimensions as any).height / 2, (choppedDimensions as any).depth / 2));
                    let choppedMesh = new THREE.Mesh(choppedGeometry, this.material);
                    let choppedPosition = { x: this.position.x, y: this.position.y, z: this.position.z };
                    if ((this.position as any)[this.workingPlane] < (this.targetBlock.position as any)[this.workingPlane]) { (this.position as any)[this.workingPlane] = (this.targetBlock.position as any)[this.workingPlane] }
                    else { (choppedPosition as any)[this.workingPlane] += overlap; }
                    placedMesh.position.set(this.position.x, this.position.y, this.position.z);
                    choppedMesh.position.set((choppedPosition as any).x, (choppedPosition as any).y, (choppedPosition as any).z);
                    blocksToReturn.placed = placedMesh;
                    if (!blocksToReturn.bonus) blocksToReturn.chopped = choppedMesh;
                } else { this.state = this.STATES.MISSED; }
                (this.dimension as any)[this.workingDimension] = overlap; return blocksToReturn;
            }
            tick = () => {
                if (this.state == this.STATES.ACTIVE) {
                    let value = (this.position as any)[this.workingPlane];
                    if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT) this.reverseDirection();
                    (this.position as any)[this.workingPlane] += this.direction;
                    (this.mesh.position as any)[this.workingPlane] = (this.position as any)[this.workingPlane];
                }
            }
        }
        
        class Game {
            STATES = { 'LOADING': 'loading', 'PLAYING': 'playing', 'READY': 'ready', 'ENDED': 'ended' };
            blocks: Block[] = []; state: string = this.STATES.LOADING; stage: Stage;
            newBlocks: any; placedBlocks: any; choppedBlocks: any; mainContainer: any;
            texture: any;
            constructor() {
                this.stage = new Stage();
                this.mainContainer = containerRef.current;
                this.newBlocks = new THREE.Group(); this.placedBlocks = new THREE.Group(); this.choppedBlocks = new THREE.Group();
                this.stage.add(this.newBlocks); this.stage.add(this.placedBlocks); this.stage.add(this.choppedBlocks);
                const loader = new THREE.TextureLoader();
                this.texture = loader.load('https://i.postimg.cc/wMnxDzFH/Whats-App-Image-2025-10-14-at-22-40-58-a9024be3.jpg');
                this.addBlock();
                this.tick();
                this.updateState(this.STATES.READY);
                this.mainContainer.addEventListener('click', (e: any) => this.onAction());
            }
            updateState(newState: string) { this.state = newState; }
            onAction() {
                switch (this.state) {
                    case this.STATES.READY: this.startGame(); break;
                    case this.STATES.PLAYING: this.placeBlock(); break;
                    case this.STATES.ENDED: this.restartGame(); break;
                }
            }
            startGame() {
                if (this.state != this.STATES.PLAYING) {
                    this.updateState(this.STATES.PLAYING);
                    this.addBlock();
                }
            }
            restartGame = () => {
                this.blocks.forEach(b => {
                    if(b.mesh) {
                        this.newBlocks.remove(b.mesh);
                        this.placedBlocks.remove(b.mesh);
                    }
                });
                this.blocks = [];
                this.placedBlocks.children = [];
                this.newBlocks.children = [];
                setScore(0);
                this.addBlock();
                this.stage.setCamera(2, 0.3);
                this.updateState(this.STATES.READY);
            }
            placeBlock() {
                let currentBlock = this.blocks[this.blocks.length - 1];
                let newBlocks: any = currentBlock.place();
                this.newBlocks.remove(currentBlock.mesh);
                if (newBlocks.placed) this.placedBlocks.add(newBlocks.placed);
                if (newBlocks.chopped) {
                    this.choppedBlocks.add(newBlocks.chopped);
                    TweenLite.to(newBlocks.chopped.position, 1, { y: '-=30', ease: Power1.easeIn, onComplete: () => this.choppedBlocks.remove(newBlocks.chopped) });
                }
                this.addBlock();
            }
            addBlock() {
                let lastBlock = this.blocks[this.blocks.length - 1];
                if (lastBlock && lastBlock.state == lastBlock.STATES.MISSED) { return this.endGame(); }
                const newScore = this.blocks.length -1;
                setScore(newScore);
                let newKidOnTheBlock = new Block(lastBlock, this.texture);
                this.newBlocks.add(newKidOnTheBlock.mesh);
                this.blocks.push(newKidOnTheBlock);
                this.stage.setCamera(this.blocks.length * 2);
            }
            endGame() {
                this.updateState(this.STATES.ENDED);
                const finalScore = this.blocks.length - 2;
                const storedHighScore = parseInt(localStorage.getItem('towerBuilderHighScore') || '0', 10);
                if(finalScore > storedHighScore) {
                    setHighScore(finalScore);
                    localStorage.setItem('towerBuilderHighScore', finalScore.toString());
                }
            }
            tick = () => {
                if (this.blocks.length > 0) this.blocks[this.blocks.length - 1].tick();
                this.stage.render();
                requestAnimationFrame(this.tick);
            }
        }
        
        gameInstance.current = new Game();
    }, []);

    return (
        <Section title="Pagoda Builder" icon={<GamepadIcon />}>
            <p className="mb-4 text-center">Click to stack the pagoda blocks. How high can you build under the crimson moon?</p>
            <div className="bg-black/50 p-4 rounded-sm flex flex-col items-center relative">
                 <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
                    <button onClick={handleRestart} className="p-2 bg-red-800/70 rounded-full hover:bg-red-700 transition-colors">
                        <RefreshCwIcon />
                    </button>
                </div>
                 <div className="text-xl font-zcool mb-2 text-center absolute top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="text-gray-400">High Score: {highScore}</span>
                    <span className="mx-4">|</span>
                    <span className="text-white text-3xl">Score: {score}</span>
                </div>
                <div id="tower-game-container" ref={containerRef} className="relative w-full h-[500px] cursor-pointer">
                    {/* Game canvas is appended here */}
                </div>
            </div>
        </Section>
    );
};

export default TowerBuilderGame;