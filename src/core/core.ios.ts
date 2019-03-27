import { MapBounds, MapPos, ScreenBounds, ScreenPos } from './core';

export enum CartoMapStyle {
    VOYAGER = NTCartoBaseMapStyle.T_CARTO_BASEMAP_STYLE_VOYAGER,
    POSITRON = NTCartoBaseMapStyle.T_CARTO_BASEMAP_STYLE_POSITRON,
    DARKMATTER = NTCartoBaseMapStyle.T_CARTO_BASEMAP_STYLE_DARKMATTER
}

export enum ClickType {
    SINGLE = NTClickType.T_CLICK_TYPE_SINGLE,
    LONG = NTClickType.T_CLICK_TYPE_LONG,
    DOUBLE = NTClickType.T_CLICK_TYPE_DOUBLE,
    DUAL = NTClickType.T_CLICK_TYPE_DUAL
}

export function nativeVectorToArray<T>(vector: NativeVector<T>) {
    const result: T[] = [];
    for (let index = 0; index < vector.size(); index++) {
        result[index] = vector.get(index);
    }
    return result;
}
export function fromNativeMapPos(position: NTMapPos) {
    return {
        latitude: position.getY(),
        longitude: position.getX(),
        altitude: position.getZ()
    } as MapPos;
}
export function toNativeMapPos(position: MapPos) {
    //  ignore z for now as points can get under the map!
    return NTMapPos.alloc().initWithXY(position.longitude, position.latitude);
}
export function fromNativeScreenPos(position: NTScreenPos) {
    return {
        x: position.getY(),
        y: position.getX()
    } as ScreenPos;
}
export function toNativeScreenPos(position: ScreenPos) {
    //  ignore z for now as points can get under the map!
    return NTScreenPos.alloc().initWithXY(position.x, position.y);
}

export function fromNativeMapBounds(bounds: NTMapBounds) {
    return {
        southwest: fromNativeMapPos(bounds.getMin()),
        northeast: fromNativeMapPos(bounds.getMax())
    } as MapBounds;
}
export function toNativeMapBounds(bounds: MapBounds) {
    return NTMapBounds.alloc().initWithMinMax(toNativeMapPos(bounds.southwest), toNativeMapPos(bounds.northeast));
}

export function fromNativeScreenBounds(bounds: NTScreenBounds) {
    return {
        min: fromNativeScreenPos(bounds.getMin()),
        max: fromNativeScreenPos(bounds.getMax())
    } as ScreenBounds;
}
export function toNativeScreenBounds(bounds: ScreenBounds) {
    if (bounds) {
        return NTScreenBounds.alloc().initWithMinMax(toNativeScreenPos(bounds.min), toNativeScreenPos(bounds.max));
    }
    return NTScreenBounds.alloc().init();
}

export abstract class NativeVector<T> {
    native: any;
    size() {
        return this.native.size();
    }
    public reserve(size: number) {
        return this.native.reserve(size);
    }
    public get(index: number): T {
        return this.native.get(index);
    }
    public add(position: T) {
        return this.native.add(position);
    }
    public capacity() {
        return this.native.capacity();
    }
    public clear() {
        return this.native.capacity();
    }
    public isEmpty() {
        return this.native.isEmpty();
    }
    public set(index: number, position: T) {
        return this.native.setVal(index, position);
    }
    public getNative() {
        return this.native;
    }
}
export class MapPosVector extends NativeVector<NTMapPos> {
    native: NTMapPosVector;
    constructor(size?: number) {
        super();
        this.native = NTMapPosVector.alloc().init();
    }

    public add(position: NTMapPos | MapPos) {
        if ((position as any).latitude) {
            position = toNativeMapPos(position as MapPos);
        }
        return this.native.add(position as NTMapPos);
    }
}
export class MapPosVectorVector extends NativeVector<NTMapPosVector> {
    native: NTMapPosVectorVector;
    constructor(size?: number) {
        super();
        this.native = NTMapPosVectorVector.alloc().init();
    }
    public add(position: NTMapPosVector | MapPosVector) {
        if (position instanceof MapPosVector) {
            return this.native.add(position.getNative());
        }
        return this.native.add(position);
    }
}
