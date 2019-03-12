import { LineVectorElementOptions, PointVectorElementOptions, VectorElementOptions } from './vectorelements';
import { BaseNative } from '../carto.common';
import { Projection } from '../projections/projection';
import { MapPos, MapPosVector } from '../core/core';
export declare const BillboardOrientation: {
    readonly FACE_CAMERA: com.carto.styles.BillboardOrientation;
    readonly FACE_CAMERA_GROUND: com.carto.styles.BillboardOrientation;
    readonly GROUND: com.carto.styles.BillboardOrientation;
};
export declare const BillboardScaling: {
    readonly CONST_SCREEN_SIZE: com.carto.styles.BillboardScaling;
    readonly SCREEN_SIZE: com.carto.styles.BillboardScaling;
    readonly WORLD_SIZE: com.carto.styles.BillboardScaling;
};
export declare class BaseVectorElement<T extends com.carto.vectorelements.VectorElement, U extends VectorElementOptions> extends BaseNative<T, U> {
    createNative(options: U): any;
    metaData: Object;
}
export declare abstract class BasePointVectorElement<T extends com.carto.vectorelements.VectorElement & {
    getPos?(): com.carto.core.MapPos;
    setPos?(pos: com.carto.core.MapPos): any;
}, U extends PointVectorElementOptions> extends BaseNative<T, U> {
    projection?: Projection;
    position: MapPos;
    getNativePos(pos: MapPos, projection: Projection): com.carto.core.MapPos;
}
export declare abstract class BaseLineVectorElement<T extends com.carto.vectorelements.VectorElement & {
    getPoses?(): com.carto.core.MapPosVector;
    setPoses?(pos: com.carto.core.MapPosVector): any;
}, U extends LineVectorElementOptions> extends BaseNative<T, U> {
    projection?: Projection;
    positions: MapPosVector | MapPos[];
}
export declare class VectorElement extends BaseVectorElement<com.carto.vectorelements.VectorElement, VectorElementOptions> {
    createNative(): any;
}
export declare class VectorElementVector extends BaseNative<com.carto.vectorelements.VectorElementVector, any> {
    elements: Array<BaseVectorElement<any, any>>;
    createNative(): com.carto.vectorelements.VectorElementVector;
    size(): number;
    getElement(index: number): BaseVectorElement<any, any>;
    add(element: BaseVectorElement<any, any>): void;
}
