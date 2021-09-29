
"use strict"

class Matrix4f {
    /**
     * @param {Float[4][4]} matrixArray 
     */
    constructor( matrixArray )
    {
        this.m = matrixArray;
    }

    static identity = () => {
        return new Matrix4f(
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]
        );
    }

    static perspective = (fov, aspectRatio, zNear, zFar) => {
        let mat = Matrix4f.identity();

        let invTanHalfFov = 1.0 / Math.tan( fov * (Math.PI / 180) / 2 );
        let depth = zNear - zFar;

        mat.m[ 0 ][ 0 ] = invTanHalfFov * ( 1.0 / aspectRatio );
        mat.m[ 1 ][ 1 ] = invTanHalfFov;
        mat.m[ 2 ][ 2 ] =  ( -zNear - zFar ) / depth;
        mat.m[ 2 ][ 3 ] = 2 * zFar * zNear / depth;
        mat.m[ 3 ][ 2 ] = 1;
        mat.m[ 3 ][ 3 ] = 0;

        return mat;
    }

    static translation = ( x, y, z ) => {
        let mat = Matrix4f.identity();

        mat.m[ 0 ][ 3 ] = x;
        mat.m[ 1 ][ 3 ] = y;
        mat.m[ 2 ][ 3 ] = z;
        
        return mat;
    }

    /**
     * 
     * @param {Vector3f} f : forward vector
     * @param {Vector3f} u : upward vector
     * @param {Vector3f} r : right vector
     * @returns Rotation Matrix
     */
    static rotation = (f, u, r) => {
        let mat = Matrix4f.identity();

        mat.m[ 0 ][ 0 ] = r.x;
        mat.m[ 0 ][ 1 ] = r.y;
        mat.m[ 0 ][ 2 ] = r.z;
        mat.m[ 1 ][ 0 ] = u.x;
        mat.m[ 1 ][ 1 ] = u.y;
        mat.m[ 1 ][ 2 ] = u.z;
        mat.m[ 2 ][ 0 ] = f.x;
        mat.m[ 2 ][ 1 ] = f.y;
        mat.m[ 2 ][ 2 ] = f.z;

        return mat;
    }

    /**
     * 
     * @param {Matrix4f} other 
     * @returns Multiplication between this and other
     */
    mul = ( other ) => {
        let mat = Matrix4f.identity();

        for ( let i = 0; i < 4; i++ )
        {
            for ( let j = 0; j < 4; j++ )
            {
                let value = 0;
                for ( let k = 0; k < 4; k++ )
                {
                    value += this.m[i][k] * other.m[k][j];
                }
                mat.m[i][j] = value;
            }
        }
        
        return mat;
    }
}