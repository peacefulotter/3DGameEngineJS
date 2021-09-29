"use strict"

function isPowerOf2(length) {
    return (length & (length - 1)) == 0;
}

class Texture {

    static textureResource = {}
    /**
     * DO NOT CREATE AN INSTANCE OF THIS CLASS USING THE CONSTRUCTOR
     * @param {int} textureID
     */
    constructor( textureID ) {
        this.id = textureID        
    }

    /***
     * @param {String} filename
     */
    static _constructWithFilename = ( filename ) => {
        let resource = Texture.textureResource[filename];
        if ( resource != undefined )
            return new Texture( resource );

        const texture = gl.createTexture(); // not a buffer but an id
        gl.bindTexture(gl.TEXTURE_2D, texture);

        let image = new Image();
        image.src = "../res/textures/" + filename;
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            //     gl.generateMipmap(gl.TEXTURE_2D);
            // } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // gl.NEAREST
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // gl.nearest
    
            // }
    
        
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
            //    1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            //    buffer );
    
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        }

        Texture.textureResource[ filename ] = texture;
        return new Texture(texture);
    }
 

    bind = ( loc, samplerSlot ) => {
        gl.activeTexture(gl.TEXTURE0 + samplerSlot);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(loc, samplerSlot); // programInfo.uniformLocations.uSampler
    }
}