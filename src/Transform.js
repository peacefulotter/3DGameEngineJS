
"use strict"

class Transform
{
    constructor()
    {
        this.translation = new Vector3f(0, 0, 0);
        this.rotation = new Quaternion(0, 0, 0, 1);
    }

    translate = (x, y, z) => {
        this.translation = this.translation.add(x, y, z)
    }

    setTranslation = (x, y, z) => {
        this.translation = new Vector3f(x, y, z)
    }

    /**
     * 
     * @param {Quaternion} quat 
     */
    rotate = ( quat ) => {
        this.rotation = this.rotation.rotate( quat );
    }

    /**
     * 
     * @param {Vector3f} vec 
     * @param {float} angleDeg 
     */
    rotateAngle = (vec, angleDeg) => {
        this.rotate( Quaternion._createFromVec( vec, angleDeg ) )
    }

    setRotation = (x, y, z, w) => {
        this.rotation = new Quaternion(x, y, z, w)
    }

    getTranslationMatrix = () => {
        return Matrix4f.translation( this.translation.x, this.translation.y, this.translation.z );
    }

    getRotationMatrix = () => {
        return this.rotation.toRotationMatrix()
    }

    getTransformationMatrix = () => {
        return this.getTranslationMatrix().mul( this.getRotationMatrix() ) // .mul( scale.getScaleMatrix() ) );
    }


    toString = () => {
        return "Translation: \t" + this.translation.vec() + "\nRotation: \t" + this.rotation.vec()
    }
}