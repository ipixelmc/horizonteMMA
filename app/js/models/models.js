function Institute(obj) {
	this.id = obj.id ? obj.id:null;
	this.name= obj.name ? obj.name: "";
	this.disciplines = obj.disciplines ? obj.disciplines : [];
	this.lat = obj.lat ? obj.lat : 0;
	this.lng = obj.lng ? obj.lng : 0;
	this.address = obj.address ? obj.address : "";
	this.images = obj.images ? obj.images: [];
	this.disciplinesObj = obj.disciplinesObj ? obj.disciplinesObj : [];
	this.infoWindow = null;
	this.show = true;
	this.phone = obj.phone ? obj.phone : "";
	this.webPage = obj.webPage ? obj.webPage : "";

	Institute.prototype.update = function(o){
		_.assignIn(this,o);
	};
}

function Distance(obj){
	this.max = obj.max ? obj.max : 0;
	this.min = obj.min ? obj.min : 0;
	this.status = obj.status ? obj.status : false;
}