// remove objects from a group and kill them
function removeFromGroup (objects, group) {
	for (var i = 0; i < objects.length; i++) {
		group.remove(objects[i]);
		objects[i].kill();
	}
}