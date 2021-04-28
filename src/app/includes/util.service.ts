import { Injectable } from '@angular/core';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Scene } from 'three-full/sources/scenes/Scene';
import { WebGLRenderer } from 'three-full/sources/renderers/WebGLRenderer';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three-full/sources/cameras/PerspectiveCamera';

@Injectable( {
  providedIn: 'root'
} )
export class UtilService {

  private stats: Stats;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private animation: any;
  private camera: PerspectiveCamera;

  constructor() {
  }

  public randomAngle( max: number, min: number ): number {
    return Math.random() * ( max - min ) + min;
  }

  /**
   * ThreeJS Statistics
   * @param _stats Stats Object
   */
  public addStats( _stats: ( scene: Stats ) => void ): Stats | void {
    this.stats = new Stats();
    this.stats.dom.style.position = 'absolute';
    _stats( this.stats );

    return this.stats;
  }

  /**
   * ThreeJS Scene
   * @param _scene Scene Object
   */
  public addScene( _scene: ( scene: Scene ) => void ): Scene {
    this.scene = new Scene();
    _scene( this.scene );

    return this.scene;
  }

  public addRender(
    _render: ( renderer: WebGLRenderer ) => void
  ): void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( devicePixelRatio );
    this.renderer.setSize( innerWidth, innerHeight );
    _render( this.renderer );
  }

  public addAnimation( _animation: () => void ): void {
    this.animation = () => {
      requestAnimationFrame( this.animation );
      _animation();
      this.renderer.render( this.scene, this.camera );
    };
  }

  public addPerspectiveCamera( near: number, far: number, _camera: ( camera ) => void ): PerspectiveCamera {
    this.camera = new PerspectiveCamera( 75, innerWidth / innerHeight, near, far );
    this.camera.position.y = -300;
    this.camera.position.x = 0;
    this.camera.position.z = 900;

    _camera( this.camera );

    return this.camera;
  }
}
