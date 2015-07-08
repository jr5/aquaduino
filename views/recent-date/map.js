function(doc) {
  if(doc.dt && doc.sensor)
  {
	  emit(doc.dt,doc);
  }
}