"use strict"

class Vertex {
    static VERTEX_SIZE = 8; // 11

    // FIXME: get rid of this or refactor
    constructor( pos, tex, nor )
    {
        this.position = pos;
        this.texture = tex;
        this.normal = nor;
        // this.tangent = tan || new Vector3f(1, 1, 1);
    }
}
