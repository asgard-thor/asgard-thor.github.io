var container, stats;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0;

var windowHalfX;
var windowHalfY;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

init();
animate();

function init() {
	
	

	container = document.getElementById( 'container' );
	
	windowHalfX = window.innerWidth / 2;
	//windowHalfY = window.innerHeight / 2;
	windowHalfY = 100;

	camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight, 1, 2000 );
	camera.position.z = 500;

	scene = new THREE.Scene();

	group = new THREE.Group();
	
	scene.add( group );
	
	

	var loader = new THREE.TextureLoader();
	loader.load( 'images/image02.jpg', function ( texture ) {

		var geometry = new THREE.IcosahedronGeometry(200, 0);

		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
		var mesh = new THREE.Mesh( geometry, material );
		group.add( mesh );

	} );
	loader.wrapS = THREE.RepeatWrapping;
	loader.wrapT = THREE.RepeatWrapping;

	
	group.rotation.z+=0.523599;
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( container.clientWidth, container.clientHeight );
	document.getElementById('container').appendChild(renderer.domElement);

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'click', onClick, false );
	//

	window.addEventListener( 'resize', onWindowResize, false );

}


function onClick() {
	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children, true );

	if ( intersects.length > 0 ) {
		console.log(intersects[0]);
		}
}


function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	//windowHalfY = window.innerHeight / 2;

	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( container.clientWidth, container.clientHeight );

}

function onDocumentMouseMove( event ) {
	
	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );
	//mouse.x = 2 * (event.clientX / windowHalfX) - 1;
	//mouse.y = 1 - 2 * ( event.clientY / windowHalfY );
	
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / 200 ) * 2 + 1;	
	
	
}




function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	group.rotation.y += ( mouseX - group.rotation.y ) * 0.00005;
	//camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt( scene.position );
	

	//group.rotation.y -= 0.005;
	
	renderer.render( scene, camera );
}
