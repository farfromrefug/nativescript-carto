import { Geometry } from '.';

export interface Feature<T = DefaultLatLonKeys> {
    properties: {};
    geometry: Geometry<T> | any;
    // getProperties(): any;

    // getGeometry(): Geometry;
}

export interface VectorTileFeature extends Feature {
    id: number;
    layerName: string;
    mapTile: any;
}

export class FeatureCollection<T = DefaultLatLonKeys> {
    constructor(native: any);
    getFeature(index: number): Feature<T>;
    getGeometry(index: number): Geometry<T> | any;
    getFeatureCount(): number;
    readonly featureCount: number;
    getNative();
    getBounds(): MapBounds<T>
}
export class VectorTileFeatureCollection<T = DefaultLatLonKeys> extends FeatureCollection {
    getFeature(index: number): VectorTileFeature<T>;
}
