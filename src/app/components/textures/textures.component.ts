import { Component, OnInit } from '@angular/core';
import { PerspectiveCamera } from 'three-full/sources/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three-full/sources/renderers/WebGLRenderer';
import { Scene } from 'three-full/sources/scenes/Scene';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three-full/sources/controls/OrbitControls';
import { PlaneGeometry } from 'three-full/sources/geometries/PlaneGeometry';
import { MeshPhongMaterial } from 'three-full/sources/materials/MeshPhongMaterial';
import { DoubleSide, RepeatWrapping } from 'three-full/sources/constants';
import { Mesh } from 'three-full/sources/objects/Mesh';
import { DirectionalLight } from 'three-full/sources/lights/DirectionalLight';
import { AmbientLight } from 'three-full/sources/lights/AmbientLight';
import { ImageUtils } from 'three-full/sources/ImageUtils';
import * as THREE from 'three';
import { MeshLambertMaterial } from 'three-full/sources/materials/MeshLambertMaterial';

@Component( {
  selector: 'app-textures',
  templateUrl: './textures.component.html',
  styleUrls: [ './textures.component.scss' ]
} )
export class TexturesComponent implements OnInit {

  public container: HTMLElement;
  public w: number;
  public h: number;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public scene: Scene;
  public stats: Stats;
  public controls: OrbitControls;
  public animation: any;

  constructor() {
    this.w = innerWidth;
    this.h = innerHeight;
  }

  ngOnInit(): void {
    this.initStats();
    this.addScene();
    this.addCamera();
    this.render( () => {

      // Drawing
      this.addLights();
      this.addPlane();

      // End
      this.addControls();
      this.animate();
    } );
  }

  private addPlane(): void {
    const texture = THREE.ImageUtils.loadTexture( './assets/wall.jpg' );
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set( 1, 1 );

    const material = new MeshLambertMaterial( { map: texture } );

    const planeGeometry = new PlaneGeometry( 1024, 512 );
    const plane = new Mesh( planeGeometry, material );
    // plane.rotation.x = Math.PI / 2;
    this.scene.add( plane );
  }

  private addLights(): void {
    let light = new DirectionalLight();
    light.position.set( 1, 1, 1 );
    this.scene.add( light );

    light = new DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    this.scene.add( light );

    const light2 = new AmbientLight( 0x222222 );
    this.scene.add( light2 );
  }

  private addControls(): void {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    // this.controls.minDistance = 3;
    // this.controls.maxDistance = 10;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.5;
    this.controls.screenSpacePanning = true;
  }

  private addCamera(): void {
    this.camera = new PerspectiveCamera( 75, this.w / this.h, 1, 3000 );
    this.camera.position.y = -300;
    this.camera.position.x = 0;
    this.camera.position.z = 900;
  }

  private addScene(): void {
    this.scene = new Scene();
  }

  private initStats(): void {
    this.stats = new Stats();
    this.stats.dom.style.position = 'absolute';
  }

  public animate(): void {
    this.animation = () => {
      requestAnimationFrame( this.animation );

      this.stats.update();

      this.endRender();
    };

    this.animation();
  }

  private endRender(): void {
    this.renderer.render( this.scene, this.camera );
  }

  private render( draw: () => void = () => null ): void {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio( devicePixelRatio );
    this.renderer.setSize( this.w, this.h );
    this.container = document.getElementById( 'container' );
    this.container.appendChild( this.renderer.domElement );
    this.container.appendChild( this.stats.dom );

    draw();
  }
}
