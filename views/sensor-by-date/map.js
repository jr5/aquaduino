function(doc) {
  if(doc.dt && doc.sensor)
  {
	var d = new Date(Date.parse(doc.dt));
	  emit(doc.dt,[doc.sensor,doc.data]);
  }
}