import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { UtilService } from '../../includes/util.service';
import { PerspectiveCamera } from 'three-full/sources/cameras/PerspectiveCamera';

@Component( {
  selector: 'app-teacup',
  templateUrl: './teacup.component.html',
  styleUrls: [ './teacup.component.scss' ]
} )
export class TeacupComponent implements OnInit, AfterViewInit {

  @ViewChild( 'container' )
  public container: ElementRef;
  public stats: Stats;
  public camera: PerspectiveCamera;

  constructor( private gl: UtilService ) {
  }

  ngOnInit(): void {

    // Stats
    this.stats = this.gl.addStats( s => {
    } );

    // Scene
    this.gl.addScene( s => {

      const loader = new GLTFLoader();

      loader.load( './assets/tetera.glb', gltf => {

        gltf.scene.traverse( child => {
          if ( child.type === 'Mesh' ) {
            const m = child;
            m.receiveShadow = true;
            m.castShadow = true;
          }
          if ( child.type === 'SpotLight' ) {
            const l = child;
            l.castShadow = true;
            l.shadow.bias = -.003;
          }
        } );

        s.add( gltf.scene );
      }, undefined, error => {
        console.error( error );
      } );

    } );

  }

  ngAfterViewInit(): void {

    // Renderer
    this.gl.addRender( r => {
      this.container.nativeElement.appendChild( r.domElement );
      this.container.nativeElement.appendChild( this.stats.dom );
    } );
  }
}
