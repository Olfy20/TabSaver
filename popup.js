document.addEventListener('DOMContentLoaded', function() {
    var newGroupButton = document.getElementById('new_group');
	newGroupButton.addEventListener('click', function() {
		var new_group_name = document.getElementById('new_group_name').value;
		if(new_group_name == '')
			new_group_name = new Date();
		alert(new_group_name);
	},false);
},false);