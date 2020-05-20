import { BaseNative } from '../index.common';
import { EPSG3857Options } from './epsg3857';
import { MapPos } from '../core';

export class ProjectionOptions {}
export abstract class BaseProjection<T, U extends ProjectionOptions> extends BaseNative<T, U> {}
export abstract class ProjectionClass<T, U extends ProjectionOptions> extends BaseProjection<T, U> {
    fromWgs84(position: MapPos): MapPos;
    toWgs84(position: MapPos): MapPos;
    fromLatLong(lat, lon): MapPos;
    toLatLong(x, y): MapPos;
}
export declare class Projection extends ProjectionClass<any, ProjectionOptions> {
    createNative(): any;
}

export interface IProjection extends ProjectionClass<any, any>  {
}
