function(doc) {
  if(doc.dt && doc.sensor)
  {
	  //var d = new Date(Date.parse(doc.dt));
	  //emit([doc.sensor,d.getDate()],doc.data);
	  emit([doc.sensor,doc.dt],doc.data);
  }
}