const Point2D = function (x, y) {
    this.x = x;
    this.y = y;
};
const Point3D = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

const Cube = function (x, y, z, size) {
    Point3D.call(this, x, y, z);
    size *= 0.5;
    this.vertices = [new Point3D(x - size, y - size, z - size),
        new Point3D(x + size, y - size, z - size),
        new Point3D(x + size, y + size, z - size),
        new Point3D(x - size, y + size, z - size),
        new Point3D(x - size, y - size, z + size),
        new Point3D(x + size, y - size, z + size),
        new Point3D(x + size, y + size, z + size),
        new Point3D(x - size, y + size, z + size)
    ];
    this.faces = [
        [0, 1, 2, 3],
        [0, 4, 5, 1],
        [1, 5, 6, 2],
        [3, 2, 6, 7],
        [0, 3, 7, 4],
        [7, 6, 5, 4]
    ];
};
Cube.prototype = {
    rotateX: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let index = this.vertices.length - 1; index > -1; --index) {
            let p = this.vertices[index];

            let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
            let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

            p.y = y + this.y;
            p.z = z + this.z;
        }
    },
    rotateY: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let index = this.vertices.length - 1; index > -1; --index) {
            let p = this.vertices[index];

            let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
            let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;

            p.x = x + this.x;
            p.z = z + this.z;
        }
    },
    rotateZ: function (radian) {
        var cosine = Math.cos(radian);
        var sine = Math.sin(radian);

        for (let index = this.vertices.length - 1; index > -1; --index) {
            let p = this.vertices[index];

            let x = (p.x - this.x) * cosine - (p.y - this.y) * sine;
            let y = (p.x - this.x) * sine + (p.y - this.y) * cosine;

            p.x = x + this.y;
            p.y = y + this.y;
        }
    }
}

function project(points3d, width, height) {
    var points2d = new Array(points3d.length);
    var focal_length = 200;

    for (let index = points3d.length - 1; index > -1; --index) {
        let p = points3d[index];
        let x = p.x * (focal_length / p.z) + width * 0.5;
        let y = p.y * (focal_length / p.z) + height * 0.5;

        points2d[index] = new Point2D(x, y);
    }

    return points2d;
}

function project1(points3d, width, height) {
    var points2d = new Array(points3d.length);
    var focal_length = 200;

    for (let index = points3d.length - 1; index > -1; --index) {
        let p = points3d[index];
        let x = p.x + p.z * (Math.cos(3.14 / 6) / 2) + 200;
        let y = p.y - p.z * (Math.sin(3.14 / 6) / 2) + 300;

        points2d[index] = new Point2D(x, y);
    }

    return points2d;
}