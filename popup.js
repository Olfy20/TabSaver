document.addEventListener('DOMContentLoaded', function() {
    var newGroupButton = document.getElementById('new_group');
	newGroupButton.addEventListener('click', function() {
		var new_group_name = document.getElementById('new_group_name').value;
		if(new_group_name == '')
			new_group_name = new Date().toLocaleString();
		var new_group = [];
        
        chrome.tabs.getAllInWindow(null, function(tabs){
            for (var i = 0; i < tabs.length; i++) 
                new_group[i] = tabs[i].url;

            
        }); 

        chrome.storage.local.set({new_group_name, new_group});
	},false);
},false);