import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { AmbientLight } from 'three-full/sources/lights/AmbientLight';
import { SpotLight } from 'three-full/sources/lights/SpotLight';
import { MeshBasicMaterial } from 'three-full/sources/materials/MeshBasicMaterial';
import { SphereGeometry } from 'three-full/sources/geometries/SphereGeometry';
import { UtilService } from '../../includes/util.service';

@Component( {
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: [ './partial.component.scss' ],
} )
export class PartialComponent implements OnInit, AfterViewInit {

  @ViewChild( 'container' )
  public container: ElementRef;

  @ViewChild( 'scoreOne' )
  public scoreOne: ElementRef;

  @ViewChild( 'scoreTwo' )
  public scoreTow: ElementRef;

  public stats: Stats;
  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public controls: OrbitControls;
  public animation: () => void | FrameRequestCallback;
  public ball: Mesh;
  public playerOne: Mesh;
  public playerTwo: Mesh;
  public topBarrier: Mesh;
  public bottomBarrier: Mesh;
  public lock: number;
  public ballSpeed: number;
  public ballAngle: number;
  public aiSpeed: number;
  public score: { playerOne: number, playerTow: number };
  public keyState: any = {};

  constructor( private gl: UtilService ) {
    this.lock = 0;
    this.ballSpeed = 0.1;
    this.aiSpeed = 0.041;
    this.ballAngle = Math.PI;
    this.score = {
      playerOne: 0,
      playerTow: 0
    };
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
    this.playerTwo = new Mesh( geometry, material );
    this.playerTwo.position.x = 5 / 2;
    this.scene.add( this.playerTwo );
  }

  private addPlayerOne(): void {
    const geometry: BoxGeometry = new BoxGeometry( .1, .5, .1 );
    const material: MeshPhongMaterial = new MeshPhongMaterial( { color: 0x005000 } );
    this.playerOne = new Mesh( geometry, material );
    this.playerOne.position.x = -5 / 2;
    this.scene.add( this.playerOne );
  }

  private addLowHorizontalDecoration(): void {
    const geometry: BoxGeometry = new BoxGeometry( 5.1, .05, .1 );
    const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xCCCCCC, side: DoubleSide } );
    this.bottomBarrier = new Mesh( geometry, material );
    this.bottomBarrier.position.y = -3 / 2 - 0.025;
    this.scene.add( this.bottomBarrier );
  }

  private addTopHorizontalDecoration(): void {
    const geometry: BoxGeometry = new BoxGeometry( 5.1, .05, .1 );
    const material: MeshBasicMaterial = new MeshBasicMaterial( { color: 0xCCCCCC, side: DoubleSide } );
    this.topBarrier = new Mesh( geometry, material );
    this.topBarrier.position.y = 3 / 2 + 0.025;
    this.scene.add( this.topBarrier );
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
    this.controls.enableDamping = false;
    this.controls.enabled = false;
  }

  private addScene(): void {
    this.scene = new Scene();
  }

  private addCamera(): void {
    this.camera = new PerspectiveCamera( 70, innerWidth / innerHeight, 1, 3000 );
    this.camera.position.x = 0;
    this.camera.position.y = -3;
    this.camera.position.z = 3;
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

      // Other Elements
      this.ball.position.x += this.ballSpeed * Math.cos( this.ballAngle );
      this.ball.position.y += this.ballSpeed * Math.sin( this.ballAngle );

      // Coalitions
      this.checkCoalitionWithPlayerOne();
      this.checkCoalitionWithPlayerTwo();
      this.checkCoalitionWithTopBarrier();
      this.checkCoalitionWithBottomBarrier();
      this.aiPlayerTow();
      this.checkGoal();

      // To Final
      this.stats.update();
      this.renderer.render( this.scene, this.camera );
    };

    this.animation();
  }

  private checkCoalitionWithPlayerOne(): void {
    if (
      ( this.ball.position.x < this.playerOne.position.x - ( 0.1 / 2 ) )
      && ( this.ball.position.y < ( this.playerOne.position.y + 0.5 / 2 ) )
      && ( this.ball.position.y > ( this.playerOne.position.y - 0.5 / 2 ) )
    ) {
      if ( this.lock === 0 ) {
        this.ball.position.x = this.playerOne.position.x + ( 0.1 / 2 );
        this.ballSpeed = -this.ballSpeed;
        this.ballAngle = this.gl.randomAngle( -Math.PI / 5, Math.PI / 5 );
      }
    }
  }

  private checkCoalitionWithPlayerTwo(): void {
    if (
      ( this.ball.position.x > this.playerTwo.position.x - ( 0.1 / 2 ) )
      && ( this.ball.position.y < ( this.playerTwo.position.y + 0.5 / 2 ) )
      && ( this.ball.position.y > ( this.playerTwo.position.y - 0.5 / 2 ) )
    ) {
      if ( this.lock === 0 ) {
        this.ball.position.x = this.playerTwo.position.x - ( 0.1 / 2 );
        this.ballSpeed = -this.ballSpeed;
        this.ballAngle = this.gl.randomAngle( -Math.PI / 5, Math.PI / 5 );
      }
    }
  }

  private checkCoalitionWithTopBarrier(): void {
    if ( this.ball.position.y >= ( 3 / 2 ) ) {
      this.ballAngle = -this.ballAngle;
    }
  }

  private checkCoalitionWithBottomBarrier(): void {
    if ( this.ball.position.y <= -( 3 / 2 ) ) {
      this.ballAngle = -this.ballAngle;
    }
  }

  private aiPlayerTow(): void {
    if ( this.playerTwo.position.y <= ( this.ball.position.y - this.aiSpeed ) ) {
      if ( this.playerTwo.position.y < ( ( 3 / 2 ) - ( 0.5 / 2 ) ) ) {
        this.playerTwo.position.y += this.aiSpeed;
      }
    }

    if ( this.playerTwo.position.y > this.ball.position.y ) {
      if ( this.playerTwo.position.y > ( -( 3 / 2 ) + ( 0.5 / 2 ) ) ) {
        this.playerTwo.position.y -= 0.1;
      }
    }
  }

  private checkGoal(): void {

    // Goal on player one side
    if ( this.ball.position.x < -5 / 2 - 2 * 0.05 ) {

      const oldBallSpeed = this.saveBallSpeed();

      if ( this.lock === 0 ) {
        this.score.playerTow += 1;
        this.scoreTow.nativeElement.innerHTML = this.score.playerTow.toString();
        setTimeout( () => {
          this.respawnOnPlayerOne( oldBallSpeed, this.playerOne );
        }, 1000 );
        this.lock = 1;
      }

      this.ballSpeed = 0;
    }

    // Goal on player two side
    if ( this.ball.position.x > 5 / 2 + 2 * 0.05 ) {

      const oldBallSpeed = this.saveBallSpeed();

      if ( this.lock === 0 ) {
        this.score.playerOne += 1;
        this.scoreOne.nativeElement.innerHTML = this.score.playerOne;
        setTimeout( () => {
          this.respawnOnPlayerTwo( oldBallSpeed, this.playerTwo );
        }, 1000 );
        this.lock = 1;
      }

      this.ballSpeed = 0;
    }
  }

  private addStats(): void {
    this.stats = new Stats();
    this.stats.dom.style.position = 'absolute';
  }

  private saveBallSpeed(): number {
    if ( this.ballSpeed !== 0 ) {
      return this.ballSpeed;
    }
  }

  private respawnOnPlayerOne( recoverSpeed: number, playerOne: Mesh ): void {
    this.ball.position.copy( playerOne.position );
    console.log( recoverSpeed );
    this.ballSpeed = -recoverSpeed;
    this.lock = 0;
  }

  private respawnOnPlayerTwo( recoverSpeed: number, playerTwo: Mesh ): void {
    this.ball.position.copy( playerTwo.position );
    console.log( recoverSpeed );
    this.ballSpeed = -recoverSpeed;
    this.lock = 0;
  }

  @HostListener( 'document:keydown', [ '$event' ] )
  addKeyboardControls( $event: KeyboardEvent ): void {
    const key = $event.key;

    if ( key === 'ArrowUp' ) {
      if ( this.playerOne.position.y < ( ( 3 / 2 ) - ( 0.5 / 2 ) ) ) {
        this.playerOne.position.y += 0.35;
      }
    }

    if ( key === 'ArrowDown' ) {
      if ( this.playerOne.position.y > ( -( 3 / 2 ) + ( 0.5 / 2 ) ) ) {
        this.playerOne.position.y -= 0.35;
      }
    }
  }
}
