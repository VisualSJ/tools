cc.kmScalar = Number;
cc.kmBool = Number;
cc.kmEnum = Number;
cc.KM_FALSE = 0;
cc.KM_TRUE = 1;
cc.kmPI = 3.141592;
cc.kmPIOver180 = 0.017453;
cc.kmPIUnder180 = 57.295779;
cc.kmEpsilon = 1 / 64;
cc.kmSQR = function (s) {
    return s * s
};
cc.kmDegreesToRadians = function (degrees) {
    return degrees * cc.kmPIOver180
};
cc.kmRadiansToDegrees = function (radians) {
    return radians * cc.kmPIUnder180
};
cc.kmMin = function (lhs, rhs) {
    return lhs < rhs ? lhs : rhs
};
cc.kmMax = function (lhs, rhs) {
    return lhs > rhs ? lhs : rhs
};
cc.kmAlmostEqual = function (lhs, rhs) {
    return lhs + cc.kmEpsilon > rhs && lhs - cc.kmEpsilon < rhs
};
cc.kmVec2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0
};
cc.kmVec2Fill = function (pOut, x, y) {
    pOut.x = x;
    pOut.y = y;
    return pOut
};
cc.kmVec2Length = function (pIn) {
    return Math.sqrt(cc.kmSQR(pIn.x) + cc.kmSQR(pIn.y))
};
cc.kmVec2LengthSq = function (pIn) {
    return cc.kmSQR(pIn.x) + cc.kmSQR(pIn.y)
};
cc.kmVec2Normalize = function (pOut, pIn) {
    var l = 1 / cc.kmVec2Length(pIn);
    var v = new cc.kmVec2;
    v.x = pIn.x * l;
    v.y = pIn.y * l;
    pOut.x = v.x;
    pOut.y = v.y;
    return pOut
};
cc.kmVec2Add = function (pOut, pV1, pV2) {
    pOut.x = pV1.x + pV2.x;
    pOut.y = pV1.y + pV2.y;
    return pOut
};
cc.kmVec2Dot = function (pV1, pV2) {
    return pV1.x * pV2.x + pV1.y * pV2.y
};
cc.kmVec2Subtract = function (pOut, pV1, pV2) {
    pOut.x = pV1.x - pV2.x;
    pOut.y = pV1.y - pV2.y;
    return pOut
};
cc.kmVec2Transform = function (pOut, pV, pM) {
    var v = new cc.kmVec2;
    v.x = pV.x * pM.mat[0] + pV.y * pM.mat[3] + pM.mat[6];
    v.y = pV.x * pM.mat[1] + pV.y * pM.mat[4] + pM.mat[7];
    pOut.x = v.x;
    pOut.y = v.y;
    return pOut
};
cc.kmVec2TransformCoord = function (pOut, pV, pM) {
    return null
};
cc.kmVec2Scale = function (pOut, pIn, s) {
    pOut.x = pIn.x * s;
    pOut.y = pIn.y * s;
    return pOut
};
cc.kmVec2AreEqual = function (p1, p2) {
    return p1.x < p2.x + cc.kmEpsilon && p1.x > p2.x - cc.kmEpsilon && p1.y < p2.y + cc.kmEpsilon && p1.y > p2.y - cc.kmEpsilon
};
cc.kmVec3 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0
};
cc.kmVec3Fill = function (pOut, x, y, z) {
    if (!pOut)return new cc.kmVec3(x, y, z);
    pOut.x = x;
    pOut.y = y;
    pOut.z = z;
    return pOut
};
cc.kmVec3Length = function (pIn) {
    return Math.sqrt(cc.kmSQR(pIn.x) + cc.kmSQR(pIn.y) + cc.kmSQR(pIn.z))
};
cc.kmVec3LengthSq = function (pIn) {
    return cc.kmSQR(pIn.x) + cc.kmSQR(pIn.y) + cc.kmSQR(pIn.z)
};
cc.kmVec3Normalize = function (pOut, pIn) {
    var l = 1 / cc.kmVec3Length(pIn);
    pOut.x = pIn.x * l;
    pOut.y = pIn.y * l;
    pOut.z = pIn.z * l;
    return pOut
};
cc.kmVec3Cross = function (pOut, pV1, pV2) {
    pOut.x = pV1.y * pV2.z - pV1.z * pV2.y;
    pOut.y = pV1.z * pV2.x - pV1.x * pV2.z;
    pOut.z = pV1.x * pV2.y - pV1.y * pV2.x;
    return pOut
};
cc.kmVec3Dot = function (pV1, pV2) {
    return pV1.x * pV2.x + pV1.y * pV2.y + pV1.z * pV2.z
};
cc.kmVec3Add = function (pOut, pV1, pV2) {
    pOut.x = pV1.x + pV2.x;
    pOut.y = pV1.y + pV2.y;
    pOut.z = pV1.z + pV2.z;
    return pOut
};
cc.kmVec3Subtract = function (pOut, pV1, pV2) {
    pOut.x = pV1.x - pV2.x;
    pOut.y = pV1.y - pV2.y;
    pOut.z = pV1.z - pV2.z;
    return pOut
};
cc.kmVec3Transform = function (pOut, pV, pM) {
    pOut.x = pV.x * pM.mat[0] + pV.y * pM.mat[4] + pV.z * pM.mat[8] + pM.mat[12];
    pOut.y = pV.x * pM.mat[1] + pV.y * pM.mat[5] + pV.z * pM.mat[9] + pM.mat[13];
    pOut.z = pV.x * pM.mat[2] + pV.y * pM.mat[6] + pV.z * pM.mat[10] + pM.mat[14];
    return pOut
};
cc.kmVec3TransformNormal = function (pOut, pV, pM) {
    pOut.x = pV.x * pM.mat[0] + pV.y * pM.mat[4] + pV.z * pM.mat[8];
    pOut.y = pV.x * pM.mat[1] + pV.y * pM.mat[5] + pV.z * pM.mat[9];
    pOut.z = pV.x * pM.mat[2] + pV.y * pM.mat[6] + pV.z * pM.mat[10];
    return pOut
};
cc.kmVec3TransformCoord = function (pOut, pV, pM) {
    var v = new cc.kmVec4;
    var inV = new cc.kmVec4;
    cc.kmVec4Fill(inV, pV.x, pV.y, pV.z, 1);
    cc.kmVec4Transform(v, inV, pM);
    pOut.x = v.x / v.w;
    pOut.y = v.y / v.w;
    pOut.z = v.z / v.w;
    return pOut
};
cc.kmVec3Scale = function (pOut, pIn, s) {
    pOut.x = pIn.x * s;
    pOut.y = pIn.y * s;
    pOut.z = pIn.z * s;
    return pOut
};
cc.kmVec3AreEqual = function (p1, p2) {
    if (p1.x < p2.x + cc.kmEpsilon && p1.x > p2.x - cc.kmEpsilon && p1.y < p2.y + cc.kmEpsilon && p1.y > p2.y - cc.kmEpsilon && p1.z < p2.z + cc.kmEpsilon && p1.z > p2.z - cc.kmEpsilon)return 1;
    return 0
};
cc.kmVec3InverseTransform = function (pOut, pVect, pM) {
    var v1 = new cc.kmVec3(pVect.x - pM.mat[12], pVect.y - pM.mat[13], pVect.z - pM.mat[14]);
    pOut.x = v1.x * pM.mat[0] + v1.y * pM.mat[1] + v1.z * pM.mat[2];
    pOut.y = v1.x * pM.mat[4] + v1.y * pM.mat[5] + v1.z * pM.mat[6];
    pOut.z = v1.x * pM.mat[8] + v1.y * pM.mat[9] + v1.z * pM.mat[10];
    return pOut
};
cc.kmVec3InverseTransformNormal = function (pOut, pVect, pM) {
    pOut.x = pVect.x * pM.mat[0] + pVect.y * pM.mat[1] + pVect.z * pM.mat[2];
    pOut.y = pVect.x * pM.mat[4] + pVect.y * pM.mat[5] + pVect.z * pM.mat[6];
    pOut.z = pVect.x * pM.mat[8] + pVect.y * pM.mat[9] + pVect.z * pM.mat[10];
    return pOut
};
cc.kmVec3Assign = function (pOut, pIn) {
    if (pOut == pIn)return pOut;
    pOut.x = pIn.x;
    pOut.y = pIn.y;
    pOut.z = pIn.z;
    return pOut
};
cc.kmVec3Zero = function (pOut) {
    pOut.x = 0;
    pOut.y = 0;
    pOut.z = 0;
    return pOut
};
cc.kmVec3ToTypeArray = function (vecValue) {
    if (!vecValue)return null;
    var tyArr = new Float32Array(3);
    tyArr[0] = vecValue.x;
    tyArr[1] = vecValue.y;
    tyArr[2] = vecValue.z;
    return tyArr
};
cc.kmVec4 = function (x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0
};
cc.kmVec4Fill = function (outVec, x, y, z, w) {
    outVec.x = x;
    outVec.y = y;
    outVec.z = z;
    outVec.w = w;
    return outVec
};
cc.kmVec4Add = function (outVec, pV1, pV2) {
    outVec.x = pV1.x + pV2.x;
    outVec.y = pV1.y + pV2.y;
    outVec.z = pV1.z + pV2.z;
    outVec.w = pV1.w + pV2.w;
    return outVec
};
cc.kmVec4Dot = function (vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z + vec1.w * vec2.w
};
cc.kmVec4Length = function (inVec) {
    return Math.sqrt(cc.kmSQR(inVec.x) + cc.kmSQR(inVec.y) + cc.kmSQR(inVec.z) + cc.kmSQR(inVec.w))
};
cc.kmVec4LengthSq = function (inVec) {
    return cc.kmSQR(inVec.x) + cc.kmSQR(inVec.y) + cc.kmSQR(inVec.z) + cc.kmSQR(inVec.w)
};
cc.kmVec4Lerp = function (outVec, pV1, pV2, t) {
    return outVec
};
cc.kmVec4Normalize = function (outVec, inVec) {
    var l = 1 / cc.kmVec4Length(inVec);
    outVec.x *= l;
    outVec.y *= l;
    outVec.z *= l;
    outVec.w *= l;
    return outVec
};
cc.kmVec4Scale = function (outVec, inVec, scale) {
    cc.kmVec4Normalize(outVec, inVec);
    outVec.x *= scale;
    outVec.y *= scale;
    outVec.z *= scale;
    outVec.w *= scale;
    return outVec
};
cc.kmVec4Subtract = function (outVec, vec1, vec2) {
    outVec.x = vec1.x - vec2.x;
    outVec.y = vec1.y - vec2.y;
    outVec.z = vec1.z - vec2.z;
    outVec.w = vec1.w - vec2.w;
    return outVec
};
cc.kmVec4Transform = function (outVec, vec, mat4Obj) {
    outVec.x = vec.x * mat4Obj.mat[0] + vec.y * mat4Obj.mat[4] + vec.z * mat4Obj.mat[8] + vec.w * mat4Obj.mat[12];
    outVec.y = vec.x * mat4Obj.mat[1] + vec.y * mat4Obj.mat[5] + vec.z * mat4Obj.mat[9] + vec.w * mat4Obj.mat[13];
    outVec.z = vec.x * mat4Obj.mat[2] + vec.y * mat4Obj.mat[6] + vec.z * mat4Obj.mat[10] + vec.w * mat4Obj.mat[14];
    outVec.w = vec.x * mat4Obj.mat[3] + vec.y * mat4Obj.mat[7] + vec.z * mat4Obj.mat[11] + vec.w * mat4Obj.mat[15];
    return outVec
};
cc.kmVec4TransformArray = function (outVec, outStride, vecObj, stride, mat4Obj, count) {
    var i = 0;
    while (i < count) {
        var currIn = vecObj + i * stride;
        var out = outVec + i * outStride;
        cc.kmVec4Transform(out, currIn, mat4Obj);
        ++i
    }
    return outVec
};
cc.kmVec4AreEqual = function (vec1, vec2) {
    return vec1.x < vec2.x + cc.kmEpsilon && vec1.x > vec2.x - cc.kmEpsilon && vec1.y < vec2.y + cc.kmEpsilon && vec1.y > vec2.y - cc.kmEpsilon && vec1.z < vec2.z + cc.kmEpsilon && vec1.z > vec2.z - cc.kmEpsilon && vec1.w < vec2.w + cc.kmEpsilon && vec1.w > vec2.w - cc.kmEpsilon
};
cc.kmVec4Assign = function (destVec, srcVec) {
    if (destVec == srcVec) {
        cc.log("destVec and srcVec are same object");
        return destVec
    }
    destVec.x = srcVec.x;
    destVec.y = srcVec.y;
    destVec.z = srcVec.z;
    destVec.w = srcVec.w;
    return destVec
};
cc.kmVec4ToTypeArray = function (vecValue) {
    if (!vecValue)return null;
    var tyArr = new Float32Array(4);
    tyArr[0] = vecValue.x;
    tyArr[1] = vecValue.y;
    tyArr[2] = vecValue.z;
    tyArr[3] = vecValue.w;
    return tyArr
};
cc.kmRay2 = function (start, dir) {
    this.start = start || new cc.kmVec2;
    this.start = start || new cc.kmVec2
};
cc.kmRay2Fill = function (ray, px, py, vx, vy) {
    ray.start.x = px;
    ray.start.y = py;
    ray.dir.x = vx;
    ray.dir.y = vy
};
cc.kmRay2IntersectLineSegment = function (ray, p1, p2, intersection) {
    var x1 = ray.start.x;
    var y1 = ray.start.y;
    var x2 = ray.start.x + ray.dir.x;
    var y2 = ray.start.y + ray.dir.y;
    var x3 = p1.x;
    var y3 = p1.y;
    var x4 = p2.x;
    var y4 = p2.y;
    var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    var ua, x, y;
    if (denom > -cc.kmEpsilon && denom < cc.kmEpsilon)return cc.KM_FALSE;
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    x = x1 + ua * (x2 - x1);
    y = y1 + ua * (y2 - y1);
    if (x < cc.kmMin(p1.x, p2.x) - cc.kmEpsilon || x > cc.kmMax(p1.x, p2.x) + cc.kmEpsilon || y < cc.kmMin(p1.y, p2.y) - cc.kmEpsilon ||
        y > cc.kmMax(p1.y, p2.y) + cc.kmEpsilon)return cc.KM_FALSE;
    if (x < cc.kmMin(x1, x2) - cc.kmEpsilon || x > cc.kmMax(x1, x2) + cc.kmEpsilon || y < cc.kmMin(y1, y2) - cc.kmEpsilon || y > cc.kmMax(y1, y2) + cc.kmEpsilon)return cc.KM_FALSE;
    intersection.x = x;
    intersection.y = y;
    return cc.KM_TRUE
};
cc.calculate_line_normal = function (p1, p2, normal_out) {
    var tmp = new cc.kmVec2;
    cc.kmVec2Subtract(tmp, p2, p1);
    normal_out.x = -tmp.y;
    normal_out.y = tmp.x;
    cc.kmVec2Normalize(normal_out, normal_out)
};
cc.kmRay2IntersectTriangle = function (ray, p1, p2, p3, intersection, normal_out) {
    var intersect = new cc.kmVec2;
    var final_intersect = new cc.kmVec2;
    var normal = new cc.kmVec2;
    var distance = 1E4;
    var intersected = cc.KM_FALSE;
    var tmp, this_distance;
    if (cc.kmRay2IntersectLineSegment(ray, p1, p2, intersect)) {
        tmp = new cc.kmVec2;
        intersected = cc.KM_TRUE;
        this_distance = cc.kmVec2Length(cc.kmVec2Subtract(tmp, intersect, ray.start));
        if (this_distance < distance) {
            final_intersect.x = intersect.x;
            final_intersect.y = intersect.y;
            distance = this_distance;
            cc.calculate_line_normal(p1, p2, normal)
        }
    }
    if (cc.kmRay2IntersectLineSegment(ray, p2, p3, intersect)) {
        tmp = new cc.kmVec2;
        intersected = cc.KM_TRUE;
        this_distance = cc.kmVec2Length(cc.kmVec2Subtract(tmp, intersect, ray.start));
        if (this_distance < distance) {
            final_intersect.x = intersect.x;
            final_intersect.y = intersect.y;
            distance = this_distance;
            cc.calculate_line_normal(p2, p3, normal)
        }
    }
    if (cc.kmRay2IntersectLineSegment(ray, p3, p1, intersect)) {
        tmp = new cc.kmVec2;
        intersected = cc.KM_TRUE;
        this_distance = cc.kmVec2Length(cc.kmVec2Subtract(tmp,
            intersect, ray.start));
        if (this_distance < distance) {
            final_intersect.x = intersect.x;
            final_intersect.y = intersect.y;
            distance = this_distance;
            cc.calculate_line_normal(p3, p1, normal)
        }
    }
    if (intersected) {
        intersection.x = final_intersect.x;
        intersection.y = final_intersect.y;
        if (normal_out) {
            normal_out.x = normal.x;
            normal_out.y = normal.y
        }
    }
    return intersected
};
cc.kmRay2IntersectCircle = function (ray, centre, radius, intersection) {
    cc.log("cc.kmRay2IntersectCircle() has not been implemented.")
};
var Float32Array = Float32Array || Array;
cc.kmMat3 = function () {
    this.mat = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0])
};
cc.kmMat3Fill = function (pOut, pMat) {
    for (var i = 0; i < 9; i++)pOut.mat[i] = pMat;
    return pOut
};
cc.kmMat3Adjugate = function (pOut, pIn) {
    pOut.mat[0] = pIn.mat[4] * pIn.mat[8] - pIn.mat[5] * pIn.mat[7];
    pOut.mat[1] = pIn.mat[2] * pIn.mat[7] - pIn.mat[1] * pIn.mat[8];
    pOut.mat[2] = pIn.mat[1] * pIn.mat[5] - pIn.mat[2] * pIn.mat[4];
    pOut.mat[3] = pIn.mat[5] * pIn.mat[6] - pIn.mat[3] * pIn.mat[8];
    pOut.mat[4] = pIn.mat[0] * pIn.mat[8] - pIn.mat[2] * pIn.mat[6];
    pOut.mat[5] = pIn.mat[2] * pIn.mat[3] - pIn.mat[0] * pIn.mat[5];
    pOut.mat[6] = pIn.mat[3] * pIn.mat[7] - pIn.mat[4] * pIn.mat[6];
    pOut.mat[8] = pIn.mat[0] * pIn.mat[4] - pIn.mat[1] * pIn.mat[3];
    return pOut
};
cc.kmMat3Identity = function (pOut) {
    pOut.mat[1] = pOut.mat[2] = pOut.mat[3] = pOut.mat[5] = pOut.mat[6] = pOut.mat[7] = 0;
    pOut.mat[0] = pOut.mat[4] = pOut.mat[8] = 1;
    return pOut
};
cc.kmMat3Inverse = function (pOut, pDeterminate, pM) {
    var detInv;
    var adjugate = new cc.kmMat3;
    if (pDeterminate === 0)return null;
    detInv = 1 / pDeterminate;
    cc.kmMat3Adjugate(adjugate, pM);
    cc.kmMat3ScalarMultiply(pOut, adjugate, detInv);
    return pOut
};
cc.kmMat3._identity = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
cc.kmMat3IsIdentity = function (pIn) {
    for (var i = 0; i < 9; i++)if (cc.kmMat3._identity[i] !== pIn.mat[i])return false;
    return true
};
cc.kmMat3Transpose = function (pOut, pIn) {
    var z, x;
    for (z = 0; z < 3; ++z)for (x = 0; x < 3; ++x)pOut.mat[z * 3 + x] = pIn.mat[x * 3 + z];
    return pOut
};
cc.kmMat3Determinant = function (pIn) {
    var output;
    output = pIn.mat[0] * pIn.mat[4] * pIn.mat[8] + pIn.mat[1] * pIn.mat[5] * pIn.mat[6] + pIn.mat[2] * pIn.mat[3] * pIn.mat[7];
    output -= pIn.mat[2] * pIn.mat[4] * pIn.mat[6] + pIn.mat[0] * pIn.mat[5] * pIn.mat[7] + pIn.mat[1] * pIn.mat[3] * pIn.mat[8];
    return output
};
cc.kmMat3Multiply = function (pOut, pM1, pM2) {
    var m1 = pM1.mat, m2 = pM2.mat;
    pOut.mat[0] = m1[0] * m2[0] + m1[3] * m2[1] + m1[6] * m2[2];
    pOut.mat[1] = m1[1] * m2[0] + m1[4] * m2[1] + m1[7] * m2[2];
    pOut.mat[2] = m1[2] * m2[0] + m1[5] * m2[1] + m1[8] * m2[2];
    pOut.mat[3] = m1[0] * m2[3] + m1[3] * m2[4] + m1[6] * m2[5];
    pOut.mat[4] = m1[1] * m2[3] + m1[4] * m2[4] + m1[7] * m2[5];
    pOut.mat[5] = m1[2] * m2[3] + m1[5] * m2[4] + m1[8] * m2[5];
    pOut.mat[6] = m1[0] * m2[6] + m1[3] * m2[7] + m1[6] * m2[8];
    pOut.mat[7] = m1[1] * m2[6] + m1[4] * m2[7] + m1[7] * m2[8];
    pOut.mat[8] = m1[2] * m2[6] + m1[5] * m2[7] + m1[8] * m2[8];
    return pOut
};
cc.kmMat3ScalarMultiply = function (pOut, pM, pFactor) {
    for (var i = 0; i < 9; i++)pOut.mat[i] = pM.mat[i] * pFactor;
    return pOut
};
cc.kmMat3RotationAxisAngle = function (pOut, axis, radians) {
    var rcos = Math.cos(radians);
    var rsin = Math.sin(radians);
    pOut.mat[0] = rcos + axis.x * axis.x * (1 - rcos);
    pOut.mat[1] = axis.z * rsin + axis.y * axis.x * (1 - rcos);
    pOut.mat[2] = -axis.y * rsin + axis.z * axis.x * (1 - rcos);
    pOut.mat[3] = -axis.z * rsin + axis.x * axis.y * (1 - rcos);
    pOut.mat[4] = rcos + axis.y * axis.y * (1 - rcos);
    pOut.mat[5] = axis.x * rsin + axis.z * axis.y * (1 - rcos);
    pOut.mat[6] = axis.y * rsin + axis.x * axis.z * (1 - rcos);
    pOut.mat[7] = -axis.x * rsin + axis.y * axis.z * (1 - rcos);
    pOut.mat[8] = rcos + axis.z * axis.z *
        (1 - rcos);
    return pOut
};
cc.kmMat3Assign = function (pOut, pIn) {
    if (pOut == pIn) {
        cc.log("cc.kmMat3Assign(): pOut equals pIn");
        return pOut
    }
    for (var i = 0; i < 9; i++)pOut.mat[i] = pIn.mat[i];
    return pOut
};
cc.kmMat3AreEqual = function (pMat1, pMat2) {
    if (pMat1 == pMat2)return true;
    for (var i = 0; i < 9; ++i)if (!(pMat1.mat[i] + cc.kmEpsilon > pMat2.mat[i] && pMat1.mat[i] - cc.kmEpsilon < pMat2.mat[i]))return false;
    return true
};
cc.kmMat3RotationX = function (pOut, radians) {
    pOut.mat[0] = 1;
    pOut.mat[1] = 0;
    pOut.mat[2] = 0;
    pOut.mat[3] = 0;
    pOut.mat[4] = Math.cos(radians);
    pOut.mat[5] = Math.sin(radians);
    pOut.mat[6] = 0;
    pOut.mat[7] = -Math.sin(radians);
    pOut.mat[8] = Math.cos(radians);
    return pOut
};
cc.kmMat3RotationY = function (pOut, radians) {
    pOut.mat[0] = Math.cos(radians);
    pOut.mat[1] = 0;
    pOut.mat[2] = -Math.sin(radians);
    pOut.mat[3] = 0;
    pOut.mat[4] = 1;
    pOut.mat[5] = 0;
    pOut.mat[6] = Math.sin(radians);
    pOut.mat[7] = 0;
    pOut.mat[8] = Math.cos(radians);
    return pOut
};
cc.kmMat3RotationZ = function (pOut, radians) {
    pOut.mat[0] = Math.cos(radians);
    pOut.mat[1] = -Math.sin(radians);
    pOut.mat[2] = 0;
    pOut.mat[3] = Math.sin(radians);
    pOut.mat[4] = Math.cos(radians);
    pOut.mat[5] = 0;
    pOut.mat[6] = 0;
    pOut.mat[7] = 0;
    pOut.mat[8] = 1;
    return pOut
};
cc.kmMat3Rotation = function (pOut, radians) {
    pOut.mat[0] = Math.cos(radians);
    pOut.mat[1] = Math.sin(radians);
    pOut.mat[2] = 0;
    pOut.mat[3] = -Math.sin(radians);
    pOut.mat[4] = Math.cos(radians);
    pOut.mat[5] = 0;
    pOut.mat[6] = 0;
    pOut.mat[7] = 0;
    pOut.mat[8] = 1;
    return pOut
};
cc.kmMat3Scaling = function (pOut, x, y) {
    cc.kmMat3Identity(pOut);
    pOut.mat[0] = x;
    pOut.mat[4] = y;
    return pOut
};
cc.kmMat3Translation = function (pOut, x, y) {
    cc.kmMat3Identity(pOut);
    pOut.mat[6] = x;
    pOut.mat[7] = y;
    return pOut
};
cc.kmMat3RotationQuaternion = function (pOut, pIn) {
    if (!pIn || !pOut)return null;
    pOut.mat[0] = 1 - 2 * (pIn.y * pIn.y + pIn.z * pIn.z);
    pOut.mat[1] = 2 * (pIn.x * pIn.y - pIn.w * pIn.z);
    pOut.mat[2] = 2 * (pIn.x * pIn.z + pIn.w * pIn.y);
    pOut.mat[3] = 2 * (pIn.x * pIn.y + pIn.w * pIn.z);
    pOut.mat[4] = 1 - 2 * (pIn.x * pIn.x + pIn.z * pIn.z);
    pOut.mat[5] = 2 * (pIn.y * pIn.z - pIn.w * pIn.x);
    pOut.mat[6] = 2 * (pIn.x * pIn.z - pIn.w * pIn.y);
    pOut.mat[7] = 2 * (pIn.y * pIn.z + pIn.w * pIn.x);
    pOut.mat[8] = 1 - 2 * (pIn.x * pIn.x + pIn.y * pIn.y);
    return pOut
};
cc.kmMat3RotationToAxisAngle = function (pAxis, radians, pIn) {
    var temp;
    cc.kmQuaternionRotationMatrix(temp, pIn);
    cc.kmQuaternionToAxisAngle(temp, pAxis, radians);
    return pAxis
};
cc.kmMat4 = function () {
    this.mat = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
};
cc.kmMat4Fill = function (pOut, pMat) {
    pOut.mat[0] = pOut.mat[1] = pOut.mat[2] = pOut.mat[3] = pOut.mat[4] = pOut.mat[5] = pOut.mat[6] = pOut.mat[7] = pOut.mat[8] = pOut.mat[9] = pOut.mat[10] = pOut.mat[11] = pOut.mat[12] = pOut.mat[13] = pOut.mat[14] = pOut.mat[15] = pMat
};
cc.kmMat4Identity = function (pOut) {
    pOut.mat[1] = pOut.mat[2] = pOut.mat[3] = pOut.mat[4] = pOut.mat[6] = pOut.mat[7] = pOut.mat[8] = pOut.mat[9] = pOut.mat[11] = pOut.mat[12] = pOut.mat[13] = pOut.mat[14] = 0;
    pOut.mat[0] = pOut.mat[5] = pOut.mat[10] = pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4._get = function (pIn, row, col) {
    return pIn.mat[row + 4 * col]
};
cc.kmMat4._set = function (pIn, row, col, value) {
    pIn.mat[row + 4 * col] = value
};
cc.kmMat4._swap = function (pIn, r1, c1, r2, c2) {
    var tmp = cc.kmMat4._get(pIn, r1, c1);
    cc.kmMat4._set(pIn, r1, c1, cc.kmMat4._get(pIn, r2, c2));
    cc.kmMat4._set(pIn, r2, c2, tmp)
};
cc.kmMat4._gaussj = function (a, b) {
    var i, icol = 0, irow = 0, j, k, l, ll, n = 4, m = 4;
    var big, dum, pivinv;
    var indxc = [0, 0, 0, 0];
    var indxr = [0, 0, 0, 0];
    var ipiv = [0, 0, 0, 0];
    for (i = 0; i < n; i++) {
        big = 0;
        for (j = 0; j < n; j++)if (ipiv[j] != 1)for (k = 0; k < n; k++)if (ipiv[k] == 0)if (Math.abs(cc.kmMat4._get(a, j, k)) >= big) {
            big = Math.abs(cc.kmMat4._get(a, j, k));
            irow = j;
            icol = k
        }
        ++ipiv[icol];
        if (irow != icol) {
            for (l = 0; l < n; l++)cc.kmMat4._swap(a, irow, l, icol, l);
            for (l = 0; l < m; l++)cc.kmMat4._swap(b, irow, l, icol, l)
        }
        indxr[i] = irow;
        indxc[i] = icol;
        if (cc.kmMat4._get(a, icol, icol) ==
            0)return cc.KM_FALSE;
        pivinv = 1 / cc.kmMat4._get(a, icol, icol);
        cc.kmMat4._set(a, icol, icol, 1);
        for (l = 0; l < n; l++)cc.kmMat4._set(a, icol, l, cc.kmMat4._get(a, icol, l) * pivinv);
        for (l = 0; l < m; l++)cc.kmMat4._set(b, icol, l, cc.kmMat4._get(b, icol, l) * pivinv);
        for (ll = 0; ll < n; ll++)if (ll != icol) {
            dum = cc.kmMat4._get(a, ll, icol);
            cc.kmMat4._set(a, ll, icol, 0);
            for (l = 0; l < n; l++)cc.kmMat4._set(a, ll, l, cc.kmMat4._get(a, ll, l) - cc.kmMat4._get(a, icol, l) * dum);
            for (l = 0; l < m; l++)cc.kmMat4._set(b, ll, l, cc.kmMat4._get(a, ll, l) - cc.kmMat4._get(b, icol, l) *
                dum)
        }
    }
    for (l = n - 1; l >= 0; l--)if (indxr[l] != indxc[l])for (k = 0; k < n; k++)cc.kmMat4._swap(a, k, indxr[l], k, indxc[l]);
    return cc.KM_TRUE
};
cc.kmMat4._identity = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
cc.kmMat4Inverse = function (pOut, pM) {
    var inv = new cc.kmMat4;
    var tmp = new cc.kmMat4;
    cc.kmMat4Assign(inv, pM);
    cc.kmMat4Identity(tmp);
    if (cc.kmMat4._gaussj(inv, tmp) == cc.KM_FALSE)return null;
    cc.kmMat4Assign(pOut, inv);
    return pOut
};
cc.kmMat4IsIdentity = function (pIn) {
    for (var i = 0; i < 16; i++)if (cc.kmMat4._identity[i] != pIn.mat[i])return false;
    return true
};
cc.kmMat4Transpose = function (pOut, pIn) {
    var x, z, outArr = pOut.mat, inArr = pIn.mat;
    for (z = 0; z < 4; ++z)for (x = 0; x < 4; ++x)outArr[z * 4 + x] = inArr[x * 4 + z];
    return pOut
};
cc.kmMat4Multiply = function (pOut, pM1, pM2) {
    var outArray = pOut.mat;
    var a00 = pM1.mat[0], a01 = pM1.mat[1], a02 = pM1.mat[2], a03 = pM1.mat[3];
    var a10 = pM1.mat[4], a11 = pM1.mat[5], a12 = pM1.mat[6], a13 = pM1.mat[7];
    var a20 = pM1.mat[8], a21 = pM1.mat[9], a22 = pM1.mat[10], a23 = pM1.mat[11];
    var a30 = pM1.mat[12], a31 = pM1.mat[13], a32 = pM1.mat[14], a33 = pM1.mat[15];
    var b00 = pM2.mat[0], b01 = pM2.mat[1], b02 = pM2.mat[2], b03 = pM2.mat[3];
    var b10 = pM2.mat[4], b11 = pM2.mat[5], b12 = pM2.mat[6], b13 = pM2.mat[7];
    var b20 = pM2.mat[8], b21 = pM2.mat[9], b22 = pM2.mat[10],
        b23 = pM2.mat[11];
    var b30 = pM2.mat[12], b31 = pM2.mat[13], b32 = pM2.mat[14], b33 = pM2.mat[15];
    outArray[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    outArray[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    outArray[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    outArray[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    outArray[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    outArray[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    outArray[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    outArray[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    outArray[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    outArray[9] = b20 * a01 + b21 *
        a11 + b22 * a21 + b23 * a31;
    outArray[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    outArray[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    outArray[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    outArray[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    outArray[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    outArray[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return pOut
};
cc.getMat4MultiplyValue = function (pM1, pM2) {
    var m1 = pM1.mat, m2 = pM2.mat;
    var mat = new Float32Array(16);
    mat[0] = m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2] + m1[12] * m2[3];
    mat[1] = m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2] + m1[13] * m2[3];
    mat[2] = m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2] + m1[14] * m2[3];
    mat[3] = m1[3] * m2[0] + m1[7] * m2[1] + m1[11] * m2[2] + m1[15] * m2[3];
    mat[4] = m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6] + m1[12] * m2[7];
    mat[5] = m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6] + m1[13] * m2[7];
    mat[6] = m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6] + m1[14] * m2[7];
    mat[7] = m1[3] *
        m2[4] + m1[7] * m2[5] + m1[11] * m2[6] + m1[15] * m2[7];
    mat[8] = m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10] + m1[12] * m2[11];
    mat[9] = m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10] + m1[13] * m2[11];
    mat[10] = m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10] + m1[14] * m2[11];
    mat[11] = m1[3] * m2[8] + m1[7] * m2[9] + m1[11] * m2[10] + m1[15] * m2[11];
    mat[12] = m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12] * m2[15];
    mat[13] = m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13] * m2[15];
    mat[14] = m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14] * m2[15];
    mat[15] = m1[3] * m2[12] + m1[7] * m2[13] + m1[11] *
        m2[14] + m1[15] * m2[15];
    return mat
};
cc.getMat4MultiplyWithMat4 = function (pM1, pM2, swapMat) {
    var m1 = pM1.mat, m2 = pM2.mat;
    var mat = swapMat.mat;
    mat[0] = m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2] + m1[12] * m2[3];
    mat[1] = m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2] + m1[13] * m2[3];
    mat[2] = m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2] + m1[14] * m2[3];
    mat[3] = m1[3] * m2[0] + m1[7] * m2[1] + m1[11] * m2[2] + m1[15] * m2[3];
    mat[4] = m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6] + m1[12] * m2[7];
    mat[5] = m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6] + m1[13] * m2[7];
    mat[6] = m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6] + m1[14] * m2[7];
    mat[7] =
        m1[3] * m2[4] + m1[7] * m2[5] + m1[11] * m2[6] + m1[15] * m2[7];
    mat[8] = m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10] + m1[12] * m2[11];
    mat[9] = m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10] + m1[13] * m2[11];
    mat[10] = m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10] + m1[14] * m2[11];
    mat[11] = m1[3] * m2[8] + m1[7] * m2[9] + m1[11] * m2[10] + m1[15] * m2[11];
    mat[12] = m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12] * m2[15];
    mat[13] = m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13] * m2[15];
    mat[14] = m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14] * m2[15];
    mat[15] = m1[3] * m2[12] + m1[7] * m2[13] +
        m1[11] * m2[14] + m1[15] * m2[15];
    return swapMat.mat
};
cc.kmMat4Assign = function (pOut, pIn) {
    if (pOut == pIn) {
        cc.log("cc.kmMat4Assign(): pOut equals pIn");
        return pOut
    }
    var outArr = pOut.mat;
    var inArr = pIn.mat;
    outArr[0] = inArr[0];
    outArr[1] = inArr[1];
    outArr[2] = inArr[2];
    outArr[3] = inArr[3];
    outArr[4] = inArr[4];
    outArr[5] = inArr[5];
    outArr[6] = inArr[6];
    outArr[7] = inArr[7];
    outArr[8] = inArr[8];
    outArr[9] = inArr[9];
    outArr[10] = inArr[10];
    outArr[11] = inArr[11];
    outArr[12] = inArr[12];
    outArr[13] = inArr[13];
    outArr[14] = inArr[14];
    outArr[15] = inArr[15];
    return pOut
};
cc.kmMat4AreEqual = function (pMat1, pMat2) {
    if (pMat1 == pMat2) {
        cc.log("cc.kmMat4AreEqual(): pMat1 and pMat2 are same object.");
        return true
    }
    for (var i = 0; i < 16; i++)if (!(pMat1.mat[i] + cc.kmEpsilon > pMat2.mat[i] && pMat1.mat[i] - cc.kmEpsilon < pMat2.mat[i]))return false;
    return true
};
cc.kmMat4RotationX = function (pOut, radians) {
    pOut.mat[0] = 1;
    pOut.mat[1] = 0;
    pOut.mat[2] = 0;
    pOut.mat[3] = 0;
    pOut.mat[4] = 0;
    pOut.mat[5] = Math.cos(radians);
    pOut.mat[6] = Math.sin(radians);
    pOut.mat[7] = 0;
    pOut.mat[8] = 0;
    pOut.mat[9] = -Math.sin(radians);
    pOut.mat[10] = Math.cos(radians);
    pOut.mat[11] = 0;
    pOut.mat[12] = 0;
    pOut.mat[13] = 0;
    pOut.mat[14] = 0;
    pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4RotationY = function (pOut, radians) {
    pOut.mat[0] = Math.cos(radians);
    pOut.mat[1] = 0;
    pOut.mat[2] = -Math.sin(radians);
    pOut.mat[3] = 0;
    pOut.mat[4] = 0;
    pOut.mat[5] = 1;
    pOut.mat[6] = 0;
    pOut.mat[7] = 0;
    pOut.mat[8] = Math.sin(radians);
    pOut.mat[9] = 0;
    pOut.mat[10] = Math.cos(radians);
    pOut.mat[11] = 0;
    pOut.mat[12] = 0;
    pOut.mat[13] = 0;
    pOut.mat[14] = 0;
    pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4RotationZ = function (pOut, radians) {
    pOut.mat[0] = Math.cos(radians);
    pOut.mat[1] = Math.sin(radians);
    pOut.mat[2] = 0;
    pOut.mat[3] = 0;
    pOut.mat[4] = -Math.sin(radians);
    pOut.mat[5] = Math.cos(radians);
    pOut.mat[6] = 0;
    pOut.mat[7] = 0;
    pOut.mat[8] = 0;
    pOut.mat[9] = 0;
    pOut.mat[10] = 1;
    pOut.mat[11] = 0;
    pOut.mat[12] = 0;
    pOut.mat[13] = 0;
    pOut.mat[14] = 0;
    pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4RotationPitchYawRoll = function (pOut, pitch, yaw, roll) {
    var cr = Math.cos(pitch);
    var sr = Math.sin(pitch);
    var cp = Math.cos(yaw);
    var sp = Math.sin(yaw);
    var cy = Math.cos(roll);
    var sy = Math.sin(roll);
    var srsp = sr * sp;
    var crsp = cr * sp;
    pOut.mat[0] = cp * cy;
    pOut.mat[4] = cp * sy;
    pOut.mat[8] = -sp;
    pOut.mat[1] = srsp * cy - cr * sy;
    pOut.mat[5] = srsp * sy + cr * cy;
    pOut.mat[9] = sr * cp;
    pOut.mat[2] = crsp * cy + sr * sy;
    pOut.mat[6] = crsp * sy - sr * cy;
    pOut.mat[10] = cr * cp;
    pOut.mat[3] = pOut.mat[7] = pOut.mat[11] = 0;
    pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4RotationQuaternion = function (pOut, pQ) {
    pOut.mat[0] = 1 - 2 * (pQ.y * pQ.y + pQ.z * pQ.z);
    pOut.mat[1] = 2 * (pQ.x * pQ.y + pQ.z * pQ.w);
    pOut.mat[2] = 2 * (pQ.x * pQ.z - pQ.y * pQ.w);
    pOut.mat[3] = 0;
    pOut.mat[4] = 2 * (pQ.x * pQ.y - pQ.z * pQ.w);
    pOut.mat[5] = 1 - 2 * (pQ.x * pQ.x + pQ.z * pQ.z);
    pOut.mat[6] = 2 * (pQ.z * pQ.y + pQ.x * pQ.w);
    pOut.mat[7] = 0;
    pOut.mat[8] = 2 * (pQ.x * pQ.z + pQ.y * pQ.w);
    pOut.mat[9] = 2 * (pQ.y * pQ.z - pQ.x * pQ.w);
    pOut.mat[10] = 1 - 2 * (pQ.x * pQ.x + pQ.y * pQ.y);
    pOut.mat[11] = 0;
    pOut.mat[12] = 0;
    pOut.mat[13] = 0;
    pOut.mat[14] = 0;
    pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4RotationTranslation = function (pOut, rotation, translation) {
    pOut.mat[0] = rotation.mat[0];
    pOut.mat[1] = rotation.mat[1];
    pOut.mat[2] = rotation.mat[2];
    pOut.mat[3] = 0;
    pOut.mat[4] = rotation.mat[3];
    pOut.mat[5] = rotation.mat[4];
    pOut.mat[6] = rotation.mat[5];
    pOut.mat[7] = 0;
    pOut.mat[8] = rotation.mat[6];
    pOut.mat[9] = rotation.mat[7];
    pOut.mat[10] = rotation.mat[8];
    pOut.mat[11] = 0;
    pOut.mat[12] = translation.x;
    pOut.mat[13] = translation.y;
    pOut.mat[14] = translation.z;
    pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4Scaling = function (pOut, x, y, z) {
    pOut.mat[0] = x;
    pOut.mat[5] = y;
    pOut.mat[10] = z;
    pOut.mat[15] = 1;
    pOut.mat[1] = pOut.mat[2] = pOut.mat[3] = pOut.mat[4] = pOut.mat[6] = pOut.mat[7] = pOut.mat[8] = pOut.mat[9] = pOut.mat[11] = pOut.mat[12] = pOut.mat[13] = pOut.mat[14] = 0;
    return pOut
};
cc.kmMat4Translation = function (pOut, x, y, z) {
    pOut.mat[0] = pOut.mat[5] = pOut.mat[10] = pOut.mat[15] = 1;
    pOut.mat[1] = pOut.mat[2] = pOut.mat[3] = pOut.mat[4] = pOut.mat[6] = pOut.mat[7] = pOut.mat[8] = pOut.mat[9] = pOut.mat[11] = 0;
    pOut.mat[12] = x;
    pOut.mat[13] = y;
    pOut.mat[14] = z;
    return pOut
};
cc.kmMat4GetUpVec3 = function (pOut, pIn) {
    pOut.x = pIn.mat[4];
    pOut.y = pIn.mat[5];
    pOut.z = pIn.mat[6];
    cc.kmVec3Normalize(pOut, pOut);
    return pOut
};
cc.kmMat4GetRightVec3 = function (pOut, pIn) {
    pOut.x = pIn.mat[0];
    pOut.y = pIn.mat[1];
    pOut.z = pIn.mat[2];
    cc.kmVec3Normalize(pOut, pOut);
    return pOut
};
cc.kmMat4GetForwardVec3 = function (pOut, pIn) {
    pOut.x = pIn.mat[8];
    pOut.y = pIn.mat[9];
    pOut.z = pIn.mat[10];
    cc.kmVec3Normalize(pOut, pOut);
    return pOut
};
cc.kmMat4PerspectiveProjection = function (pOut, fovY, aspect, zNear, zFar) {
    var r = cc.kmDegreesToRadians(fovY / 2);
    var deltaZ = zFar - zNear;
    var s = Math.sin(r);
    if (deltaZ == 0 || s == 0 || aspect == 0)return null;
    var cotangent = Math.cos(r) / s;
    cc.kmMat4Identity(pOut);
    pOut.mat[0] = cotangent / aspect;
    pOut.mat[5] = cotangent;
    pOut.mat[10] = -(zFar + zNear) / deltaZ;
    pOut.mat[11] = -1;
    pOut.mat[14] = -2 * zNear * zFar / deltaZ;
    pOut.mat[15] = 0;
    return pOut
};
cc.kmMat4OrthographicProjection = function (pOut, left, right, bottom, top, nearVal, farVal) {
    cc.kmMat4Identity(pOut);
    pOut.mat[0] = 2 / (right - left);
    pOut.mat[5] = 2 / (top - bottom);
    pOut.mat[10] = -2 / (farVal - nearVal);
    pOut.mat[12] = -((right + left) / (right - left));
    pOut.mat[13] = -((top + bottom) / (top - bottom));
    pOut.mat[14] = -((farVal + nearVal) / (farVal - nearVal));
    return pOut
};
cc.kmMat4LookAt = function (pOut, pEye, pCenter, pUp) {
    var f = new cc.kmVec3, up = new cc.kmVec3, s = new cc.kmVec3, u = new cc.kmVec3;
    var translate = new cc.kmMat4;
    cc.kmVec3Subtract(f, pCenter, pEye);
    cc.kmVec3Normalize(f, f);
    cc.kmVec3Assign(up, pUp);
    cc.kmVec3Normalize(up, up);
    cc.kmVec3Cross(s, f, up);
    cc.kmVec3Normalize(s, s);
    cc.kmVec3Cross(u, s, f);
    cc.kmVec3Normalize(s, s);
    cc.kmMat4Identity(pOut);
    pOut.mat[0] = s.x;
    pOut.mat[4] = s.y;
    pOut.mat[8] = s.z;
    pOut.mat[1] = u.x;
    pOut.mat[5] = u.y;
    pOut.mat[9] = u.z;
    pOut.mat[2] = -f.x;
    pOut.mat[6] = -f.y;
    pOut.mat[10] = -f.z;
    cc.kmMat4Translation(translate, -pEye.x, -pEye.y, -pEye.z);
    cc.kmMat4Multiply(pOut, pOut, translate);
    return pOut
};
cc.kmMat4RotationAxisAngle = function (pOut, axis, radians) {
    var rcos = Math.cos(radians);
    var rsin = Math.sin(radians);
    var normalizedAxis = new cc.kmVec3;
    cc.kmVec3Normalize(normalizedAxis, axis);
    pOut.mat[0] = rcos + normalizedAxis.x * normalizedAxis.x * (1 - rcos);
    pOut.mat[1] = normalizedAxis.z * rsin + normalizedAxis.y * normalizedAxis.x * (1 - rcos);
    pOut.mat[2] = -normalizedAxis.y * rsin + normalizedAxis.z * normalizedAxis.x * (1 - rcos);
    pOut.mat[3] = 0;
    pOut.mat[4] = -normalizedAxis.z * rsin + normalizedAxis.x * normalizedAxis.y * (1 - rcos);
    pOut.mat[5] =
        rcos + normalizedAxis.y * normalizedAxis.y * (1 - rcos);
    pOut.mat[6] = normalizedAxis.x * rsin + normalizedAxis.z * normalizedAxis.y * (1 - rcos);
    pOut.mat[7] = 0;
    pOut.mat[8] = normalizedAxis.y * rsin + normalizedAxis.x * normalizedAxis.z * (1 - rcos);
    pOut.mat[9] = -normalizedAxis.x * rsin + normalizedAxis.y * normalizedAxis.z * (1 - rcos);
    pOut.mat[10] = rcos + normalizedAxis.z * normalizedAxis.z * (1 - rcos);
    pOut.mat[11] = 0;
    pOut.mat[12] = 0;
    pOut.mat[13] = 0;
    pOut.mat[14] = 0;
    pOut.mat[15] = 1;
    return pOut
};
cc.kmMat4ExtractRotation = function (pOut, pIn) {
    pOut.mat[0] = pIn.mat[0];
    pOut.mat[1] = pIn.mat[1];
    pOut.mat[2] = pIn.mat[2];
    pOut.mat[3] = pIn.mat[4];
    pOut.mat[4] = pIn.mat[5];
    pOut.mat[5] = pIn.mat[6];
    pOut.mat[6] = pIn.mat[8];
    pOut.mat[7] = pIn.mat[9];
    pOut.mat[8] = pIn.mat[10];
    return pOut
};
cc.kmMat4ExtractPlane = function (pOut, pIn, plane) {
    switch (plane) {
        case cc.KM_PLANE_RIGHT:
            pOut.a = pIn.mat[3] - pIn.mat[0];
            pOut.b = pIn.mat[7] - pIn.mat[4];
            pOut.c = pIn.mat[11] - pIn.mat[8];
            pOut.d = pIn.mat[15] - pIn.mat[12];
            break;
        case cc.KM_PLANE_LEFT:
            pOut.a = pIn.mat[3] + pIn.mat[0];
            pOut.b = pIn.mat[7] + pIn.mat[4];
            pOut.c = pIn.mat[11] + pIn.mat[8];
            pOut.d = pIn.mat[15] + pIn.mat[12];
            break;
        case cc.KM_PLANE_BOTTOM:
            pOut.a = pIn.mat[3] + pIn.mat[1];
            pOut.b = pIn.mat[7] + pIn.mat[5];
            pOut.c = pIn.mat[11] + pIn.mat[9];
            pOut.d = pIn.mat[15] + pIn.mat[13];
            break;
        case cc.KM_PLANE_TOP:
            pOut.a = pIn.mat[3] - pIn.mat[1];
            pOut.b = pIn.mat[7] - pIn.mat[5];
            pOut.c = pIn.mat[11] - pIn.mat[9];
            pOut.d = pIn.mat[15] - pIn.mat[13];
            break;
        case cc.KM_PLANE_FAR:
            pOut.a = pIn.mat[3] - pIn.mat[2];
            pOut.b = pIn.mat[7] - pIn.mat[6];
            pOut.c = pIn.mat[11] - pIn.mat[10];
            pOut.d = pIn.mat[15] - pIn.mat[14];
            break;
        case cc.KM_PLANE_NEAR:
            pOut.a = pIn.mat[3] + pIn.mat[2];
            pOut.b = pIn.mat[7] + pIn.mat[6];
            pOut.c = pIn.mat[11] + pIn.mat[10];
            pOut.d = pIn.mat[15] + pIn.mat[14];
            break;
        default:
            cc.log("cc.kmMat4ExtractPlane(): Invalid plane index");
            break
    }
    var t = Math.sqrt(pOut.a * pOut.a + pOut.b * pOut.b + pOut.c * pOut.c);
    pOut.a /= t;
    pOut.b /= t;
    pOut.c /= t;
    pOut.d /= t;
    return pOut
};
cc.kmMat4RotationToAxisAngle = function (pAxis, radians, pIn) {
    var temp = new cc.kmQuaternion;
    var rotation = new cc.kmMat3;
    cc.kmMat4ExtractRotation(rotation, pIn);
    cc.kmQuaternionRotationMatrix(temp, rotation);
    cc.kmQuaternionToAxisAngle(temp, pAxis, radians);
    return pAxis
};
cc.KM_PLANE_LEFT = 0;
cc.KM_PLANE_RIGHT = 1;
cc.KM_PLANE_BOTTOM = 2;
cc.KM_PLANE_TOP = 3;
cc.KM_PLANE_NEAR = 4;
cc.KM_PLANE_FAR = 5;
cc.kmPlane = function (a, b, c, d) {
    this.a = a || 0;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 0
};
cc.POINT_INFRONT_OF_PLANE = 0;
cc.POINT_BEHIND_PLANE = 1;
cc.POINT_ON_PLANE = 2;
cc.kmPlaneDot = function (pP, pV) {
    return pP.a * pV.x + pP.b * pV.y + pP.c * pV.z + pP.d * pV.w
};
cc.kmPlaneDotCoord = function (pP, pV) {
    return pP.a * pV.x + pP.b * pV.y + pP.c * pV.z + pP.d
};
cc.kmPlaneDotNormal = function (pP, pV) {
    return pP.a * pV.x + pP.b * pV.y + pP.c * pV.z
};
cc.kmPlaneFromPointNormal = function (pOut, pPoint, pNormal) {
    pOut.a = pNormal.x;
    pOut.b = pNormal.y;
    pOut.c = pNormal.z;
    pOut.d = -cc.kmVec3Dot(pNormal, pPoint);
    return pOut
};
cc.kmPlaneFromPoints = function (pOut, p1, p2, p3) {
    var n = new cc.kmVec3, v1 = new cc.kmVec3, v2 = new cc.kmVec3;
    cc.kmVec3Subtract(v1, p2, p1);
    cc.kmVec3Subtract(v2, p3, p1);
    cc.kmVec3Cross(n, v1, v2);
    cc.kmVec3Normalize(n, n);
    pOut.a = n.x;
    pOut.b = n.y;
    pOut.c = n.z;
    pOut.d = cc.kmVec3Dot(cc.kmVec3Scale(n, n, -1), p1);
    return pOut
};
cc.kmPlaneIntersectLine = function (pOut, pP, pV1, pV2) {
    throw"cc.kmPlaneIntersectLine() hasn't been implemented.";
};
cc.kmPlaneNormalize = function (pOut, pP) {
    var n = new cc.kmVec3;
    n.x = pP.a;
    n.y = pP.b;
    n.z = pP.c;
    var l = 1 / cc.kmVec3Length(n);
    cc.kmVec3Normalize(n, n);
    pOut.a = n.x;
    pOut.b = n.y;
    pOut.c = n.z;
    pOut.d = pP.d * l;
    return pOut
};
cc.kmPlaneScale = function (pOut, pP, s) {
    cc.log("cc.kmPlaneScale() has not been implemented.")
};
cc.kmPlaneClassifyPoint = function (pIn, pP) {
    var distance = pIn.a * pP.x + pIn.b * pP.y + pIn.c * pP.z + pIn.d;
    if (distance > 0.001)return cc.POINT_INFRONT_OF_PLANE;
    if (distance < -0.001)return cc.POINT_BEHIND_PLANE;
    return cc.POINT_ON_PLANE
};
cc.kmQuaternion = function (x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0
};
cc.kmQuaternionConjugate = function (pOut, pIn) {
    pOut.x = -pIn.x;
    pOut.y = -pIn.y;
    pOut.z = -pIn.z;
    pOut.w = pIn.w;
    return pOut
};
cc.kmQuaternionDot = function (q1, q2) {
    return q1.w * q2.w + q1.x * q2.x + q1.y * q2.y + q1.z * q2.z
};
cc.kmQuaternionExp = function (pOut, pIn) {
    return pOut
};
cc.kmQuaternionIdentity = function (pOut) {
    pOut.x = 0;
    pOut.y = 0;
    pOut.z = 0;
    pOut.w = 1;
    return pOut
};
cc.kmQuaternionInverse = function (pOut, pIn) {
    var l = cc.kmQuaternionLength(pIn);
    var tmp = new cc.kmQuaternion;
    if (Math.abs(l) > cc.kmEpsilon) {
        pOut.x = 0;
        pOut.y = 0;
        pOut.z = 0;
        pOut.w = 0;
        return pOut
    }
    cc.kmQuaternionScale(pOut, cc.kmQuaternionConjugate(tmp, pIn), 1 / l);
    return pOut
};
cc.kmQuaternionIsIdentity = function (pIn) {
    return pIn.x == 0 && pIn.y == 0 && pIn.z == 0 && pIn.w == 1
};
cc.kmQuaternionLength = function (pIn) {
    return Math.sqrt(cc.kmQuaternionLengthSq(pIn))
};
cc.kmQuaternionLengthSq = function (pIn) {
    return pIn.x * pIn.x + pIn.y * pIn.y + pIn.z * pIn.z + pIn.w * pIn.w
};
cc.kmQuaternionLn = function (pOut, pIn) {
    return pOut
};
cc.kmQuaternionMultiply = function (pOut, q1, q2) {
    pOut.w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
    pOut.x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
    pOut.y = q1.w * q2.y + q1.y * q2.w + q1.z * q2.x - q1.x * q2.z;
    pOut.z = q1.w * q2.z + q1.z * q2.w + q1.x * q2.y - q1.y * q2.x;
    return pOut
};
cc.kmQuaternionNormalize = function (pOut, pIn) {
    var length = cc.kmQuaternionLength(pIn);
    if (Math.abs(length) <= cc.kmEpsilon)throw"cc.kmQuaternionNormalize(): pIn is an invalid value";
    cc.kmQuaternionScale(pOut, pIn, 1 / length);
    return pOut
};
cc.kmQuaternionRotationAxis = function (pOut, pV, angle) {
    var rad = angle * 0.5;
    var scale = Math.sin(rad);
    pOut.w = Math.cos(rad);
    pOut.x = pV.x * scale;
    pOut.y = pV.y * scale;
    pOut.z = pV.z * scale;
    return pOut
};
cc.kmQuaternionRotationMatrix = function (pOut, pIn) {
    var x, y, z, w;
    var m4x4 = [];
    var scale = 0;
    var diagonal = 0;
    if (!pIn)return null;
    m4x4[0] = pIn.mat[0];
    m4x4[1] = pIn.mat[3];
    m4x4[2] = pIn.mat[6];
    m4x4[4] = pIn.mat[1];
    m4x4[5] = pIn.mat[4];
    m4x4[6] = pIn.mat[7];
    m4x4[8] = pIn.mat[2];
    m4x4[9] = pIn.mat[5];
    m4x4[10] = pIn.mat[8];
    m4x4[15] = 1;
    var pMatrix = m4x4[0];
    diagonal = pMatrix[0] + pMatrix[5] + pMatrix[10] + 1;
    if (diagonal > cc.kmEpsilon) {
        scale = Math.sqrt(diagonal) * 2;
        x = (pMatrix[9] - pMatrix[6]) / scale;
        y = (pMatrix[2] - pMatrix[8]) / scale;
        z = (pMatrix[4] - pMatrix[1]) /
            scale;
        w = 0.25 * scale
    } else if (pMatrix[0] > pMatrix[5] && pMatrix[0] > pMatrix[10]) {
        scale = Math.sqrt(1 + pMatrix[0] - pMatrix[5] - pMatrix[10]) * 2;
        x = 0.25 * scale;
        y = (pMatrix[4] + pMatrix[1]) / scale;
        z = (pMatrix[2] + pMatrix[8]) / scale;
        w = (pMatrix[9] - pMatrix[6]) / scale
    } else if (pMatrix[5] > pMatrix[10]) {
        scale = Math.sqrt(1 + pMatrix[5] - pMatrix[0] - pMatrix[10]) * 2;
        x = (pMatrix[4] + pMatrix[1]) / scale;
        y = 0.25 * scale;
        z = (pMatrix[9] + pMatrix[6]) / scale;
        w = (pMatrix[2] - pMatrix[8]) / scale
    } else {
        scale = Math.sqrt(1 + pMatrix[10] - pMatrix[0] - pMatrix[5]) * 2;
        x = (pMatrix[2] +
            pMatrix[8]) / scale;
        y = (pMatrix[9] + pMatrix[6]) / scale;
        z = 0.25 * scale;
        w = (pMatrix[4] - pMatrix[1]) / scale
    }
    pOut.x = x;
    pOut.y = y;
    pOut.z = z;
    pOut.w = w;
    return pOut
};
cc.kmQuaternionRotationYawPitchRoll = function (pOut, yaw, pitch, roll) {
    var ex, ey, ez;
    var cr, cp, cy, sr, sp, sy, cpcy, spsy;
    ex = cc.kmDegreesToRadians(pitch) / 2;
    ey = cc.kmDegreesToRadians(yaw) / 2;
    ez = cc.kmDegreesToRadians(roll) / 2;
    cr = Math.cos(ex);
    cp = Math.cos(ey);
    cy = Math.cos(ez);
    sr = Math.sin(ex);
    sp = Math.sin(ey);
    sy = Math.sin(ez);
    cpcy = cp * cy;
    spsy = sp * sy;
    pOut.w = cr * cpcy + sr * spsy;
    pOut.x = sr * cpcy - cr * spsy;
    pOut.y = cr * sp * cy + sr * cp * sy;
    pOut.z = cr * cp * sy - sr * sp * cy;
    cc.kmQuaternionNormalize(pOut, pOut);
    return pOut
};
cc.kmQuaternionSlerp = function (pOut, q1, q2, t) {
    if (q1.x == q2.x && q1.y == q2.y && q1.z == q2.z && q1.w == q2.w) {
        pOut.x = q1.x;
        pOut.y = q1.y;
        pOut.z = q1.z;
        pOut.w = q1.w;
        return pOut
    }
    var ct = cc.kmQuaternionDot(q1, q2);
    var theta = Math.acos(ct);
    var st = Math.sqrt(1 - cc.kmSQR(ct));
    var stt = Math.sin(t * theta) / st;
    var somt = Math.sin((1 - t) * theta) / st;
    var temp = new cc.kmQuaternion, temp2 = new cc.kmQuaternion;
    cc.kmQuaternionScale(temp, q1, somt);
    cc.kmQuaternionScale(temp2, q2, stt);
    cc.kmQuaternionAdd(pOut, temp, temp2);
    return pOut
};
cc.kmQuaternionToAxisAngle = function (pIn, pAxis, pAngle) {
    var tempAngle;
    var scale;
    tempAngle = Math.acos(pIn.w);
    scale = Math.sqrt(cc.kmSQR(pIn.x) + cc.kmSQR(pIn.y) + cc.kmSQR(pIn.z));
    if (scale > -cc.kmEpsilon && scale < cc.kmEpsilon || scale < 2 * cc.kmPI + cc.kmEpsilon && scale > 2 * cc.kmPI - cc.kmEpsilon) {
        pAngle = 0;
        pAxis.x = 0;
        pAxis.y = 0;
        pAxis.z = 1
    } else {
        pAngle = tempAngle * 2;
        pAxis.x = pIn.x / scale;
        pAxis.y = pIn.y / scale;
        pAxis.z = pIn.z / scale;
        cc.kmVec3Normalize(pAxis, pAxis)
    }
};
cc.kmQuaternionScale = function (pOut, pIn, s) {
    pOut.x = pIn.x * s;
    pOut.y = pIn.y * s;
    pOut.z = pIn.z * s;
    pOut.w = pIn.w * s;
    return pOut
};
cc.kmQuaternionAssign = function (pOut, pIn) {
    pOut.x = pIn.x;
    pOut.y = pIn.y;
    pOut.z = pIn.z;
    pOut.w = pIn.w;
    return pOut
};
cc.kmQuaternionAdd = function (pOut, pQ1, pQ2) {
    pOut.x = pQ1.x + pQ2.x;
    pOut.y = pQ1.y + pQ2.y;
    pOut.z = pQ1.z + pQ2.z;
    pOut.w = pQ1.w + pQ2.w;
    return pOut
};
cc.kmQuaternionRotationBetweenVec3 = function (pOut, vec1, vec2, fallback) {
    var v1 = new cc.kmVec3, v2 = new cc.kmVec3;
    var a;
    cc.kmVec3Assign(v1, vec1);
    cc.kmVec3Assign(v2, vec2);
    cc.kmVec3Normalize(v1, v1);
    cc.kmVec3Normalize(v2, v2);
    a = cc.kmVec3Dot(v1, v2);
    if (a >= 1) {
        cc.kmQuaternionIdentity(pOut);
        return pOut
    }
    if (a < 1E-6 - 1)if (Math.abs(cc.kmVec3LengthSq(fallback)) < cc.kmEpsilon)cc.kmQuaternionRotationAxis(pOut, fallback, cc.kmPI); else {
        var axis = new cc.kmVec3;
        var X = new cc.kmVec3;
        X.x = 1;
        X.y = 0;
        X.z = 0;
        cc.kmVec3Cross(axis, X, vec1);
        if (Math.abs(cc.kmVec3LengthSq(axis)) <
            cc.kmEpsilon) {
            var Y = new cc.kmVec3;
            Y.x = 0;
            Y.y = 1;
            Y.z = 0;
            cc.kmVec3Cross(axis, Y, vec1)
        }
        cc.kmVec3Normalize(axis, axis);
        cc.kmQuaternionRotationAxis(pOut, axis, cc.kmPI)
    } else {
        var s = Math.sqrt((1 + a) * 2);
        var invs = 1 / s;
        var c = new cc.kmVec3;
        cc.kmVec3Cross(c, v1, v2);
        pOut.x = c.x * invs;
        pOut.y = c.y * invs;
        pOut.z = c.z * invs;
        pOut.w = s * 0.5;
        cc.kmQuaternionNormalize(pOut, pOut)
    }
    return pOut
};
cc.kmQuaternionMultiplyVec3 = function (pOut, q, v) {
    var uv = new cc.kmVec3, uuv = new cc.kmVec3, qvec = new cc.kmVec3;
    qvec.x = q.x;
    qvec.y = q.y;
    qvec.z = q.z;
    cc.kmVec3Cross(uv, qvec, v);
    cc.kmVec3Cross(uuv, qvec, uv);
    cc.kmVec3Scale(uv, uv, 2 * q.w);
    cc.kmVec3Scale(uuv, uuv, 2);
    cc.kmVec3Add(pOut, v, uv);
    cc.kmVec3Add(pOut, pOut, uuv);
    return pOut
};
cc.kmAABB = function (min, max) {
    this.min = min || new cc.kmVec3;
    this.max = max || new cc.kmVec3
};
cc.kmAABBContainsPoint = function (pPoint, pBox) {
    if (pPoint.x >= pBox.min.x && pPoint.x <= pBox.max.x && pPoint.y >= pBox.min.y && pPoint.y <= pBox.max.y && pPoint.z >= pBox.min.z && pPoint.z <= pBox.max.z)return cc.KM_TRUE;
    return cc.KM_FALSE
};
cc.kmAABBAssign = function (pOut, pIn) {
    cc.kmVec3Assign(pOut.min, pIn.min);
    cc.kmVec3Assign(pOut.max, pIn.max);
    return pOut
};
cc.kmAABBScale = function (pOut, pIn, s) {
    cc.log("cc.kmAABBScale hasn't been supported.")
};
cc.km_mat4_stack = function (capacity, item_count, top, stack) {
    this.top = top;
    this.stack = stack
};
cc.km_mat4_stack.INITIAL_SIZE = 30;
cc.km_mat4_stack_initialize = function (stack) {
    stack.stack = [];
    stack.top = null
};
cc.km_mat4_stack_push = function (stack, item) {
    stack.stack.push(stack.top);
    stack.top = new cc.kmMat4;
    cc.kmMat4Assign(stack.top, item)
};
cc.km_mat4_stack_pop = function (stack, pOut) {
    stack.top = stack.stack.pop()
};
cc.km_mat4_stack_release = function (stack) {
    stack.stack = null;
    stack.top = null;
    stack = null
};
cc.KM_GL_MODELVIEW = 5888;
cc.KM_GL_PROJECTION = 5889;
cc.KM_GL_TEXTURE = 5890;
cc.modelview_matrix_stack = new cc.km_mat4_stack;
cc.projection_matrix_stack = new cc.km_mat4_stack;
cc.texture_matrix_stack = new cc.km_mat4_stack;
cc.current_stack = null;
cc.initialized = false;
cc.lazyInitialize = function () {
    if (!cc.initialized) {
        var identity = new cc.kmMat4;
        cc.km_mat4_stack_initialize(cc.modelview_matrix_stack);
        cc.km_mat4_stack_initialize(cc.projection_matrix_stack);
        cc.km_mat4_stack_initialize(cc.texture_matrix_stack);
        cc.current_stack = cc.modelview_matrix_stack;
        cc.initialized = true;
        cc.kmMat4Identity(identity);
        cc.km_mat4_stack_push(cc.modelview_matrix_stack, identity);
        cc.km_mat4_stack_push(cc.projection_matrix_stack, identity);
        cc.km_mat4_stack_push(cc.texture_matrix_stack, identity)
    }
};
cc.lazyInitialize();
cc.kmGLFreeAll = function () {
    cc.km_mat4_stack_release(cc.modelview_matrix_stack);
    cc.km_mat4_stack_release(cc.projection_matrix_stack);
    cc.km_mat4_stack_release(cc.texture_matrix_stack);
    cc.initialized = false;
    cc.current_stack = null
};
cc.kmGLPushMatrix = function () {
    cc.km_mat4_stack_push(cc.current_stack, cc.current_stack.top)
};
cc.kmGLPushMatrixWitMat4 = function (saveMat) {
    cc.current_stack.stack.push(cc.current_stack.top);
    cc.kmMat4Assign(saveMat, cc.current_stack.top);
    cc.current_stack.top = saveMat
};
cc.kmGLPopMatrix = function () {
    cc.current_stack.top = cc.current_stack.stack.pop()
};
cc.kmGLMatrixMode = function (mode) {
    switch (mode) {
        case cc.KM_GL_MODELVIEW:
            cc.current_stack = cc.modelview_matrix_stack;
            break;
        case cc.KM_GL_PROJECTION:
            cc.current_stack = cc.projection_matrix_stack;
            break;
        case cc.KM_GL_TEXTURE:
            cc.current_stack = cc.texture_matrix_stack;
            break;
        default:
            throw"Invalid matrix mode specified";
            break
    }
};
cc.kmGLLoadIdentity = function () {
    cc.kmMat4Identity(cc.current_stack.top)
};
cc.kmGLLoadMatrix = function (pIn) {
    cc.kmMat4Assign(cc.current_stack.top, pIn)
};
cc.kmGLMultMatrix = function (pIn) {
    cc.kmMat4Multiply(cc.current_stack.top, cc.current_stack.top, pIn)
};
cc.kmGLTranslatef = function (x, y, z) {
    var translation = new cc.kmMat4;
    cc.kmMat4Translation(translation, x, y, z);
    cc.kmMat4Multiply(cc.current_stack.top, cc.current_stack.top, translation)
};
cc.kmGLRotatef = function (angle, x, y, z) {
    var axis = new cc.kmVec3(x, y, z);
    var rotation = new cc.kmMat4;
    cc.kmMat4RotationAxisAngle(rotation, axis, cc.kmDegreesToRadians(angle));
    cc.kmMat4Multiply(cc.current_stack.top, cc.current_stack.top, rotation)
};
cc.kmGLScalef = function (x, y, z) {
    var scaling = new cc.kmMat4;
    cc.kmMat4Scaling(scaling, x, y, z);
    cc.kmMat4Multiply(cc.current_stack.top, cc.current_stack.top, scaling)
};
cc.kmGLGetMatrix = function (mode, pOut) {
    switch (mode) {
        case cc.KM_GL_MODELVIEW:
            cc.kmMat4Assign(pOut, cc.modelview_matrix_stack.top);
            break;
        case cc.KM_GL_PROJECTION:
            cc.kmMat4Assign(pOut, cc.projection_matrix_stack.top);
            break;
        case cc.KM_GL_TEXTURE:
            cc.kmMat4Assign(pOut, cc.texture_matrix_stack.top);
            break;
        default:
            throw"Invalid matrix mode specified";
            break
    }
};