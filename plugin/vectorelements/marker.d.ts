import { IProjection } from '../projections/projection';
import { MapPos } from '../core/core';
import { BasePointVectorElement, BaseVectorElementStyleBuilder, PointVectorElementOptions, VectorElementOptions } from './vectorelements';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { ImageSource } from 'tns-core-modules/image-source/image-source';
import { Geometry } from '../geometry/geometry';
import { Color } from 'tns-core-modules/color/color';
import { BillboardOrientation, BillboardScaling } from './vectorelements';

export class MarkerStyleBuilderOptions extends VectorElementOptions {
    size?: number;
    placementPriority?: number;
    bitmap?: string | ImageSource | ImageAsset;
    color?: string | Color;
    anchorPointX?: number;
    anchorPointY?: number;
    clickSize?: number;
    scalingMode?: BillboardScaling;
    scaleWithDPI?:boolean
    orientationMode?: BillboardOrientation;
}
export class MarkerStyleBuilder<T, U extends MarkerStyleBuilderOptions> extends BaseVectorElementStyleBuilder<any, MarkerStyleBuilderOptions> {
    constructor(options: U);
    buildStyle(): any;
}

export class MarkerOptions extends PointVectorElementOptions {
    rotation?: number;
    styleBuilder?: MarkerStyleBuilder<any, any>;
    style?: any;
    geometry?: Geometry;
}
export class Marker extends BasePointVectorElement<any, MarkerOptions> {
    styleBuilder?: MarkerStyleBuilder<any, any>;
    style?: any;
    size?: number;
    placementPriority?: number;
    bitmap?: string | ImageSource | ImageAsset;
    color?: string | Color;
    anchorPointX?: number;
    anchorPointY?: number;
    clickSize?: number;
    scalingMode?: BillboardScaling;
    orientationMode?: BillboardOrientation;
}