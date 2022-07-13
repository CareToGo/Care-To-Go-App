import type { Vector } from "./Vectors";
export declare type Vec3 = readonly [number, number, number];
export declare type Matrix3 = readonly [Vec3, Vec3, Vec3];
export interface TransformProp {
    transform: Transforms2d;
}
declare type Transformations = {
    translateX: number;
    translateY: number;
    scale: number;
    skewX: string;
    skewY: string;
    scaleX: number;
    scaleY: number;
    rotateZ: string;
    rotate: string;
};
export declare type Transforms2d = (Pick<Transformations, "translateX"> | Pick<Transformations, "translateY"> | Pick<Transformations, "scale"> | Pick<Transformations, "scaleX"> | Pick<Transformations, "scaleY"> | Pick<Transformations, "skewX"> | Pick<Transformations, "skewY"> | Pick<Transformations, "rotate"> | Pick<Transformations, "rotateZ">)[];
export declare const parseAngle: (angle: string) => number;
export declare const isTranslateX: (transform: Transforms2d[0]) => transform is Pick<Transformations, "translateX">;
export declare const isTranslateY: (transform: Transforms2d[0]) => transform is Pick<Transformations, "translateY">;
export declare const isScale: (transform: Transforms2d[0]) => transform is Pick<Transformations, "scale">;
export declare const isScaleX: (transform: Transforms2d[0]) => transform is Pick<Transformations, "scaleX">;
export declare const isScaleY: (transform: Transforms2d[0]) => transform is Pick<Transformations, "scaleY">;
export declare const isSkewX: (transform: Transforms2d[0]) => transform is Pick<Transformations, "skewX">;
export declare const isSkewY: (transform: Transforms2d[0]) => transform is Pick<Transformations, "skewY">;
export declare const isRotate: (transform: Transforms2d[0]) => transform is Pick<Transformations, "rotate">;
export declare const isRotateZ: (transform: Transforms2d[0]) => transform is Pick<Transformations, "rotateZ">;
export declare const dot3: (row: Vec3, col: Vec3) => number;
export declare const matrixVecMul3: (m: Matrix3, v: Vec3) => readonly [number, number, number];
export declare const multiply3: (m1: Matrix3, m2: Matrix3) => readonly [readonly [number, number, number], readonly [number, number, number], readonly [number, number, number]];
export declare const svgMatrix: (transforms: Transforms2d) => string;
export declare const processTransform2d: (transforms: Transforms2d) => Matrix3;
export declare const decompose2d: (arg: Matrix3 | Transforms2d) => readonly [{
    readonly translateX: number;
}, {
    readonly translateY: number;
}, {
    readonly rotateZ: number;
}, {
    readonly scaleX: number;
}, {
    readonly scaleY: number;
}, {
    readonly rotateZ: number;
}];
interface Quadrilateral {
    p1: Vector;
    p2: Vector;
    p3: Vector;
    p4: Vector;
}
interface Parameters {
    canvas: Quadrilateral;
    projected: Quadrilateral;
}
export declare const transform2d: (params: Parameters) => readonly [readonly [number, number, number], readonly [number, number, number], readonly [number, number, 1]];
export {};
