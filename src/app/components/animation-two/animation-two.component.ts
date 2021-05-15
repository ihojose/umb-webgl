import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Scene } from 'three-full/sources/scenes/Scene';
import { PerspectiveCamera } from 'three-full/sources/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three-full/sources/renderers/WebGLRenderer';
import { OrbitControls } from 'three-full/sources/controls/OrbitControls';
import { UtilService } from '../../includes/util.service';

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

  constructor( private gl: UtilService ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
