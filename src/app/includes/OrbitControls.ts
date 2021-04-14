/**
 * Copyright (c) 2021 Banco de Bogotá. All Rights Reserved.
 * <p>
 * UMBTallerWebGL was developed by Core Banking BDB.
 * <p>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * proprietary and confidential. For use this code you need to contact to
 * Banco de Bogotá and request exclusive use permission.
 * <p>
 * This file was write by Jose Buelvas <jbuelva@bancodebogota.com.co>.
 */
import { Camera, MOUSE, TOUCH, Vector3 } from 'three';

export class OrbitControls {

  // @ts-ignore
  constructor( object: Camera, domElement?: HTMLElement );

  object: Camera;
  domElement: HTMLElement | HTMLDocument;
  enabled: boolean;
  target: Vector3;
  center: Vector3;

  minDistance: number;
  maxDistance: number;

  minZoom: number;
  maxZoom: number;

  minPolarAngle: number;
  maxPolarAngle: number;

  minAzimuthAngle: number;
  maxAzimuthAngle: number;

  enableDamping: boolean;
  dampingFactor: number;

  enableZoom: boolean;
  zoomSpeed: number;

  enableRotate: boolean;
  rotateSpeed: number;

  enablePan: boolean;
  panSpeed: number;
  screenSpacePanning: boolean;
  keyPanSpeed: number;

  autoRotate: boolean;
  autoRotateSpeed: number;

  enableKeys: boolean;
  keys: { LEFT: number; UP: number; RIGHT: number; BOTTOM: number; };
  mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE; };
  touches: { ONE: TOUCH; TWO: TOUCH };

  // @ts-ignore
  update(): boolean;

  // @ts-ignore
  saveState(): void;

  // @ts-ignore
  reset(): void;

  // @ts-ignore
  dispose(): void;

  // @ts-ignore
  getPolarAngle(): number;

  // @ts-ignore
  getAzimuthalAngle(): number;

  // @ts-ignore
  addEventListener( type: string, listener: ( event: any ) => void ): void;

  // @ts-ignore
  hasEventListener( type: string, listener: ( event: any ) => void ): boolean;

  // @ts-ignore
  removeEventListener( type: string, listener: ( event: any ) => void ): void;

  // @ts-ignore
  dispatchEvent( event: { type: string; target: any; } ): void;

}

export class MapControls extends OrbitControls {

  // @ts-ignore
  constructor( object: Camera, domElement?: HTMLElement );

}
