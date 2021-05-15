import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as THREE from 'three';
import { Scene } from 'three-full/sources/scenes/Scene';
import { PerspectiveCamera } from 'three-full/sources/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three-full/sources/renderers/WebGLRenderer';
import { OrbitControls } from 'three-full/sources/controls/OrbitControls';
import { UtilService } from '../../includes/util.service';
import { AmbientLight } from 'three-full/sources/lights/AmbientLight';
import { SpotLight } from 'three-full/sources/lights/SpotLight';
import { BoxGeometry } from 'three-full/sources/geometries/BoxGeometry';
import { MeshPhongMaterial } from 'three-full/sources/materials/MeshPhongMaterial';
import { BackSide, DoubleSide } from 'three-full/sources/constants';
import { Mesh } from 'three-full/sources/objects/Mesh';
import { FBXLoader } from 'three-full/sources/loaders/FBXLoader';
import { AnimationMixer } from 'three-full/sources/animation/AnimationMixer';
import { MeshLambertMaterial } from 'three-full/sources/materials/MeshLambertMaterial';
import { AnimationAction } from 'three-full/sources/animation/AnimationAction';
import { Clock } from 'three-full/sources/core/Clock';
import { IcosahedronGeometry } from 'three-full/sources/geometries/IcosahedronGeometry';
import { GridHelper } from 'three-full/sources/helpers/GridHelper';
import { PlaneGeometry } from 'three-full/sources/geometries/PlaneGeometry';

@Component( {
  selector: 'app-animation-two',
  templateUrl: './animation-two.component.html',
  styleUrls: [ './animation-two.component.scss' ]
} )
export class AnimationTwoComponent implements OnInit, AfterViewInit {

  @ViewChild( 'container' )
  public container: ElementRef;

  public stats: Stats;
  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public controls: OrbitControls;
  public animation: () => void | FrameRequestCallback;
  public loader: FBXLoader;
  public mixer: AnimationMixer;
  public clock: Clock;

  constructor( private gl: UtilService ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.clock = new Clock();
    this.addStats();
    this.addScene();
    this.addCamera();
    this.addRender();
    this.addControls();
    this.addHelpers();
    this.addLights();
    this.addPlane();
    this.addDome();
    this.addFBXCharacter();
    this.addAnimation();
  }

  private addAnimation(): void {
    this.animation = () => {
      requestAnimationFrame( this.animation );

      if ( this.mixer ) {
        this.mixer.update( this.clock.getDelta() );
      }

      // In final
      this.stats.update();
      this.renderer.render( this.scene, this.camera );
    };

    this.animation();
  }

  private addFBXCharacter(): void {
    this.loader = new FBXLoader();


    this.loader.load( './assets/mygirl.fbx', object => {
      this.mixer = new AnimationMixer( object );
      const action: AnimationAction = this.mixer.clipAction( object.animations[ 0 ] );

      action.play();

      object.traverse( child => {
        if ( child.isMesh ) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      } );

      // object.position.set( 5, 5, -8 );
      // object.scale.set( .1, .1, .1 );

      this.scene.add( object );
      object.updateMatrix();
    } );
  }

  private addHelpers(): void {
    const gridXZ = new GridHelper( 6, 10 );
    this.scene.add( gridXZ );
  }

  private addPlane(): void {
    const planeGeometry = new PlaneGeometry( 6, 6 );
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

  private addLights(): void {
    const light: AmbientLight = new AmbientLight( 0xffffff, .3 );
    light.position.set( 0, 0, 2 );
    this.scene.add( light );

    const spotlight: SpotLight = new SpotLight( 0xffffff, .2 );
    spotlight.position.set( 0, 0, 2 );
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = innerWidth;
    spotlight.shadow.mapSize.height = innerHeight;
    this.scene.add( spotlight );
  }

  private addControls(): void {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.dampingFactor = .5;
    this.controls.enableDamping = true;
    this.controls.enabled = true;
  }

  private addRender(): void {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio( devicePixelRatio );
    this.renderer.setSize( innerWidth, innerHeight );
    this.container.nativeElement.appendChild( this.renderer.domElement );
    this.container.nativeElement.appendChild( this.stats.dom );
  }

  private addCamera(): void {
    this.camera = new PerspectiveCamera( 70, innerWidth / innerHeight, 1, 3000 );
    this.camera.position.x = 1.5;
    this.camera.position.y = 1.5;
    this.camera.position.z = 2.5;
  }

  private addScene(): void {
    this.scene = new Scene();
  }

  private addStats(): void {
    this.stats = new Stats();
    this.stats.dom.style.position = 'absolute';
  }
}
