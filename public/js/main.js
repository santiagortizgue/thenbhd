//discografia

hoverAlbum();

function hoverAlbum() {
    var albumsArray = document.getElementsByClassName('album');

    for (var i = 0; i < albumsArray.length; i++) {
        const element = albumsArray[i];
        element.children[0].style.display = 'none';
    }

    for (var i = 0; i < albumsArray.length; i++) {
        const element = albumsArray[i];
        element.addEventListener("mouseover", function () {
            element.children[0].style.display = 'flex';
        });
    }

    for (var i = 0; i < albumsArray.length; i++) {
        const element = albumsArray[i];
        element.addEventListener("mouseout", function () {
            element.children[0].style.display = 'none';
        });
    }
}


//discografia


//info

var contCards = document.getElementById('contCard');
var cards = [{
    name: 'HISTORIA',
    texto: 'The Neighbourhood (estilizado como THE NBHD) es un grupo musical de rock estadounidense formado en agosto de 2011. La banda está compuesta por el vocalista Jesse Rutherford, los guitarristas Jeremy Freedman y Zach Abels, el baterista Brandon Fried y el bajista Mikey Margott. Después de lanzar dos EPs, I’m Sorry… y Thank You, The Neighbourhood publicó su primer álbum de larga duración, I Love You., el 23 de abril de 2013, a través de Columbia Records. El 16 de enero de 2014, la banda reveló a través de medios de comunicación social que el baterista Bryan Sammis dejaba la banda para seguir una carrera en solitario en la música.'
}, {
    name: 'VIDEOS',
    texto: 'Los videos musicales en los que ha participado:',
    list: ['Female Robbery', 'Let It Go', 'A Little Death', 'Sweater Weather', 'Afraid', 'Dangerous', 'R.I.P. 2 my youth', 'Daddy Issues']
}, {
    name: 'INTEGRANTES',
    texto: 'Los miembros actuales del grupo son:',
    list: ['Jesse Rutherford: voz', 'Zach Abels: guitarra', 'Michael «Mikey» Margott: bajo', 'Jeremy Freedman: guitarra', 'Brandon Fried: batería']
}];

function createCard(name, texto, list) {
    var card = document.createElement('article');
    card.setAttribute('class', 'card');

    var titulo = document.createElement('h2');
    titulo.innerHTML = name;

    var text = document.createElement('p');
    text.innerHTML = texto;

    card.appendChild(titulo);
    card.appendChild(text);

    if (list != null) {
        var lista = document.createElement('ul');
        for (var i = 0; i < list.length; i++) {
            const element = list[i];
            var li = document.createElement('li');
            li.innerHTML = element;
            lista.appendChild(li);
        }
        card.appendChild(lista);
        lista.style.display = 'none';
    }

    contCards.appendChild(card);

    text.style.display = 'none';
}

for (var i = 0; i < cards.length; i++) {
    const element = cards[i];
    createCard(element.name, element.texto, element.list);
}

var cardsArray = document.getElementsByClassName('card');

for (var i = 0; i < cardsArray.length; i++) {
    const card = cardsArray[i];

    card.addEventListener('mouseover', function () {
        card.children[1].style.display = 'block';
        if (card.children.length > 2) {
            card.children[2].style.display = 'block';
        }
    });

    card.addEventListener('mouseout', function () {
        card.children[1].style.display = 'none';
        if (card.children.length > 2) {
            card.children[2].style.display = 'none';
        }
    });

}

//sub
var btnCorreo = document.getElementById('btnCorreo');
var inpCorreo = document.getElementById('correo');

btnCorreo.addEventListener('click', sub);

function sub() {
    if (inpCorreo.value != '') {
        swal({
            title: '¡Gracias!',
            text: 'Te enviaremos informacion a: ' + inpCorreo.value,
            type: 'success',
            showConfirmButton: false,
            timer: 2000
        });
        inpCorreo.value = '';
    }
}

//

//info

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

//3D

var camera, scene, renderer;
var raycaster;

var obj;
var mouse = new THREE.Vector2(),
    INTERSECTED;

var contenedor = document.getElementById("grupo3D");

var particles;


init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(55, contenedor.clientWidth / contenedor.clientHeight, 1, 2000);
    camera.position.z = 300;

    //controls
    var controls = new THREE.OrbitControls(camera);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141414);

    var ambientLight = new THREE.AmbientLight(0x168e6, 0.3);
    scene.add(ambientLight);
    var pointLight = new THREE.PointLight(0xfffffff, 0.7);
    camera.add(pointLight);
    scene.add(camera);

    //
    var geometry = new THREE.BufferGeometry();
    var vertices = [];

    var sprite = new THREE.TextureLoader().load('/models/text/circle.png');

    for (var i = 0; i < 10; i++) {
        /*  var x = 300 * Math.random() - 150;
          var y = 300 * Math.random() - 150;
          var z = 300 * Math.random() - 150;*/
        var x = getRandom(-50, 50);
        var y = getRandom(-50, 50);
        var z = getRandom(-50, 50);
        vertices.push(x, y, z);
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    material = new THREE.PointsMaterial({
        size: 25,
        sizeAttenuation: false,
        map: sprite,
        alphaTest: 0.5,
        transparent: true
    });
    material.color.setHSL(0.6, 0.5, 0.5);

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    //

    // model
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function (xhr) {};

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    new THREE.MTLLoader()
        .setPath('/models/')
        .load('holi.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('/models/')
                .load('Logo.obj', function (object) {
                    obj = object;
                    obj.rotation.x = 4.9;
                    scene.add(obj);
                }, onProgress, onError);
        });

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
    contenedor.appendChild(renderer.domElement);

    window.addEventListener('resize', cambioDeTamano, false);
    window.addEventListener('mousemove', onDocumentMouseMove, false);
}

function animate() {

    requestAnimationFrame(animate);

    if (obj != null) {
        obj.rotation.z += 0.001;
    }

    render();
    renderer.render(scene, camera);

}

function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function cambioDeTamano() {
    camera.aspect = contenedor.clientWidth / contenedor.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
}

function render() {



    // find intersections


    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
    }
    renderer.render(scene, camera);
}

//scrollReveral
window.sr = ScrollReveal({
    reset: true
});
sr.reveal('footer');
sr.reveal('.songLink');
sr.reveal('.album');
sr.reveal('.card');
sr.reveal('.titleSec');
sr.reveal('label');
//