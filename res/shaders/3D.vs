
attribute vec3 position;
attribute vec2 texture;
attribute vec3 normal;
attribute vec4 color;

varying highp vec2 vtexture;
varying vec3 vnormal;
varying vec4 vcolor;

uniform mat4 transformationMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

void main() {
    vtexture = texture;
    vnormal = normal;

    vec3 actualPos = position;
    gl_Position = vec4(actualPos.xyz, 1.0);

    vcolor = vec4(texture.x, texture.y, 0.0, 1.0);
}