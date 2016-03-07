var container, stats;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0;

var windowHalfX;
var windowHalfY;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var lastFace= -1, actualFace=-1;
var menu;

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
	
	

	

		var geometry = new THREE.IcosahedronGeometry(200, 0);
		var geometry2 = new THREE.IcosahedronGeometry(201, 0);

		var material = new THREE.MeshBasicMaterial( );
		material.color = 0x000000;
		
		var material2 = new THREE.MeshBasicMaterial( );
		material2.wireframe=true;
		
		var mesh = new THREE.Mesh( geometry, material );
		
		var mesh2 = new THREE.Mesh( geometry2, material2 );
		
		group.add( mesh );
		group.add( mesh2 );

	
	group.rotation.z+=0.523599;
	
	renderer = new THREE.WebGLRenderer({ alpha: true } );
	renderer.setSize( container.clientWidth, container.clientHeight );
	document.getElementById('container').appendChild(renderer.domElement);

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'click', onClick, false );

	window.addEventListener( 'resize', onWindowResize, false );
	
	menu=document.getElementsByTagName("a");
}


function onClick() {
	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children, true );
	var face;
	if ( intersects.length > 0 ) {
		face=intersects[0].faceIndex;
		var id;
			switch(face) {
				case 4:
					id=0;
					break;
				case 0:
					id=1;
					break;
				case 6:
					id=2;
					break;
				case 15:
					id=3;
					break;
				case 10:
					id=4;
					break;
				case 14:
					id=5;
					break;
				case 13:
					id=6;
					break;
				case 18:
					id=7;
					break;
				case 8:
					id=8;
					break;
				case 3:
					id=9;
					break;
				default:
					id=-1;
			}
			if (id!=-1){
				window.location.href = menu[id].href;
			}
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
	
	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children, true );

	if ( intersects.length > 0 ) {
		actualFace=intersects[0].faceIndex;
		}else{
			actualFace=-1;
		}
	//console.log(menu);

	var id;
	if (actualFace!=lastFace) {
		if (lastFace!=-1){
			id=-1;
			switch(lastFace) {
				case 4:
					id=0;
					break;
				case 0:
					id=1;
					break;
				case 6:
					id=2;
					break;
				case 15:
					id=3;
					break;
				case 10:
					id=4;
					break;
				case 14:
					id=5;
					break;
				case 13:
					id=6;
					break;
				case 18:
					id=7;
					break;
				case 8:
					id=8;
					break;
				case 3:
					id=9;
					break;
				default:
					lastFace=-1;
				}
			if (id!=-1){
				menu[id].className="";
			}
			
		}
		if (actualFace!=-1){
			id=-1;
			switch(actualFace) {
				case 4:
					id=0;
					break;
				case 0:
					id=1;
					break;
				case 6:
					id=2;
					break;
				case 15:
					id=3;
					break;
				case 10:
					id=4;
					break;
				case 14:
					id=5;
					break;
				case 13:
					id=6;
					break;
				case 18:
					id=7;
					break;
				case 8:
					id=8;
					break;
				case 3:
					id=9;
					break;
				default:
					actualFace=-1;
				}
			if (id!=-1){
				menu[id].className="selected";
			}
			
		}
		lastFace=actualFace;
	}
	
	
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

