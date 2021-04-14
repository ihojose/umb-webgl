import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three-full/sources/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three-full/sources/renderers/WebGLRenderer';
import { Scene } from 'three-full/sources/scenes/Scene';
import { Color } from 'three-full/sources/math/Color';
import { BoxGeometry } from 'three-full/sources/geometries/BoxGeometry';
import { MeshBasicMaterial } from 'three-full/sources/materials/MeshBasicMaterial';
import { Mesh } from 'three-full/sources/objects/Mesh';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three-full/sources/controls/OrbitControls';
import { Matrix4 } from 'three-full/sources/math/Matrix4';
import { FogExp2 } from 'three-full/sources/scenes/FogExp2';
import { GridHelper } from 'three-full/sources/helpers/GridHelper';
import { DirectionalLight } from 'three-full/sources/lights/DirectionalLight';
import { AmbientLight } from 'three-full/sources/lights/AmbientLight';
import { IcosahedronGeometry } from 'three-full/sources/geometries/IcosahedronGeometry';
import { MeshPhongMaterial } from 'three-full/sources/materials/MeshPhongMaterial';
import { BackSide, DoubleSide } from 'three-full/sources/constants';
import { PlaneGeometry } from 'three-full/sources/geometries/PlaneGeometry';
import * as gsap from 'gsap';

@Component( {
  selector: 'app-complements',
  templateUrl: './complements.component.html',
  styleUrls: [ './complements.component.scss' ]
} )
export class ComplementsComponent implements OnInit {

  public canvas: HTMLCanvasElement;
  public w: number;
  public h: number;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public scene: Scene;
  public animation;
  public stats: Stats;
  public controls: OrbitControls;
  public boxes: any[] = [];

  constructor() {
    this.w = innerWidth;
    this.h = innerHeight;
  }

  ngOnInit(): void {

    this.stats = new Stats();
    this.stats.dom.style.position = 'absolute';

    this.addScene();
    this.addCamera();

    this.render( () => {
      this.addHelpers();
      this.addLights();
      this.addDome();
      this.addPlane();
      this.addBuilding();

      this.addControls();

      this.animate();
    } );
  }

  private render( draw: () => void = () => null ): void {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio( devicePixelRatio );
    this.renderer.setSize( this.w, this.h );
    document.getElementById( 'container' ).appendChild( this.renderer.domElement );
    document.getElementById( 'container' ).appendChild( this.stats.dom );
    this.renderer.setClearColor( this.scene.fog.color );

    draw();
  }

  private addControls(): void {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    // this.controls.minDistance = 3;
    // this.controls.maxDistance = 10;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.5;
    this.controls.screenSpacePanning = true;
  }

  private endRender(): void {
    this.renderer.render( this.scene, this.camera );
  }

  private addCamera(): void {
    this.camera = new PerspectiveCamera( 75, this.w / this.h, 1, 1000 );
    this.camera.position.y = 250;
    this.camera.position.x = 250;
    this.camera.position.z = 80;
  }

  private addScene(): void {
    this.scene = new Scene();
    this.scene.fog = new FogExp2( 0xffffff, 0.002 );
  }

  private addBuilding(): void {
    const geometry = new BoxGeometry( 10, 10, 10 );
    for ( let i = 0; i < 100; i++ ) {
      const material = new MeshPhongMaterial( {
        color: [ 0xfb3550, 0xffffff, 0x000000 ][ Math.random() * 3 | 0 ],
        flatShading: true
      } );
      this.boxes.push( new Mesh( geometry, material ) );
      this.scene.add( this.boxes[ i ] );
    }

    // Var Boxes
    this.boxes.forEach( box => {
      const t = Math.random() * 0.6 + 0.3;
      gsap.TweenMax.to( box.scale, t, {
        x: 1 + Math.random() * 3,
        y: 1 + Math.random() * 20 + ( Math.random() < 0.1 ? 15 : 0 ),
        z: 1 + Math.random() * 3,
        ease: gsap.Power2.easeInOut
      } );
      gsap.TweenMax.to( box.position, t, {
        x: -200 + Math.random() * 400,
        z: -200 + Math.random() * 400,
        ease: gsap.Power2.easeInOut
      } );
    } );
  }

  private addPlane(): void {
    const planeGeometry = new PlaneGeometry( 600, 600 );
    const planeMaterial = new MeshPhongMaterial( {
      color: 0x222A38,
      transparent: true,
      opacity: 0.8,
      flatShading: true,
      side: DoubleSide
    } );
    const plane = new Mesh( planeGeometry, planeMaterial );
    plane.rotation.x = Math.PI / 2;
    this.scene.add( plane );
  }

  private addDome(): void {
    const domeGeometry = new IcosahedronGeometry( 700, 1 );
    const domeMaterial = new MeshPhongMaterial( {
      color: 0xfb3550,
      flatShading: true,
      side: BackSide
    } );
    const dome = new Mesh( domeGeometry, domeMaterial );
    this.scene.add( dome );
  }

  private addHelpers(): void {
    const gridXZ = new GridHelper( 600, 10 );
    this.scene.add( gridXZ );
  }

  private addLights(): void {
    let light = new DirectionalLight();
    light.position.set( 1, 1, 1 );
    this.scene.add( light );

    light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    this.scene.add( light );

    const light2 = new AmbientLight( 0x222222 );
    this.scene.add( light2 );
  }

  public animate(): void {
    this.animation = () => {
      requestAnimationFrame( this.animation );

      this.stats.update();

      this.endRender();
    };

    this.animation();
  }
}
