var scene, camera, renderer;
//#region Basic variables 

var mtlloader = new THREE.MTLLoader();
var objloader = new THREE.OBJLoader();
var textureLoader = new THREE.TextureLoader();

var defaultmaterial = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });

var boxgeometry = new THREE.BoxGeometry();
var tl = new TimelineMax();

//#endregion
//#region Set Up

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

//#endregion

var selection = '';
var previousplanet;
var earth, africa, asia, europe, namerica, samerica, antartica, australia;
LoadOBJWithMTL('../models/Earth/earth.mtl', '../models/Earth/earth.obj', (ear) => {
    earth = ear;
    previousplanet = earth;
    earth.scale.set(2, 2, 2);
    scene.add(earth);

    LoadOBJWithMTL('../models/Africa/Africa.mtl', '../models/Africa/Africa.obj', (afr) => {
        africa = afr;
        africa.scale.set(2, 2, 2);
        africa.visible = false;
        scene.add(africa);

        LoadOBJWithMTL('../models/Asia/Asia.mtl', '../models/Asia/Asia.obj', (asi) => {
            asia = asi;
            asia.scale.set(2, 2, 2);
            asia.visible = false;
            scene.add(asia);

            LoadOBJWithMTL('../models/Europe/Europe.mtl', '../models/Europe/Europe.obj', (eur) => {
                europe = eur; 
                europe.scale.set(2, 2, 2);
                europe.visible = false;
                scene.add(europe);

                LoadOBJWithMTL('../models/NAmerica/NAmerica.mtl', '../models/NAmerica/NAmerica.obj', (nam) => {
                    namerica = nam; 
                    namerica.scale.set(2, 2, 2);
                    namerica.visible = false;
                    scene.add(namerica);

                    LoadOBJWithMTL('../models/SAmerica/SAmerica.mtl', '../models/SAmerica/SAmerica.obj', (sam) => {
                        samerica = sam; 
                        samerica.scale.set(2, 2, 2);
                        samerica.visible = false;
                        scene.add(samerica);

                        LoadOBJWithMTL('../models/Antartica/Antartica.mtl', '../models/Antartica/Antartica.obj', (ant) => {
                            antartica = ant; 
                            antartica.scale.set(2, 2, 2);
                            antartica.visible = false;
                            scene.add(antartica);

                            LoadOBJWithMTL('../models/Australia/Australia.mtl', '../models/Australia/Australia.obj', (aus) => {
                                australia = aus; 
                                australia.scale.set(2, 2, 2);
                                australia.visible = false;
                                scene.add(australia);
                            });
                        });
                    });
                });
            });
        });
    });
});

//#region Add Lights
AddLight(0, 10, 0);
AddLight(10, 0, 0);
AddLight(0, 0, 10);
AddLight(0, -10, 0);
AddLight(-10, 0, 0);
AddLight(0, 0, -10);
//#endregion

var syllables = [
    { element: document.getElementById('Con'), height: 3.5, up: false},
    { element: document.getElementById('ti'), height: 4, up: true },
    { element: document.getElementById('nents'), height: 4.5, up: true }
];

syllables.forEach((val) => {
    val.element.style.left = (val.element.getBoundingClientRect().x - (0.35 * innerWidth)) + 'px';
})

function onRender(){
    if(earth && africa && asia && europe && namerica && samerica && antartica && australia) {
        switch (selection) {
            case '':

                if (getdifference(earth.rotation.x, 0) > 0.01 || getdifference(earth.rotation.z, 0) > 0.01 && !earth.visible) {
                    new TimelineMax().to(earth.rotation, 1, { x: 0, z: 0 });
                } else {
                    earth.rotation.y += 0.01;

                    SetAllPlanetY()
                }
                
                SetVisiblePlanets(earth);
                break;
            case 'Africa':
                HandlePlanet(africa, 0, DegToRad(270), 0);

                SetAllPlanetRot(africa);

                SetVisiblePlanets(africa);
                break;
            case 'Asia':
                HandlePlanet(asia, DegToRad(15), DegToRad(200), 0);

                SetAllPlanetRot(asia)
                
                SetVisiblePlanets(asia);
                break;
            case 'Europe':
                HandlePlanet(europe, DegToRad(50), DegToRad(250), 0);

                SetAllPlanetRot(europe);
                
                SetVisiblePlanets(europe);
                break;
            case 'North America':
                HandlePlanet(namerica, DegToRad(40), DegToRad(50), 0);

                SetAllPlanetRot(namerica)

                SetVisiblePlanets(namerica);
                break;
            case 'South America':
                HandlePlanet(samerica, DegToRad(-10), 0, 0);

                SetAllPlanetRot(samerica);
                
                SetVisiblePlanets(samerica);
                break;
            case 'Antartica':
                HandlePlanet(antartica, DegToRad(-90), 0, 0);

                if (antartica.visible) {
                    antartica.rotation.y += 0.01
                }
                
                SetAllPlanetRot(antartica);

                SetVisiblePlanets(antartica);
                break;
            case 'Australia':
                HandlePlanet(australia, DegToRad(-20), DegToRad(170), 0);

                SetAllPlanetRot(australia);

                SetVisiblePlanets(australia);
                break;
        }

        if ((Math.PI * 2) - earth.rotation.y < 0.01) {
            earth.rotation.y = 0;
        }

        syllables.forEach((val) => {
            val.element.style.position = 'absolute'
            if (val.height >= 6.5) val.up = true;
            if (val.height <= 3.5) val.up = false;

            val.element.style.top = val.height + 'vh';
            val.up ? val.height -= 0.075 : val.height += 0.075;
        })

    }

}

document.querySelector('canvas').addEventListener('click', () => selection = '');

function getdifference(val1, val2) {
    var diff = val1 - val2;
    return Math.abs(diff)
}

//#region Rendering
function Render() {
    requestAnimationFrame(Render);
    renderer.render(scene, camera);
    onRender();
}
Render()
//#endregion