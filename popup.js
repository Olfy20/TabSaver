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
                
        var value = new_group;
        var key = new_group_name;
        
        chrome.storage.local.set({key: value}, function() {
          console.log('Value is set to ' + value);
        });
      
        chrome.storage.local.get(['key'], function(result) {
          console.log('Value currently is ' + result.key);
        });
        
        });        
	},false);
},false);