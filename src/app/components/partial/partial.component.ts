import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as THREE from 'three';
import { BoxGeometry } from 'three-full/sources/geometries/BoxGeometry';
import { WebGLRenderer } from 'three-full/sources/renderers/WebGLRenderer';
import { Scene } from 'three-full/sources/scenes/Scene';
import { PerspectiveCamera } from 'three-full/sources/cameras/PerspectiveCamera';
import { OrbitControls } from 'three-full/sources/controls/OrbitControls';
import { MeshPhongMaterial } from 'three-full/sources/materials/MeshPhongMaterial';
import { DoubleSide } from 'three-full/sources/constants';
import { Mesh } from 'three-full/sources/objects/Mesh';
import { DirectionalLight } from 'three-full/sources/lights/DirectionalLight';
import { AmbientLight } from 'three-full/sources/lights/AmbientLight';
import { SpotLight } from 'three-full/sources/lights/SpotLight';
import { MeshBasicMaterial } from 'three-full/sources/materials/MeshBasicMaterial';
import { SphereGeometry } from 'three-full/sources/geometries/SphereGeometry';
import * as Matter from 'matter-js';

@Component( {
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: [ './partial.component.scss' ]
} )
export class PartialComponent implements OnInit, AfterViewInit {

  @ViewChild( 'container' )
  public container: ElementRef;
  public stats: Stats;
  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public controls: OrbitControls;
  public animation: () => void | FrameRequestCallback;
  public ball: Mesh;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.addStats();
    this.addScene();
    this.addCamera();
    this.addRender();
    this.addControls();
    this.addLights();
    this.addPlane();
    // this.addVerticalDecoration();
    this.addTopHorizontalDecoration();
    this.addLowHorizontalDecoration();
    this.addPlayerOne();
    this.addPlayerTwo();
    this.addTheBall();
    this.addAnimation();
  }

  private addTheBall(): void {
    const ballRadius = .05;
    const geometry: SphereGeometry = new SphereGeometry( ballRadius, 32, 32 );
    const material: MeshPhongMaterial = new MeshPhongMaterial( { color: 0xff0000 } );
    this.ball = new Mesh( geometry, material );
    this.ball.position.z += .05;
    this.scene.add( this.ball );
  }

  private addPlayerTwo(): void {
    const geometry: BoxGeometry = new BoxGeometry( .1, .5, .1 );
    const material: MeshPhongMaterial = new MeshPhongMaterial( { color: 0xFF8C00 } );
    const player: Mesh = new Mesh( geometry, material );
    player.position.x = 5 / 2;
    this.scene.add( player );
  }

  private addPlayerOne(): void {
    const geometry: BoxGeometry = new BoxGeometry( .1, .5, .1 );
    const material: MeshPhongMaterial = new MeshPhongMaterial( { color: 0x005000 } );
    const player: Mesh = new Mesh( geometry, material );
    player.position.x = -5 / 2;
    this.scene.add( player );
  }

  private addLowHorizontalDecoration(): void {
    const geometry: BoxGeometry = new BoxGeometry( 5.1, .05, .1 );
    const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xCCCCCC, side: DoubleSide } );
    const dec: Mesh = new Mesh( geometry, material );
    dec.position.y = -3 / 2 - 0.025;
    this.scene.add( dec );
  }

  private addTopHorizontalDecoration(): void {
    const geometry: BoxGeometry = new BoxGeometry( 5.1, .05, .1 );
    const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xCCCCCC, side: DoubleSide } );
    const dec: Mesh = new Mesh( geometry, material );
    dec.position.y = 3 / 2 + 0.025;
    this.scene.add( dec );
  }

  private addVerticalDecoration(): void {
    const geometry: BoxGeometry = new BoxGeometry( 5.1, 3, .01 );
    const material: MeshPhongMaterial = new MeshPhongMaterial( { color: 0x888888, side: DoubleSide } );
    const dec: Mesh = new Mesh( geometry, material );
    this.scene.add( dec );
  }

  private addPlane(): void {
    const geometry: BoxGeometry = new BoxGeometry( 5, 3, .01 );
    const material: MeshPhongMaterial = new MeshPhongMaterial( { color: 0x138D75, side: DoubleSide } );
    this.scene.add( new Mesh( geometry, material ) );
  }

  private addLights(): void {
    const light: AmbientLight = new AmbientLight( 0xffffff );
    this.scene.add( light );

    const spotlight: SpotLight = new SpotLight( 0xffffff );
    spotlight.position.set( 0, 0, 2 );
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = innerWidth;
    spotlight.shadow.mapSize.height = innerHeight;
    this.scene.add( spotlight );
  }

  private addControls(): void {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.dampingFactor = .5;
  }

  private addScene(): void {
    this.scene = new Scene();
  }

  private addCamera(): void {
    this.camera = new PerspectiveCamera( 70, innerWidth / innerHeight, 1, 3000 );
    this.camera.position.x = 0;
    this.camera.position.y = -3;
    this.camera.position.z = 4;
  }

  private addRender(): void {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio( devicePixelRatio );
    this.renderer.setSize( innerWidth, innerHeight );
    this.container.nativeElement.appendChild( this.renderer.domElement );
    this.container.nativeElement.appendChild( this.stats.dom );
  }

  private addAnimation(): void {
    this.animation = () => {
      requestAnimationFrame( this.animation );
      this.stats.update();
      this.renderer.render( this.scene, this.camera );
    };

    this.animation();
  }

  private addStats(): void {
    this.stats = new Stats();
    this.stats.dom.style.position = 'absolute';
  }
}
