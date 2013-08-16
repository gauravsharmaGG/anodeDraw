$(function(){
	// @goksgreat - Gaurav Sharma
	//Checking canvas is compatible or nott
	if(!('getcontext' in document.createElement('canvas'))){
		alert('Canvas is not supported by your browser');
		return false;
	}
	
	var url = 'http://localhost:8088';

	var clients = {}; // clients array
	var pointers = {}; // cursors
	var doc=$(document),win=$(window),canvas=$('#space'),
	ctx = canvas[0].getContext('2d'),instructions=#('#instruct');
	var drawing = false;  // flag for drawing status
	var id = Math.round($.now()*Math.random());
	
	//NodeJS Connection
	var socket = io.connect(url);
	
	socket.on('moving', function(data){
	
	//if new user has come assign it a pointer
	if(!(data.id in clients){
		pointers[data.id]=$('<div class = "pointer">').appendTo('#pointers');
	}

	//move the mouse pointer
	pointers[data.id].css({
	'left' = data.x;
	'right' = data.y;
	});

	//If the user is drawing a line is drawn on the canvas

	if(clients[data.id] && data.drawing){
		banaDrawing(clients[data.id].x,clients[data.id].y,data.x,data.y);
	}

	clients[data.id]=data;
	clients[data.id].updated=$.now();
	});

	var prev{};
	
	canvas.on('mousedown', function(e){
		e.preventDefault();
		drawing = true;
		prev.x=e.pageX;
		prev.y=e.pageY;
		instruct.fadeout();
	});
	
	doc.bind('mouseup mouseleave', function(){
		drawing = false;
	});
	
	var lastsend = $.now();

	doc.on('mousemove', function(e){
		if($.now - lastsend > 30){
			socket.emit('mousemove',{
				'x':e.pageX,
				'y':e.pageY,
				'drawing':drawing,
				'id':id
			});
			lastsend = $.now();
	}


	if(drawing){
		banaDrawing(prev.x,prev.y,e.pageX,e.pageY);
			prev.x = e.pageX;
			prev.y = e.pageY;
		}	
	});

	function(banaDrawing(fromx, fromy, tox, toy){
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy);
		ctx.stroke();
	}
	);
});
	
	


			
