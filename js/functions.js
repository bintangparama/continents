/**
 * Loads OBJ file With MTL
 * @param {String} mtlurl 
 * @param {String} objurl 
 * @param {(Object) => {}} callback 
 */
function LoadOBJWithMTL(mtlurl, objurl, callback) {
    console.log('loading model \nmtl: ' + mtlurl + '\nobj: ' + objurl );
    objmtlpromise(mtlurl, objurl).then((res) => {
        callback(res);
    }).catch((err) => console.error(err));
}

function objmtlpromise(mtlurl, objurl) {
    return new Promise((resolve, reject) => {

        mtlloader.load(mtlurl, (mtlmat) => {

            objloader.setMaterials(mtlmat);

            objloader.load(objurl, (object) => {

                resolve(object);
            }, undefined, (err) => reject(err));
        }, undefined, (err) => reject(err));
    })
}

function LoadOBJWithImage(objurl, imgurl, callback) {
    var  material = new THREE.MeshBasicMaterial({ 
        color: 0xFF0000, 
        side: THREE.FrontSide, 
        map: textureLoader.load(imgurl)
    });

    objloader.load(objurl, (res) => {
        res.material = material;
        callback(res);
    })
}
/**
 * Degrees to Radians
 */
var conversionnumber = 3.141592653589 / 180;
function DegToRad(value) {
    return value * conversionnumber;
}

function AddLight(x, y, z) {
    var light = new THREE.PointLight(0xFFFFFF, .75, 500);
    light.position.set(x, y, z);
    scene.add(light);
}

function selectcontinent(name) {
    selection = name;
}

function HandlePlanet(planet, x, y, z) {
    if (!planet.visible) {
        new TimelineMax().to(planet.rotation, 1, { x: x, y: y, z: z, ease : Expo.easeInOut })
    }
}

function SetPlanetY(planet, y) {
    planet.rotation.x = 0;
    planet.rotation.y = y;
    planet.rotation.z = 0;
}
function SetPlanetRot(planet, valueplanet) {
    planet.rotation.x = valueplanet.rotation.x;
    planet.rotation.y = valueplanet.rotation.y;
    planet.rotation.z = valueplanet.rotation.z;
}

function SetAllPlanetRot(value) {
    SetPlanetRot(earth, value);
    SetPlanetRot(africa, value);
    SetPlanetRot(asia, value);
    SetPlanetRot(europe, value);
    SetPlanetRot(namerica, value);
    SetPlanetRot(samerica, value);
    SetPlanetRot(antartica, value);
    SetPlanetRot(australia, value);
}

function SetVisiblePlanets(planet) {
    earth.visible = planet === earth;
    africa.visible = planet === africa;
    asia.visible = planet === asia;
    europe.visible = planet === europe;
    namerica.visible = planet === namerica;
    samerica.visible = planet === samerica;
    antartica.visible = planet === antartica;
    australia.visible = planet === australia;
}

function SetAllPlanetY() {
    SetPlanetY(africa, earth.rotation.y);
    SetPlanetY(asia, earth.rotation.y);
    SetPlanetY(europe, earth.rotation.y);
    SetPlanetY(namerica, earth.rotation.y);
    SetPlanetY(samerica, earth.rotation.y);
    SetPlanetY(antartica, earth.rotation.y);
    SetPlanetY(australia, earth.rotation.y);
}