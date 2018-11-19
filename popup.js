document.addEventListener('DOMContentLoaded', function() {
    var newGroupButton = document.getElementById('new_group');
	newGroupButton.addEventListener('click', function() {
		var key = document.getElementById('new_group_name').value == '' ? new Date().toLocaleString() : document.getElementById('new_group_name').value;
		var value = [];
        
        chrome.tabs.getAllInWindow(null, function(tabs){
            for (var i = 0; i < tabs.length; i++) 
                value.push(tabs[i].url);
            
            console.log('key:'+key);
            var new_group = {};
            new_group[key] = value;

            chrome.storage.local.set(new_group);
            console.log(new_group);        
        });        
	},false);
},false);